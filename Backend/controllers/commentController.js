import Comment from "../models/comments.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import Notification from "../models/notification.js";

export const commentPost = async (req, res) => {
  try {
    const { postId, commentBody } = req.body;
    const userId = req.user._id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if post exists and populate owner
    const post = await Post.findById(postId).populate("userId");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Increment comment count
    post.comments = (post.comments || 0) + 1;
    await post.save();

    // Create new comment
    const newComment = new Comment({
      userId: user._id,
      postId: post._id,
      comment: commentBody,
    });
    await newComment.save();

    // Populate comment with user details
    const populatedComment = await Comment.findById(newComment._id).populate(
      "userId",
      "name username profilePicture",
    );

    // Create notification for post owner
    const content = `${user.name} commented on your post`;
    const notification = new Notification({
      sender: userId,
      receiver: post.userId._id,
      content,
      type: "comment",
      postId: postId.toString(),
    });
    await notification.save();

    return res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getCommentByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Fetch comments for the post
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "name username profilePicture profileId",
        populate: {
          path: "profileId",
          select: "currentPost currentCompany",
        },
      });

    return res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Ownership check
    if (comment.userId.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized: You can only delete your own comment" });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    // Decrement comment count on the post
    await Post.findByIdAndUpdate(comment.postId, { $inc: { comments: -1 } });

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
