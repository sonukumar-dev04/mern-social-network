import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { markStorySeen } from "../../../../redux/slices/storySlice";
import { STORY_DURATION, markLocalSeen } from "../utils/storyUtils";

const useStoryTimer = ({
  story,
  isOwner,
  group,
  currentIndex,
  onNextGroup,
  setCurrentIndex,
}) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const pausedRef = useRef(false);

  // Keep ref in sync
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (!story) return;

    // Mark seen
    markLocalSeen(story._id);
    if (!isOwner) {
      dispatch(
        markStorySeen({ storyId: story._id, groupUserId: group.user._id }),
      );
    }

    // Reset state for new story
    setProgress(0);
    setPaused(false);
    pausedRef.current = false;
    clearInterval(intervalRef.current);

    const tick = 100;
    const step = (tick / STORY_DURATION) * 100;

    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return;
      setProgress((prev) => {
        if (prev + step >= 100) {
          clearInterval(intervalRef.current);
          setCurrentIndex((ci) => {
            if (ci < group.stories.length - 1) return ci + 1;
            onNextGroup();
            return ci;
          });
          return 100;
        }
        return prev + step;
      });
    }, tick);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, group.user._id]);

  return { progress, paused, setPaused, intervalRef };
};

export default useStoryTimer;
