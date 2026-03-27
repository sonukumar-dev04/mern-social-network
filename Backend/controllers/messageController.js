import Message from "../models/message.js";
import Conversation from "../models/conversation.js";

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    let image = null;

    if (req.file) {
      image = req.file.filename;
    }

    const newMessage = new Message({
      sender: req.user._id,
      conversation: conversationId,
      message,
      image,
    });

    await newMessage.save();

    const convo = await Conversation.findById(conversationId);

    if (convo) {
      convo.lastMessage = newMessage._id;
      await convo.save();
    }

    const populatedMessage = await newMessage.populate("sender");

    return res.status(200).json({
      message: "Message sent successfully",
      data: populatedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { convoId } = req.params;

    const messages = await Message.find({ conversation: convoId })
      .populate({
        path: "sender",
        select: "name username profilePicture profileId",
        populate: {
          path: "profileId",
          select: "currentPost currentCompany",
        },
      })
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
