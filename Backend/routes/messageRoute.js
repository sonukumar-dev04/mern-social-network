import { Router } from "express";
import { authentication } from "../middleware/auth.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post(
  "/send_message",
  authentication,
  upload.single("image"),
  sendMessage,
);
router.get("/message/:convoId", authentication, getMessages);

export default router;
