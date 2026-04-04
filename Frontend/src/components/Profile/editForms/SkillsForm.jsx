const SkillsForm = ({ formData = { skills: [] }, setFormData }) => {
  const handleChange = (index, value) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        <p className="text-sm text-gray-500 mt-1">
          Add skills that highlight your strengths.
        </p>
      </div>

      <div className="space-y-3">
        {formData.skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
          >
            <input
              type="text"
              value={skill}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-sm text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSkill}
        className="text-blue-600 font-medium"
      >
        + Add another skill
      </button>
    </div>
  );
};

export default SkillsForm;
