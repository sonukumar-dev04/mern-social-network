import ProfileCard from "./ProfileCard";
import { HiOutlineCodeBracket } from "react-icons/hi2";

const SkillsSection = ({ data, onEdit }) => {
  return (
    <ProfileCard title="Skills" onEdit={onEdit}>
      <div className="grid grid-cols-2 gap-3">
        {data.map((skill, index) => (
          <div
            key={index}
            className="group flex items-center gap-2 bg-white border border-gray-200 px-3 py-3 rounded-2xl hover:border-gray-300 sm:gap-4 sm:px-5 sm:py-4"
          >
            {/* Icon */}
            <div className="w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
              <HiOutlineCodeBracket className="text-sm sm:text-lg" />
            </div>

            {/* Skill Name */}
            <span className="text-gray-800 font-medium tracking-tight text-xs sm:text-base leading-tight break-words min-w-0">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </ProfileCard>
  );
};

export default SkillsSection;
