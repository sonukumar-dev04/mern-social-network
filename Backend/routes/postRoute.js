import { Router } from "express";
import { authentication } from "../middleware/auth.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getUserAllPosts,
  toggleLikePost,
} from "../controllers/postController.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/post", authentication, upload.single("media"), createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPost/:postId", getPostById);
router.get("/getUserPosts/:userId", getUserAllPosts);
router.delete("/delete_post/:postId", authentication, deletePost);
router.put("/post/:postId/like", authentication, toggleLikePost);

export default router;
