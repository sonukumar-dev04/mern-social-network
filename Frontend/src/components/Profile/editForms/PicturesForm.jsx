import { useState } from "react";

const PicturesForm = ({ setFormData }) => {
  const [preview, setPreview] = useState({
    profile: null,
    cover: null,
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    if (!file) return;

    // preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview((prev) => ({
        ...prev,
        [type]: reader.result,
      }));
    };
    reader.readAsDataURL(file);

    // send file to parent
    setFormData((prev) => ({
      ...prev,
      [type === "profile" ? "profile_picture" : "cover_picture"]: file,
    }));
  };

  return (
    <div className="space-y-10">
      {/* PROFILE PICTURE */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>

        {preview.profile && (
          <img
            src={preview.profile}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover border"
          />
        )}

        <label className="inline-block cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition">
          Upload Profile Picture
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e, "profile")}
          />
        </label>
      </div>

      {/* COVER PICTURE */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Cover Picture</h3>

        {preview.cover && (
          <img
            src={preview.cover}
            alt="Cover Preview"
            className="w-full h-40 rounded-xl object-cover border"
          />
        )}

        <label className="inline-block cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition">
          Upload Cover Picture
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e, "cover")}
          />
        </label>
      </div>
    </div>
  );
};

export default PicturesForm;
