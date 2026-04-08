import { MdOutlineVideoCameraBack, MdOutlinePhoto } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreatePostCard = ({ onOpen, profile }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition duration-300">
      {/* Top Section */}
      <div className="flex items-center gap-3">
        <img
          src={
            profile?.profilePicture
              ? profile.profilePicture
              : import.meta.env.VITE_DEFAULT_PROFILE_PICTURE
          }
          alt="profile"
          onClick={() => navigate(`/profile/${profile._id}`)}
          className="w-11 h-11 rounded-full object-cover cursor-pointer"
        />

        <button
          onClick={onOpen}
          className="flex-1 text-left bg-gray-100 cursor-pointer hover:bg-gray-200 transition px-5 py-3 rounded-full text-sm text-gray-600"
        >
          Start a post
        </button>
      </div>

      {/* Divider */}
      <div className="my-8" />

      {/* Action Buttons */}
      <div className="flex justify-around text-sm font-medium">
        <button
          onClick={onOpen}
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition text-gray-600"
        >
          <MdOutlineVideoCameraBack size={20} className="text-green-600" />
          <span>Video</span>
        </button>

        <button
          onClick={onOpen}
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition text-gray-600"
        >
          <MdOutlinePhoto size={20} className="text-blue-600" />
          <span>Photo</span>
        </button>

        <button
          onClick={onOpen}
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition text-gray-600"
        >
          <FaRegNewspaper size={18} className="text-orange-500" />
          <span>Article</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePostCard;
