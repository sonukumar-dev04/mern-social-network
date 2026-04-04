const BioForm = ({ formData = {}, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, bio: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">About You</h3>
        <p className="text-sm text-gray-500">
          Write a short professional summary.
        </p>
      </div>

      <textarea
        value={formData.bio || ""}
        onChange={handleChange}
        placeholder="Tell something about yourself..."
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-40 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default BioForm;
