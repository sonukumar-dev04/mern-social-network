const HeaderForm = ({ formData = {}, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-10">
      {/* Profile Information */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Profile Information
          </h3>
          <p className="text-sm text-gray-500">
            This information will be visible publicly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User fields */}
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Full Name"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            value={formData.username || ""}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="Username"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Email"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Profile fields */}
          <input
            type="text"
            value={formData.currentPost || ""}
            onChange={(e) => handleChange("currentPost", e.target.value)}
            placeholder="Current Position"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            value={formData.currentCompany || ""}
            onChange={(e) => handleChange("currentCompany", e.target.value)}
            placeholder="Current Company"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            value={formData.currentLocation || ""}
            onChange={(e) => handleChange("currentLocation", e.target.value)}
            placeholder="Location"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </section>
    </div>
  );
};

export default HeaderForm;
