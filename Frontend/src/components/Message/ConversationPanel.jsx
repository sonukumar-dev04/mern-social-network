import { useSelector } from "react-redux";
import EmptyState from "./ChatPanel/EmptyState";

const ConversationPanel = ({
  conversations,
  selectedChat,
  setSelectedChat,
  onlineUsers,
}) => {
  const { user } = useSelector((state) => state.auth);
  const loggedUserId = user?._id;

  return (
    <div className="w-full flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-5 py-5 flex-shrink-0 bg-white border-b border-gray-200">
        <h2
          className="text-base font-bold tracking-tight"
          style={{ color: "#1e3a5f" }}
        >
          Messages
        </h2>
        <p className="text-xs mt-0.5" style={{ color: "#7fafd4" }}>
          Professional conversations
        </p>
      </div>

      {/* Conversations or Empty */}
      <div className="flex-1 overflow-y-auto py-1">
        {!conversations?.length ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 px-4 py-10">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-600">
                No conversations yet
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Connect with people to start messaging
              </p>
            </div>
          </div>
        ) : (
          conversations.map((chat) => {
            const isActive = selectedChat?._id === chat._id;
            const otherUser = chat.members?.find(
              (member) => member._id !== loggedUserId,
            );
            const isOnline = onlineUsers.includes(otherUser?._id);

            return (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-150"
                style={{
                  background: isActive ? "#d6eaff" : "transparent",
                  borderLeft: isActive
                    ? "3px solid #3b82f6"
                    : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#e8f3ff";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      otherUser?.profilePicture
                        ? `http://localhost:4000/uploads/${otherUser.profilePicture}`
                        : "http://localhost:4000/uploads/default_profile.jpg"
                    }
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                    style={{
                      outline: isActive
                        ? "2px solid #93c5fd"
                        : "2px solid #bfdbfe",
                      outlineOffset: "1px",
                    }}
                  />
                  {isOnline && (
                    <span
                      className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        background: "#22c55e",
                        borderColor: isActive ? "#d6eaff" : "#f0f6ff",
                      }}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-2">
                    <p
                      className="font-semibold text-sm truncate"
                      style={{ color: isActive ? "#1e40af" : "#1e3a5f" }}
                    >
                      {otherUser?.name}
                    </p>
                    <span
                      className="text-[11px] flex-shrink-0"
                      style={{ color: isActive ? "#3b82f6" : "#93afc8" }}
                    >
                      {chat.lastMessage?.createdAt
                        ? new Date(
                            chat.lastMessage.createdAt,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: isActive ? "#3b82f6" : "#7fafd4" }}
                  >
                    {chat.lastMessage?.message || "Start conversation"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationPanel;
