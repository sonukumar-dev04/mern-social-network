import { useState } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";

const DeleteAccountModal = ({ onClose, onConfirm, loading, error }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) return;
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="bg-red-100 text-red-600 p-2 rounded-full">
            <FiAlertTriangle size={20} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Delete Account
          </h2>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          This will permanently delete your account, posts, connections,
          messages, and all related data. This action{" "}
          <span className="font-semibold text-gray-700">cannot be undone</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Enter your password to confirm
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!password || loading}
              className="flex-1 py-2.5 rounded-full text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Deleting..." : "Delete My Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
