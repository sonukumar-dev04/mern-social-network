import { Router } from "express";
import { authentication } from "../middleware/auth.js";
import {
  commentPost,
  deleteComment,
  getCommentByPostId,
} from "../controllers/commentController.js";

const router = Router();

router.post("/post_comment", authentication, commentPost);
router.get("/comment/:postId", getCommentByPostId);
router.delete("/comment/:commentId", authentication, deleteComment);

export default router;
