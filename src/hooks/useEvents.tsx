import { useCallback, useEffect } from "react";
import {
  usePlayerContext,
  useControlsContext,
  useTimerContext,
  useSettingsContext,
} from "../contexts";
import { usePlayer, useStore } from ".";

const useEvents = () => {
  const { videoRef, isPlaying, isPiP, setIsPiP } = usePlayerContext();
  const { duration, currentTime, setBufferedPercentage } = useTimerContext();
  const { saveTrack } = useSettingsContext();
  const { setIsFullScreen } = useControlsContext();
  const {
    handleAddControllerDependencies,
    handleRemoveControllerDependencies,
  } = usePlayer();
  const { handleStoreData } = useStore();

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current?.play();
      handleRemoveControllerDependencies("paused");
    } else {
      videoRef.current?.pause();
      handleAddControllerDependencies("paused");
    }
  }, [isPlaying]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const enterPiPHandler = () => setIsPiP(true);
    const leavePiPHandler = () => setIsPiP(false);

    videoElement.addEventListener("enterpictureinpicture", enterPiPHandler);
    videoElement.addEventListener("leavepictureinpicture", leavePiPHandler);

    return () => {
      videoElement.removeEventListener(
        "enterpictureinpicture",
        enterPiPHandler
      );
      videoElement.removeEventListener(
        "leavepictureinpicture",
        leavePiPHandler
      );
    };
  }, [isPiP]);

  const calculateBufferedPercentage = () => {
    if (!videoRef.current) return 0;
    const buffered = videoRef.current.buffered;
    if (buffered.length === 0) return 0;
    const bufferedEnd = buffered.end(buffered.length - 1);
    return bufferedEnd / duration;
  };

  useEffect(() => {
    const storeInterval = setInterval(() => {
      if (!duration || !videoRef.current) return;
      saveTrack &&
        handleStoreData({
          time: videoRef.current.currentTime,
        });
    }, 500);

    return () => {
      clearInterval(storeInterval);
    };
  }, [duration]);

  useEffect(() => {
    const bufferedPercentage = calculateBufferedPercentage();
    setBufferedPercentage(bufferedPercentage);
  }, [currentTime]);
};

export default useEvents;
