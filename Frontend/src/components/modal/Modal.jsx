import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiImage } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";

export default function PostModal({ isOpen, setOpen, profile }) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleCreatePost = () => {
    if (!postText.trim() && !selectedImage) {
      alert("Please add text or image to create a post");
      return;
    }

    const formData = new FormData();
    formData.append("body", postText);
    if (selectedImage) {
      formData.append("media", selectedImage);
    }

    dispatch(createPost(formData));
    setOpen(false);
    setSelectedImage(null);
    setPostText("");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
    setPostText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={
                profile?.profilePicture
                  ? profile.profilePicture // ← updated
                  : "/default_profile.jpg" // ← updated
              }
              alt="profile"
              className="w-11 h-11 rounded-full object-cover ring-1 ring-gray-200"
            />
            <div>
              <h2 className="text-base font-semibold text-gray-800 leading-tight">
                {profile?.name}
              </h2>
              <p className="text-xs text-gray-400">Post to anyone</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* ── Text Input ─────────────────────────────────────────── */}
        <div className="px-6 py-5 flex-1">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full h-36 resize-none outline-none text-base text-gray-700 placeholder-gray-400 leading-relaxed"
          />
        </div>

        {/* ── Image Preview ──────────────────────────────────────── */}
        {selectedImage && (
          <div className="px-6 pb-4">
            <div className="relative w-fit rounded-xl overflow-hidden border border-gray-100">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="preview"
                className="max-h-48 rounded-xl object-contain bg-gray-50"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white rounded-full p-1 transition"
              >
                <IoClose size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition group"
          >
            <FiImage size={22} />
            <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600">
              Photo
            </span>
          </button>

          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => {
              setSelectedImage(e.target.files[0]);
              e.target.value = null;
            }}
          />

          <button
            onClick={handleCreatePost}
            disabled={!postText.trim() && !selectedImage}
            className="bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-7 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-sm shadow-blue-200"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
