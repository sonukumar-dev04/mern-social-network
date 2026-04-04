import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../redux/slices/messageSlice";
import { updateLastMessage } from "../../../redux/slices/conversationSlice";
import socket from "../../../socket/socket";
import { groupMessagesByDate } from "./utils/chatUtils";
import EmptyState from "./EmptyState";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatPanel = ({ selectedChat, typingUsers, onBack }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  const otherUser = selectedChat?.members?.find((m) => m._id !== user?._id);
  const isOtherTyping = otherUser && typingUsers[otherUser._id];
  const grouped = groupMessagesByDate(messages);

  const handleSend = ({
    message,
    image,
    typingOnly,
    stopTyping,
    conversationId,
    userId,
  }) => {
    // Typing signals — no dispatch needed
    if (typingOnly) {
      socket.emit("typing", { conversationId, userId });
      return;
    }
    if (stopTyping) {
      socket.emit("stop_typing", { conversationId, userId });
      return;
    }

    if (!selectedChat) return;
    const formData = new FormData();
    formData.append("conversationId", selectedChat._id);
    if (message) formData.append("message", message);
    if (image) formData.append("image", image);

    dispatch(sendMessage(formData)).then((action) => {
      if (action.payload) {
        socket.emit("send_message", {
          conversationId: selectedChat._id,
          message: action.payload,
        });
        dispatch(
          updateLastMessage({
            conversationId: selectedChat._id,
            lastMessage: action.payload,
          }),
        );
      }
    });

    socket.emit("stop_typing", {
      conversationId: selectedChat._id,
      userId: user._id,
    });
  };

  if (!selectedChat) return <EmptyState />;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-200">
      <ChatHeader
        otherUser={otherUser}
        isOtherTyping={isOtherTyping}
        onBack={onBack}
      />

      <MessageList
        grouped={grouped}
        user={user}
        otherUser={otherUser}
        isOtherTyping={isOtherTyping}
      />

      <MessageInput
        selectedChat={selectedChat}
        user={user}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatPanel;
