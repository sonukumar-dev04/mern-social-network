import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { X, ImagePlus, Type, AlertCircle, Upload } from "lucide-react";
import { createImageStory, createTextStory } from "../../redux/slices/storySlice";

const BG_COLORS = [
  { label: "Blue", value: "#2563EB" },
  { label: "Violet", value: "#7C3AED" },
  { label: "Rose", value: "#E11D48" },
  { label: "Emerald", value: "#059669" },
  { label: "Orange", value: "#EA580C" },
  { label: "Slate", value: "#1E293B" },
];

const CreateStoryModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState("image");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState(BG_COLORS[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleImageChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    setError(null);

    if (tab === "image") {
      if (!imageFile) {
        setError("Please select an image.");
        return;
      }
      const formData = new FormData();
      formData.append("type", "image");
      formData.append("image", imageFile);
      setLoading(true);
      const res = await dispatch(createImageStory(formData));
      setLoading(false);
      if (res.meta.requestStatus === "fulfilled") onClose();
      else setError(res.payload);
    }

    if (tab === "text") {
      if (!text.trim()) {
        setError("Please write something.");
        return;
      }
      setLoading(true);
      const res = await dispatch(
        createTextStory({ type: "text", text, bgColor }),
      );
      setLoading(false);
      if (res.meta.requestStatus === "fulfilled") onClose();
      else setError(res.payload);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-[420px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">
            Create Story
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mx-6 bg-slate-100 rounded-xl p-1 gap-1 mb-5">
          {[
            {
              key: "image",
              icon: <ImagePlus size={14} strokeWidth={2} />,
              label: "Image",
            },
            {
              key: "text",
              icon: <Type size={14} strokeWidth={2} />,
              label: "Text",
            },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setError(null);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                tab === t.key
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-4">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-xs px-3.5 py-2.5 rounded-xl">
              <AlertCircle size={14} strokeWidth={2} className="shrink-0" />
              {error}
            </div>
          )}

          {/* ── Image tab ── */}
          {tab === "image" && (
            <div
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-200 ${
                dragOver
                  ? "ring-2 ring-blue-400 ring-offset-1"
                  : "ring-1 ring-slate-200 hover:ring-blue-300"
              }`}
            >
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Upload size={15} />
                      Change image
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-56 flex flex-col items-center justify-center gap-3 bg-slate-50">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                    <ImagePlus size={22} strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700">
                      Click to upload
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      or drag and drop
                    </p>
                  </div>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          )}

          {/* ── Text tab ── */}
          {tab === "text" && (
            <div className="space-y-3">
              {/* Preview */}
              <div
                className="w-full h-44 rounded-2xl flex items-center justify-center p-6 transition-colors duration-300"
                style={{ backgroundColor: bgColor }}
              >
                <p className="text-white text-lg font-bold text-center leading-snug break-words">
                  {text || (
                    <span className="opacity-50">Your story preview...</span>
                  )}
                </p>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your story..."
                  maxLength={200}
                  rows={3}
                  className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all placeholder:text-slate-300"
                />
                <span className="absolute bottom-2.5 right-3 text-[10px] text-slate-300">
                  {text.length}/200
                </span>
              </div>

              {/* Color picker */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Background
                </p>
                <div className="flex gap-2">
                  {BG_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setBgColor(c.value)}
                      title={c.label}
                      className={`w-7 h-7 rounded-full transition-all duration-200 ${
                        bgColor === c.value
                          ? "ring-2 ring-offset-2 ring-slate-400 scale-110"
                          : "hover:scale-105 opacity-70 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Sharing...
              </span>
            ) : (
              "Share Story"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;
