const ExperienceForm = ({ formData = { pastWork: [] }, setFormData }) => {
  const handleChange = (index, field, value) => {
    const updated = [...formData.pastWork];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, pastWork: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      pastWork: [
        ...formData.pastWork,
        { company: "", position: "", years: "", location: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      pastWork: formData.pastWork.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Experience</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add your professional experience.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="text-blue-600 font-medium"
        >
          + Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {formData.pastWork.map((exp, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                value={exp.company || ""}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                placeholder="Company"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                value={exp.position || ""}
                onChange={(e) =>
                  handleChange(index, "position", e.target.value)
                }
                placeholder="Position"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                value={exp.years || ""}
                onChange={(e) => handleChange(index, "years", e.target.value)}
                placeholder="Years"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                value={exp.location || ""}
                onChange={(e) =>
                  handleChange(index, "location", e.target.value)
                }
                placeholder="Location"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-sm text-red-500 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;
