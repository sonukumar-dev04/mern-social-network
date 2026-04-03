import { BASE_URL } from "./utils/storyUtils";

const StoryContent = ({ story }) => (
  <>
    {story.type === "image" ? (
      <>
        <img
          src={`${BASE_URL}/uploads/${story.image}`}
          alt="story"
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 pointer-events-none" />
      </>
    ) : (
      <div
        className="w-full h-full flex items-center justify-center p-10 pointer-events-none"
        style={{ backgroundColor: story.bgColor || "#2563EB" }}
      >
        <p className="text-white text-2xl font-bold text-center leading-snug">
          {story.text}
        </p>
      </div>
    )}
  </>
);

export default StoryContent;
