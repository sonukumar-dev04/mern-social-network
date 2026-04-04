import { FiThumbsUp, FiMessageCircle, FiRepeat } from "react-icons/fi";

const PostActions = ({ isLiked, onToggleLike, onToggleComments }) => (
  <div className="px-3 py-2 border-t border-gray-100">
    <div className="flex items-center justify-between text-sm">
      <button
        onClick={onToggleLike}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition ${
          isLiked
            ? "font-medium"
            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
        }`}
      >
        <FiThumbsUp size={18} className={isLiked ? "text-blue-500" : ""} />
        <span className={isLiked ? "text-blue-500" : ""}>
          {isLiked ? "Liked" : "Like"}
        </span>
      </button>

      <button
        onClick={onToggleComments}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
      >
        <FiMessageCircle size={18} /> Comment
      </button>

      <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition">
        <FiRepeat size={18} /> Share
      </button>
    </div>
  </div>
);

export default PostActions;
