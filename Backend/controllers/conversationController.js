import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const addConversation = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, message } = req.body;

    // Image from multer
    const image = req.file ? req.file.filename : null;

    if (!receiverId) {
      return res.status(400).json({
        error: "ReceiverId is required",
      });
    }

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // Create new conversation if not exists
    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
      });

      await conversation.save();
    }

    // Create message
    const newMessage = new Message({
      sender: senderId,
      conversation: conversation._id,
      message,
      image, // 👈 store image filename
    });

    await newMessage.save();

    // Update conversation last message
    conversation.lastMessage = newMessage._id;
    await conversation.save();

    return res.status(200).json({
      message: "Message sent successfully",
      conversationId: conversation._id,
      lastMessage: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    // Fetch all conversations for the user
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    })
      .populate("members", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Fetched Successfully",
      conversations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
