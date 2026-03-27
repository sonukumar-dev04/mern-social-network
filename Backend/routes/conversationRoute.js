import { Router } from "express";
import { authentication } from "../middleware/auth.js";
import {
  addConversation,
  getConversation,
} from "../controllers/conversationController.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post(
  "/add_conversation",
  authentication,
  upload.single("image"), 
  addConversation,
);

router.get("/get_conversation", authentication, getConversation);

export default router;
