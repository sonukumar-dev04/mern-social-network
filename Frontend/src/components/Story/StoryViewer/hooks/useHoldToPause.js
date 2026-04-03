import { useRef } from "react";
import { HOLD_DELAY } from "../utils/storyUtils";

const useHoldToPause = ({ setPaused, goPrevStory, goNextStory }) => {
  const holdTimer = useRef(null);
  const isHolding = useRef(false);

  const startHold = () => {
    holdTimer.current = setTimeout(() => {
      isHolding.current = true;
      setPaused(true);
    }, HOLD_DELAY);
  };

  const endHold = (side) => {
    clearTimeout(holdTimer.current);
    if (isHolding.current) {
      isHolding.current = false;
      setPaused(false);
    } else {
      if (side === "left") goPrevStory();
      else goNextStory();
    }
  };

  const cancelHold = () => {
    clearTimeout(holdTimer.current);
    if (isHolding.current) {
      isHolding.current = false;
      setPaused(false);
    }
  };

  return { startHold, endHold, cancelHold };
};

export default useHoldToPause;
