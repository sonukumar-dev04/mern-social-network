const onlineUsers = new Map(); // userId -> socketId

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    // console.log("Socket connected:", socket.id);

    // User comes online
    socket.on("user_online", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });

    // Join a conversation room
    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    // Leave a conversation room
    socket.on("leave_conversation", (conversationId) => {
      socket.leave(conversationId);
    });

    // Send message via socket
    socket.on("send_message", (messageData) => {
      // messageData: { conversationId, message }
      // Broadcast to everyone else in the room
      socket
        .to(messageData.conversationId)
        .emit("receive_message", messageData.message);

      // Also update conversation list for the receiver
      socket.to(messageData.conversationId).emit("update_conversation", {
        conversationId: messageData.conversationId,
        lastMessage: messageData.message,
      });
    });

    // Typing indicators
    socket.on("typing", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("user_typing", { userId });
    });

    socket.on("stop_typing", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("user_stop_typing", { userId });
    });

    // Disconnect
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("online_users", Array.from(onlineUsers.keys()));
      // console.log("Socket disconnected:", socket.id);
    });
  });
};
