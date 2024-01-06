import { useEffect } from "react";
import {
  useControlsContext,
  usePlayerContext,
  useTimerContext,
} from "../contexts";

const useClean = () => {
  const {
    setDuration,
    setCurrentTime,
    setTimePercentage,
    setBufferedPercentage,
  } = useTimerContext();

  const { setIsFullScreen } = useControlsContext();
  const { setIsError, setMediaData } = usePlayerContext();

  useEffect(() => {
    setDuration(0);
    setCurrentTime(0);
    setTimePercentage(0);
    setBufferedPercentage(0);
    setIsFullScreen(false);
    setIsError(false);
    setMediaData(null);
  }, []);
};

export default useClean;
