import { useRef, useEffect } from "react";
import Avatar from "./Avatar";
import { formatTime } from "./utils/chatUtils";

const MessageList = ({ grouped, user, otherUser, isOtherTyping }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [grouped, isOtherTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-8 py-5 space-y-1">
      {grouped.map((item, index) => {
        if (item.type === "label") {
          return (
            <div
              key={`label-${index}`}
              className="flex items-center gap-3 py-4"
            >
              <div className="flex-1 h-px bg-slate-300/60" />
              <span className="text-[11px] font-medium text-slate-400 bg-gray-200 px-3 py-1 rounded-full border border-slate-300/50">
                {item.label}
              </span>
              <div className="flex-1 h-px bg-slate-300/60" />
            </div>
          );
        }

        const { msg } = item;
        const isMe = msg.sender?._id === user?._id;
        const nextItem = grouped[index + 1];
        const nextMsg = nextItem?.type === "message" ? nextItem.msg : null;
        const isLastInGroup =
          !nextMsg || nextMsg.sender?._id !== msg.sender?._id;

        return (
          <div
            key={msg._id}
            className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"} ${
              isLastInGroup ? "mb-3" : "mb-0.5"
            }`}
          >
            {!isMe && (
              <div
                className={`flex-shrink-0 ${isLastInGroup ? "opacity-100" : "opacity-0"}`}
              >
                <Avatar
                  src={otherUser?.profilePicture}
                  name={otherUser?.name}
                  size="sm"
                />
              </div>
            )}

            <div
              className={`flex flex-col gap-1 max-w-[75%] md:max-w-md ${isMe ? "items-end" : "items-start"}`}
            >
              {msg.image && (
                <div
                  className={`rounded-2xl overflow-hidden ${isMe ? "rounded-br-md" : "rounded-bl-md"}`}
                >
                  <img
                    src={`http://localhost:4000/uploads/${msg.image}`}
                    alt="shared"
                    className="max-h-56 object-cover block"
                  />
                </div>
              )}

              {msg.message && (
                <div
                  className={`px-4 py-2.5 text-sm leading-relaxed ${
                    isMe
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-md shadow-md shadow-blue-200"
                      : "bg-white text-slate-700 border border-slate-200/80 rounded-2xl rounded-bl-md shadow-sm"
                  }`}
                >
                  {msg.message}
                </div>
              )}

              {isLastInGroup && (
                <span className="text-[10px] text-slate-400 px-1">
                  {formatTime(msg.createdAt)}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {isOtherTyping && (
        <div className="flex items-end gap-2 mb-3">
          <Avatar
            src={otherUser?.profilePicture}
            name={otherUser?.name}
            size="sm"
          />
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex gap-1 items-center h-4">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
