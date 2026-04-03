import Story from "../models/story.js";

// POST /api/stories/create
export const createStory = async (req, res) => {
  try {
    const { type, text, bgColor } = req.body;

    if (!type)
      return res.status(400).json({ message: "Story type is required" });

    if (type === "image") {
      if (!req.file)
        return res
          .status(400)
          .json({ message: "Image is required for image story" });

      const story = new Story({
        user: req.user._id,
        type: "image",
        image: req.file.filename,
      });
      await story.save();
      const populated = await story.populate("user", "name profilePicture");
      return res
        .status(201)
        .json({ message: "Story created", story: populated });
    }

    if (type === "text") {
      if (!text || text.trim().length === 0)
        return res
          .status(400)
          .json({ message: "Text is required for text story" });

      const story = new Story({
        user: req.user._id,
        type: "text",
        text: text.trim(),
        bgColor: bgColor || "#1D4ED8",
      });
      await story.save();
      const populated = await story.populate("user", "name profilePicture");
      return res
        .status(201)
        .json({ message: "Story created", story: populated });
    }

    return res.status(400).json({ message: "Invalid story type" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/stories
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("user", "name profilePicture")
      .populate("seenBy.user", "name profilePicture")
      .sort({ createdAt: -1 });

    // Group by userId
    const grouped = {};
    stories.forEach((story) => {
      const userId = story.user._id.toString();
      if (!grouped[userId]) {
        grouped[userId] = { user: story.user, stories: [] };
      }
      grouped[userId].stories.push(story);
    });

    return res.json({ stories: Object.values(grouped) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// PUT /api/stories/:id/seen
export const markSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const viewerId = req.user._id;

    const story = await Story.findById(id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    // Don't count the owner viewing their own story
    if (story.user.toString() === viewerId.toString())
      return res.json({ message: "Owner view not tracked" });

    // Only add if not already seen by this user
    const alreadySeen = story.seenBy.some(
      (s) => s.user.toString() === viewerId.toString(),
    );

    if (!alreadySeen) {
      story.seenBy.push({ user: viewerId, seenAt: new Date() });
      await story.save();
    }

    // Return populated seenBy for immediate UI update
    const updated = await Story.findById(id).populate(
      "seenBy.user",
      "name profilePicture",
    );

    return res.json({ seenBy: updated.seenBy });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/stories/:id
export const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);

    if (!story) return res.status(404).json({ message: "Story not found" });

    if (story.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await story.deleteOne();
    return res.json({ message: "Story deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
