import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../redux/slices/conversationSlice";
import {
  getMessages,
  clearMessages,
  receiveMessage,
} from "../../redux/slices/messageSlice";
import { updateLastMessage } from "../../redux/slices/conversationSlice";
import ConversationPanel from "./ConversationPanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import socket from "../../socket/socket";

const MessageLayout = () => {
  const dispatch = useDispatch();
  const { conversations, loading } = useSelector((state) => state.conversation);
  const { user } = useSelector((state) => state.auth);

  const [selectedChat, setSelectedChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [mobileView, setMobileView] = useState("list");

  useEffect(() => {
    if (user?._id) {
      socket.connect();
      socket.emit("user_online", user._id);
    }
    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    socket.on("online_users", (users) => setOnlineUsers(users));
    socket.on("receive_message", (message) =>
      dispatch(receiveMessage(message)),
    );
    socket.on("update_conversation", ({ conversationId, lastMessage }) => {
      dispatch(updateLastMessage({ conversationId, lastMessage }));
    });
    socket.on("user_typing", ({ userId }) => {
      setTypingUsers((prev) => ({ ...prev, [userId]: true }));
    });
    socket.on("user_stop_typing", ({ userId }) => {
      setTypingUsers((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    });

    return () => {
      socket.off("online_users");
      socket.off("receive_message");
      socket.off("update_conversation");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedChat?._id) {
      socket.emit("join_conversation", selectedChat._id);
      dispatch(getMessages(selectedChat._id));
    }
    return () => {
      if (selectedChat?._id) {
        socket.emit("leave_conversation", selectedChat._id);
        dispatch(clearMessages());
      }
    };
  }, [selectedChat, dispatch]);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  useEffect(() => {
    if (conversations?.length > 0 && !selectedChat) {
      setSelectedChat(conversations[0]);
    }
  }, [conversations, selectedChat]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMobileView("chat");
  };

  const handleBack = () => {
    setMobileView("list");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-200">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex mx-2 md:mx-6 bg-gray-200 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Conversation panel */}
      <div
        className={`
          ${mobileView === "list" ? "flex" : "hidden"}
          md:flex
          w-full md:w-[35%] lg:w-[30%] md:flex-shrink-0
          flex-col border-r border-slate-200
        `}
      >
        <ConversationPanel
          conversations={conversations}
          selectedChat={selectedChat}
          setSelectedChat={handleSelectChat}
          onlineUsers={onlineUsers}
        />
      </div>

      {/* Chat panel */}
      <div
        className={`
          ${mobileView === "chat" ? "flex" : "hidden"}
          md:flex
          flex-1 min-w-0
          flex-col
          overflow-hidden
        `}
      >
        <ChatPanel
          selectedChat={selectedChat}
          typingUsers={typingUsers}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default MessageLayout;
