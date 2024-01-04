import { useCallback, useEffect } from "react";
import { usePlayerContext } from "../contexts/PlayerContext";

const useLoader = () => {
  const { setIsLoading, setDuration, isLoop, setCurrentTime, videoRef } =
    usePlayerContext();

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    setDuration(videoRef.current.duration);
  }, []);

  const handleVideoEnd = useCallback(() => {
    if (isLoop) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current.play();
    }
  }, [isLoop]);

  return {
    handleLoadStart,
    handleLoadEnd,
    handleVideoEnd,
  };
};

export default useLoader;
