import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { deleteStory } from "../../../redux/slices/storySlice";

import ProgressBars from "./ProgressBars";
import StoryHeader from "./StoryHeader";
import StoryContent from "./StoryContent";
import SeenByPanel from "./SeenByPanel";
import PauseIndicator from "./PauseIndicator";
import useStoryTimer from "./hooks/useStoryTimer";
import useHoldToPause from "./hooks/useHoldToPause";

// StoryViewer
const StoryViewer = ({ group, onClose, onPrevGroup, onNextGroup }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.user);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showViewers, setShowViewers] = useState(false);

  const story = group.stories[currentIndex];
  const isOwner = story?.user?._id === profile?._id;

  // ── Navigation
  const goNextStory = useCallback(() => {
    if (currentIndex < group.stories.length - 1) setCurrentIndex((i) => i + 1);
    else onNextGroup();
  }, [currentIndex, group.stories.length, onNextGroup]);

  const goPrevStory = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    else onPrevGroup();
  }, [currentIndex, onPrevGroup]);

  // ── Timer
  const { progress, paused, setPaused, intervalRef } = useStoryTimer({
    story,
    isOwner,
    group,
    currentIndex,
    onNextGroup,
    setCurrentIndex,
  });

  // ── Hold / tap
  const { startHold, endHold, cancelHold } = useHoldToPause({
    setPaused,
    goPrevStory,
    goNextStory,
  });

  // ── Delete
  const handleDelete = async () => {
    clearInterval(intervalRef.current);
    await dispatch(deleteStory(story._id));
    if (group.stories.length === 1) onClose();
    else if (currentIndex < group.stories.length - 1) setCurrentIndex((i) => i);
    else setCurrentIndex((i) => i - 1);
  };

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
      {/* ── Prev user arrow ── */}
      <button
        onClick={onPrevGroup}
        className="absolute left-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {/* ── Story card ── */}
      <div
        className="relative w-[340px] rounded-3xl overflow-hidden shadow-2xl select-none"
        style={{ height: "580px" }}
      >
        <ProgressBars
          total={group.stories.length}
          current={currentIndex}
          progress={progress}
        />

        <StoryHeader
          story={story}
          isOwner={isOwner}
          onEyeClick={() => setShowViewers((v) => !v)}
          onDelete={handleDelete}
          onClose={onClose}
        />

        <StoryContent story={story} />

        <PauseIndicator visible={paused} />

        {/* ── LEFT tap / hold zone ── */}
        <div
          className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer"
          onMouseDown={startHold}
          onMouseUp={() => endHold("left")}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={() => endHold("left")}
        />

        {/* ── RIGHT tap / hold zone ── */}
        <div
          className="absolute right-0 top-0 w-2/3 h-full z-10 cursor-pointer"
          onMouseDown={startHold}
          onMouseUp={() => endHold("right")}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={() => endHold("right")}
        />

        <SeenByPanel visible={showViewers} seenBy={story.seenBy || []} />
      </div>

      {/* ── Next user arrow ── */}
      <button
        onClick={onNextGroup}
        className="absolute right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default StoryViewer;
