import { useState } from "react";
import { FiSend, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../../../redux/slices/commentSlice";

const CommentsSection = ({ post, comments, loading }) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user); // ← get auth user
  const authUserId = useSelector((state) => state.user.profile?._id);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(addComment({ postId: post._id, commentBody: commentText }));
      setCommentText("");
    }
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 space-y-4">
      {/* Add Comment */}
      <div className="flex items-center gap-3">
        <img
          src={authUser?.profilePicture || "/default_profile.jpg"} // ← updated
          alt="user"
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex items-center flex-1 bg-white border border-gray-300 rounded-full px-4 py-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 outline-none bg-transparent text-sm"
          />
          <button
            onClick={handleAddComment}
            className="ml-2 text-blue-600 hover:text-blue-700 transition"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>

      {/* Comments list */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet</p>
      ) : (
        comments.map((c) => (
          <div key={c._id} className="flex gap-3 group">
            <img
              src={c.userId?.profilePicture || "/default_profile.jpg"}
              alt="user"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1 bg-white p-3 rounded-xl shadow-sm relative">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {c.userId?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-700">{c.comment}</p>
                </div>
                {authUserId === c.userId?._id && (
                  <button
                    onClick={() => dispatch(deleteComment(c._id))}
                    className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsSection;
