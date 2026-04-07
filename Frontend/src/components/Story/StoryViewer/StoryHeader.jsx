import { X, Trash2, Eye } from "lucide-react";
import {  timeAgo } from "./utils/storyUtils";

const StoryHeader = ({ story, isOwner, onEyeClick, onDelete, onClose }) => (
  <div className="absolute top-9 left-4 right-4 z-20 flex items-center justify-between">
    {/* Left: user info */}
    <div className="flex items-center gap-2.5 pointer-events-none">
      <img
        src={story.user?.profilePicture}
        alt="user"
        className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60"
      />
      <div>
        <p className="text-white text-[13px] font-semibold leading-none">
          {story.user?.name}
        </p>
        <p className="text-white/60 text-[11px] mt-0.5">
          {timeAgo(story.createdAt)}
        </p>
      </div>
    </div>

    {/* Right: action buttons */}
    <div className="flex items-center gap-1.5">
      {isOwner && (
        <button
          onClick={onEyeClick}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
        >
          <Eye size={15} />
        </button>
      )}
      {isOwner && (
        <button
          onClick={onDelete}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500/80 text-white/80 hover:text-white transition-all"
        >
          <Trash2 size={15} />
        </button>
      )}
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
      >
        <X size={15} />
      </button>
    </div>
  </div>
);

export default StoryHeader;
