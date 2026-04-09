import User from "../models/user.js";
import Profile from "../models/profile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();

    const profile = new Profile({ userId: newUser._id });
    await profile.save();

    newUser.profileId = profile._id;
    await newUser.save();

    return res.json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "server error", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    let token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY);
    res.cookie("token", token, cookieOptions);

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "server error", message: error.message });
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("token", cookieOptions)
    .json({ message: "logged out successfully" });
};

export const uploadPictures = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.files.profile_picture) {
      user.profilePicture = req.files.profile_picture[0].path; // ← updated
    }

    if (req.files.cover_picture) {
      user.coverPicture = req.files.cover_picture[0].path; // ← updated
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate("profileId");

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { ...newUserData } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { username, email } = newUserData;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser && String(existingUser._id) !== String(user._id)) {
      return res.status(400).json({ message: "User already exists" });
    }

    Object.assign(user, newUserData);

    await user.save();

    return res.json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserAndProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("name email username profilePicture coverPicture")
      .populate({
        path: "profileId",
        select:
          "bio currentPost currentCompany currentLocation skills pastWork education",
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    const { ...newProfileData } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profileToUpdate = await Profile.findById(user.profileId);
    if (!profileToUpdate) {
      return res.status(404).json({ error: "Profile not found" });
    }

    Object.assign(profileToUpdate, newProfileData);
    await profileToUpdate.save();

    return res.json({ message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUserProfile = async (req, res) => {
  try {
    const users = await User.find()
      .select("name username email profilePicture coverPicture")
      .populate({
        path: "profileId",
        select:
          "bio currentPost currentCompany currentLocation skills pastWork education",
      });

    return res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("name username email profilePicture coverPicture")
      .populate({
        path: "profileId",
        select:
          "bio currentPost currentCompany currentLocation skills pastWork education",
      });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserAndProfile = async (req, res) => {
  try {
    const { userData, profileData } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (userData) {
      const { username, email } = userData;
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser && String(existingUser._id) !== String(user._id)) {
        return res.status(400).json({ message: "User already exists" });
      }
      Object.assign(user, userData);
      await user.save();
    }

    if (profileData) {
      const profile = await Profile.findById(user.profileId);
      if (!profile) return res.status(404).json({ error: "Profile not found" });
      Object.assign(profile, profileData);
      await profile.save();
    }

    const updatedUser = await User.findById(req.user._id).populate("profileId");

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
