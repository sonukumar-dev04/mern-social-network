import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiImage } from "react-icons/fi";

const MessageModal = ({ receiver, onSend, onClose }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = () => {
    const form = new FormData();
    form.append("receiverId", receiver._id);
    form.append("message", message);
    if (image) form.append("image", image);
    onSend(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Message {receiver?.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Start a conversation
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoClose className="text-xl sm:text-2xl text-gray-600" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 sm:px-8 py-5 sm:py-6 space-y-4">
          <textarea
            placeholder={`Write a message to ${receiver?.name}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <label className="flex items-center gap-3 cursor-pointer border border-dashed border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 transition">
            <FiImage className="text-gray-500 flex-shrink-0" size={20} />
            <span className="text-sm text-gray-600 truncate">
              {image ? image.name : "Attach an image"}
            </span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 font-medium transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full font-medium transition shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
