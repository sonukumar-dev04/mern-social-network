const EmptyState = ({ noConversations = false }) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-gray-200">
    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    </div>
    <div className="text-center">
      {noConversations ? (
        <>
          <p className="text-sm font-semibold text-slate-600">
            No conversations yet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Connect with people to start messaging
          </p>
        </>
      ) : (
        <>
          <p className="text-sm font-semibold text-slate-600">
            No conversation selected
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Pick a chat from the left to get started
          </p>
        </>
      )}
    </div>
  </div>
);

export default EmptyState;
