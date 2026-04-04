import { FiMoreVertical, FiPhone, FiVideo, FiArrowLeft } from "react-icons/fi";
import Avatar from "./Avatar";

const ChatHeader = ({ otherUser, isOtherTyping, onBack }) => (
  <div className="flex-shrink-0 px-3 md:px-5 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-2 md:gap-3">
      <button
        onClick={onBack}
        className="md:hidden p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label="Back to conversations"
      >
        <FiArrowLeft size={20} />
      </button>

      <Avatar
        src={otherUser?.profilePicture}
        name={otherUser?.name}
        size="md"
      />

      <div>
        <h3 className="text-sm font-bold text-slate-800 leading-tight">
          {otherUser?.name}
        </h3>
        <p className="text-xs leading-tight mt-0.5">
          {isOtherTyping ? (
            <span className="text-blue-500 italic">typing…</span>
          ) : (
            <span className="text-slate-400">tap to view profile</span>
          )}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-0.5">
      <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
        <FiPhone size={17} />
      </button>
      <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
        <FiVideo size={17} />
      </button>
      <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
        <FiMoreVertical size={17} />
      </button>
    </div>
  </div>
);

export default ChatHeader;
