import { Router } from "express";
import {
  downloadProfile,
  getAllUserProfile,
  getUserAndProfile,
  getUserProfileById,
  login,
  logout,
  register,
  updateProfileData,
  updateUserAndProfile,
  updateUserProfile,
  uploadPictures,
} from "../controllers/userController.js";
import { authentication } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authentication, logout);
router.put(
  "/update_pictures",
  authentication,
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "cover_picture", maxCount: 1 },
  ]),
  uploadPictures,
);
router.post("/user_update", authentication, updateUserProfile);
router.get("/get_user_and_profile", authentication, getUserAndProfile);
router.post("/update_profile_data", authentication, updateProfileData);
router.get("/get_all_users", getAllUserProfile);
router.get("/user/:id", getUserProfileById);
router.get("/download_resume", downloadProfile);
router.post("/update_profile", authentication, updateUserAndProfile);

router.get("/self", authentication, (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

export default router;
