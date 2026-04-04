const EducationForm = ({ formData = { education: [{}] }, setFormData }) => {
  const handleChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { school: "", degree: "", fieldOfStudy: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Education</h3>
        <p className="text-sm text-gray-500 mt-1">
          Add your academic background.
        </p>
      </div>

      {formData.education.map((edu, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            value={edu.school || ""}
            onChange={(e) => handleChange(index, "school", e.target.value)}
            placeholder="School / University"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            value={edu.degree || ""}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
            placeholder="Degree"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            value={edu.fieldOfStudy || ""}
            onChange={(e) =>
              handleChange(index, "fieldOfStudy", e.target.value)
            }
            placeholder="Field of Study"
            className="md:col-span-2 w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="button"
            onClick={() => removeEducation(index)}
            className="text-sm text-red-500 mt-2"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="text-blue-600 font-medium"
      >
        + Add another education
      </button>
    </div>
  );
};

export default EducationForm;
