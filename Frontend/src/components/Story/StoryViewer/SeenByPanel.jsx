import {  timeAgo } from "./utils/storyUtils";

const SeenByPanel = ({ visible, seenBy }) => (
  <div
    className={`absolute bottom-0 left-0 right-0 z-20 bg-black/75 backdrop-blur-md rounded-t-2xl transition-all duration-300 ease-out ${
      visible
        ? "translate-y-0 opacity-100"
        : "translate-y-full opacity-0 pointer-events-none"
    }`}
  >
    <div className="px-5 pt-4 pb-6">
      <div className="w-8 h-1 bg-white/30 rounded-full mx-auto mb-4" />
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/60 text-[11px] font-bold uppercase tracking-wider">
          Seen by
        </p>
        <span className="text-white/40 text-xs">
          {seenBy.length} {seenBy.length === 1 ? "view" : "views"}
        </span>
      </div>

      {seenBy.length === 0 ? (
        <p className="text-white/30 text-sm text-center py-3">No views yet</p>
      ) : (
        <div className="space-y-3 max-h-40 overflow-y-auto">
          {seenBy.map((entry) => (
            <div
              key={entry.user?._id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={entry.user?.profilePicture}
                  alt={entry.user?.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
                />
                <span className="text-white text-sm font-medium">
                  {entry.user?.name}
                </span>
              </div>
              <span className="text-white/40 text-xs">
                {timeAgo(entry.seenAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default SeenByPanel;
