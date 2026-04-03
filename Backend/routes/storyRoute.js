import { Router } from "express";
import {
  createStory,
  getStories,
  markSeen,
  deleteStory,
} from "../controllers/storyController.js";
import { authentication } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/create", authentication, upload.single("image"), createStory);

router.get("/", authentication, getStories);

router.put("/:id/seen", authentication, markSeen);

router.delete("/:id", authentication, deleteStory);

export default router;
