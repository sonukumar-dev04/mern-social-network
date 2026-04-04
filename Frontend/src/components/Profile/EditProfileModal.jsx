import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

import HeaderForm from "./editForms/HeaderForm";
import BioForm from "./editForms/BioForm";
import SkillsForm from "./editForms/SkillsForm";
import EducationForm from "./editForms/EducationForm";
import ExperienceForm from "./editForms/ExperienceForm";
import PicturesForm from "./editForms/PicturesForm";

const EditProfileModal = ({ type, userData, profileData, onSave, onClose }) => {
  const getInitialData = () => {
    switch (type) {
      case "header":
        return {
          name: userData?.name || "",
          username: userData?.username || "",
          email: userData?.email || "",
          currentPost: profileData?.currentPost || "",
          currentCompany: profileData?.currentCompany || "",
          currentLocation: profileData?.currentLocation || "",
        };
      case "bio":
        return { bio: profileData?.bio || "" };
      case "skills":
        return { skills: profileData?.skills || [] };
      case "education":
        return { education: profileData?.education || [] };
      case "experience":
        return { pastWork: profileData?.pastWork || [] };
      case "pictures":
        return { profile_picture: null, cover_picture: null };
      default:
        return {};
    }
  };

  const [formData, setFormData] = useState(getInitialData());

  useEffect(() => {
    setFormData(getInitialData());
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case "header":
        return <HeaderForm formData={formData} setFormData={setFormData} />;
      case "bio":
        return <BioForm formData={formData} setFormData={setFormData} />;
      case "skills":
        return <SkillsForm formData={formData} setFormData={setFormData} />;
      case "education":
        return <EducationForm formData={formData} setFormData={setFormData} />;
      case "experience":
        return <ExperienceForm formData={formData} setFormData={setFormData} />;
      case "pictures":
        return <PicturesForm setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    if (type === "pictures") {
      const form = new FormData();
      if (formData.profile_picture)
        form.append("profile_picture", formData.profile_picture);
      if (formData.cover_picture)
        form.append("cover_picture", formData.cover_picture);
      onSave(type, form);
      onClose();
      return;
    }

    let payload = {};
    switch (type) {
      case "header":
        payload = {
          userData: {
            name: formData.name,
            username: formData.username,
            email: formData.email,
          },
          profileData: {
            currentPost: formData.currentPost,
            currentCompany: formData.currentCompany,
            currentLocation: formData.currentLocation,
          },
        };
        break;
      case "bio":
        payload = { profileData: { bio: formData.bio } };
        break;
      case "skills":
        payload = { profileData: { skills: formData.skills } };
        break;
      case "education":
        payload = { profileData: { education: formData.education } };
        break;
      case "experience":
        payload = { profileData: { pastWork: formData.pastWork } };
        break;
      default:
        return;
    }

    onSave(type, payload);
    onClose();
  };

  return (
    // Overlay: p-4 on mobile so the modal never touches screen edges
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-2xl max-h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 capitalize">
              Edit {type}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Update your profile information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <IoClose className="text-xl sm:text-2xl text-gray-600" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 bg-white">
          {renderContent()}
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
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full font-medium transition shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
