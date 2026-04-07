import { useRef, useState } from "react";
import { FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../../redux/slices/postSlice";

const PostHeader = ({ post, compact, isPostOwner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-start justify-between px-5 pt-5">
      <div
        onClick={() => navigate(`/profile/${post?.userId?._id}`)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src={post.userId?.profilePicture}
          alt="user"
          className="w-11 h-11 rounded-full object-cover border border-gray-200"
        />
        <div className="leading-tight">
          <h3 className="font-semibold text-gray-900 text-sm">
            {post.userId?.name || "Unknown User"}
          </h3>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {!compact && isPostOwner && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-500 cursor-pointer hover:text-gray-800 transition"
          >
            <FiMoreHorizontal size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-10">
              <button
                onClick={() => {
                  dispatch(deletePost(post._id));
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
              >
                <FiTrash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostHeader;
