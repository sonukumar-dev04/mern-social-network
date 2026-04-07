import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { fetchStories } from "../../redux/slices/storySlice";
import CreateStoryModal from "./CreateStoryModal";
import StoryViewer from "./StoryViewer/StoryViewer";
import { isStorySeen } from "./StoryViewer/utils/storyUtils";

const SkeletonAvatar = () => (
  <div className="flex flex-col items-center gap-2 shrink-0 animate-pulse">
    <div className="w-[57px] h-[57px] rounded-full bg-slate-100" />
    <div className="w-10 h-2 rounded-full bg-slate-100" />
  </div>
);

const StoryAvatar = ({ group, onClick, seen }) => {
  const firstStory = group.stories[0];

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 shrink-0 group outline-none"
    >
      <div
        className={`p-[2.5px] rounded-full transition-transform duration-200 cursor-pointer group-hover:scale-105 ${
          seen
            ? "bg-slate-200"
            : "bg-gradient-to-br from-blue-500 via-violet-500 to-pink-400"
        }`}
      >
        <div className="p-[2px] bg-white rounded-full">
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
            {firstStory.type === "image" ? (
              <img
                src={firstStory.image} // ← updated
                alt={group.user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: firstStory.bgColor }}
              >
                <span className="text-white text-[9px] font-bold px-1 text-center leading-tight line-clamp-2">
                  {firstStory.text}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <span
        className={`text-[11px] font-medium max-w-[64px] truncate ${
          seen ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {group.user.name.split(" ")[0]}
      </span>
    </button>
  );
};

const StoryBar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.user);
  const { stories = [], loading = false } = useSelector(
    (state) => state.stories ?? {},
  );

  const [showCreate, setShowCreate] = useState(false);
  const [viewingGroupIndex, setViewingGroupIndex] = useState(null);
  const [seenMap, setSeenMap] = useState({});

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  useEffect(() => {
    if (!stories.length) return;
    const map = {};
    stories.forEach((group) => {
      map[group.user._id] = group.stories.every((s) => isStorySeen(s._id));
    });
    setSeenMap(map);
  }, [stories]);

  const openStory = (index) => setViewingGroupIndex(index);

  const closeStory = () => {
    setViewingGroupIndex(null);
    const map = {};
    stories.forEach((group) => {
      map[group.user._id] = group.stories.every((s) => isStorySeen(s._id));
    });
    setSeenMap(map);
  };

  const goNextGroup = () => {
    if (viewingGroupIndex < stories.length - 1) {
      setViewingGroupIndex((i) => i + 1);
    } else {
      closeStory();
    }
  };

  const goPrevGroup = () => {
    if (viewingGroupIndex > 0) setViewingGroupIndex((i) => i - 1);
  };

  return (
    <>
      <div className="bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setShowCreate(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 group outline-none"
          >
            <div className="relative">
              <div className="w-[57px] h-[57px] rounded-full overflow-hidden ring-1 ring-slate-200 group-hover:ring-blue-300 transition-all duration-200 group-hover:scale-105 transform">
                <img
                  src={
                    profile?.profilePicture
                      ? profile.profilePicture // ← updated
                      : "/default_profile.jpg" // ← updated
                  }
                  alt="your story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-[20px] h-[20px] bg-blue-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                <Plus size={11} strokeWidth={3} className="text-white" />
              </div>
            </div>
            <span className="text-[11px] text-slate-700 font-semibold">
              Add story
            </span>
          </button>

          {(loading || stories.length > 0) && (
            <div className="w-px h-10 bg-slate-100 shrink-0" />
          )}

          {loading &&
            Array.from({ length: 4 }).map((_, i) => <SkeletonAvatar key={i} />)}

          {!loading &&
            stories.map((group, index) => (
              <StoryAvatar
                key={group.user._id}
                group={group}
                onClick={() => openStory(index)}
                seen={!!seenMap[group.user._id]}
              />
            ))}
        </div>
      </div>

      {showCreate && <CreateStoryModal onClose={() => setShowCreate(false)} />}

      {viewingGroupIndex !== null && stories[viewingGroupIndex] && (
        <StoryViewer
          group={stories[viewingGroupIndex]}
          onClose={closeStory}
          onNextGroup={goNextGroup}
          onPrevGroup={goPrevGroup}
        />
      )}
    </>
  );
};

export default StoryBar;
