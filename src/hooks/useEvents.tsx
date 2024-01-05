import { useEffect } from "react";
import { usePlayerContext } from "../contexts";
import { useControlsContext } from "../contexts";

const useEvents = () => {
  const { videoRef, isPlaying, isPiP, setIsPiP } = usePlayerContext();
  const { setIsFullScreen } = useControlsContext();

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
    if (isPlaying) videoRef.current?.play();
    else videoRef.current?.pause();
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
};

export default useEvents;
