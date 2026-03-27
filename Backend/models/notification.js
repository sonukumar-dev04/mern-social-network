import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["friendRequest", "comment", "like"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    postId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
