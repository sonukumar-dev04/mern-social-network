import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["image", "text"],
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  bgColor: {
    type: String,
    default: "#1D4ED8",
  },
  seenBy: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      seenAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // auto-delete after 24 hours (TTL index)
  },
});

const Story = mongoose.model("Story", StorySchema);
export default Story;
