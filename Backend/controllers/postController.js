import User from "../models/user.js";
import Post from "../models/post.js";
import Notification from "../models/notification.js";

export const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.body.body && !req.file) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    const post = new Post({
      userId: user._id,
      body: req.body.body || "",
      media: req.file ? req.file.path : "", // ← updated
      filetype: req.file ? req.file.mimetype.split("/")[1] : "",
    });

    await post.save();
    const populatedPost = await Post.findById(post._id).populate(
      "userId",
      "name profilePicture",
    );

    return res
      .status(201)
      .json({ message: "Post Created", post: populatedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name username email profilePicture coverPicture")
      .populate({
        path: "userId",
        populate: {
          path: "profileId",
          select:
            "bio currentPost currentCompany currentLocation skills pastWork education",
        },
      });

    return res.json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate("userId", "name username email profilePicture coverPicture")
      .populate({
        path: "userId",
        populate: {
          path: "profileId",
          select:
            "bio currentPost currentCompany currentLocation skills pastWork education",
        },
      });

    if (!post) {
      return res.status(404).json({ error: "No such post found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserAllPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "name username email profilePicture coverPicture")
      .populate({
        path: "userId",
        populate: {
          path: "profileId",
          select:
            "bio currentPost currentCompany currentLocation skills pastWork education",
        },
      });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findById(postId).populate("userId");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const index = post.likes.findIndex((id) => id.equals(userId));

    let message;
    if (index !== -1) {
      post.likes.splice(index, 1);
      message = "Post unliked successfully";
    } else {
      post.likes.push(userId);
      message = "Post liked successfully";

      if (post.userId._id.toString() !== userId.toString()) {
        const content = `${user.name} liked your post`;
        const notification = new Notification({
          sender: userId,
          receiver: post.userId._id,
          content,
          type: "like",
          postId: postId.toString(),
        });
        await notification.save();
      }
    }

    await post.save();

    return res.status(200).json({
      message,
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
