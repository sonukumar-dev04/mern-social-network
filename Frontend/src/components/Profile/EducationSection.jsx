import ProfileCard from "./ProfileCard";
import { FaGraduationCap } from "react-icons/fa";

const EducationSection = ({ data, onEdit }) => {
  return (
    <ProfileCard title="Education" onEdit={onEdit}>
      <div className="space-y-6">
        {data.map((edu, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl">
              <FaGraduationCap className="text-blue-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {edu.school}
              </h3>
              <p className="text-sm text-gray-600">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ProfileCard>
  );
};

export default EducationSection;
