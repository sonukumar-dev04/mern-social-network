import { useRef, useState, useEffect } from "react";
import { FiSend, FiImage, FiX } from "react-icons/fi";

const MessageInput = ({ selectedChat, user, onSend }) => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  const clearImage = () => {
    setSelectedImage(null);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = () => {
    if (!newMessage.trim() && !selectedImage) return;
    onSend({ message: newMessage.trim(), image: selectedImage });
    setNewMessage("");
    clearImage();
    inputRef.current?.focus();
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    onSend({
      typingOnly: true,
      conversationId: selectedChat._id,
      userId: user._id,
    });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      onSend({
        stopTyping: true,
        conversationId: selectedChat._id,
        userId: user._id,
      });
    }, 1500);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setSelectedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="flex-shrink-0 px-3 md:px-4 py-3 bg-white border-t border-slate-200">
      {imagePreviewUrl && (
        <div className="mb-3 relative inline-block">
          <img
            src={imagePreviewUrl}
            alt="preview"
            className="h-20 w-auto rounded-xl object-cover ring-1 ring-slate-200"
          />
          <button
            onClick={clearImage}
            className="absolute -top-2 -right-2 w-5 h-5 bg-slate-700 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
          >
            <FiX size={11} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-2xl px-3 py-2 focus-within:border-blue-400 focus-within:bg-white transition-all duration-200">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
          title="Attach image"
        >
          <FiImage size={18} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageSelect}
        />

        <input
          ref={inputRef}
          type="text"
          placeholder="Write a message…"
          value={newMessage}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 min-w-0"
        />

        <button
          onClick={handleSend}
          disabled={!newMessage.trim() && !selectedImage}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm shadow-blue-200"
          title="Send"
        >
          <FiSend size={15} className="rotate-45" />
        </button>
      </div>

      <p className="text-[10px] text-slate-300 text-center mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
};

export default MessageInput;
