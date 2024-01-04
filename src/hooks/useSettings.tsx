import { useEffect } from "react";
import { usePlayerContext } from "../contexts/PlayerContext";

const useSettings = () => {
  const {
    videoSrc,
    isPlaying,
    isFullScreen,
    volume,
    isMuted,
    currentSpeed,
    isLocked,
    isLoop,
    shortcutsEnabled,
    isPiP,
    setIsPiP,
    setShortcutsEnabled,
    setIsLoop,
    setIsLocked,
    setVideoFile,
    setMediaData,
    setIsPanelHovering,
    setVideoSrc,
    setIsLoading,
    setIsError,
    setIsPlaying,
    setIsFullScreen,
    setVolume,
    setIsMuted,
    setDuration,
    setCurrentTime,
    setCurrentSpeed,
    videoRef,
  } = usePlayerContext();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (isPiP) videoElement.requestPictureInPicture();
    else document.exitPictureInPicture();

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
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (isPiP) videoElement.requestPictureInPicture();
    else document.exitPictureInPicture();

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
  
  return {};
};

export default useSettings;
