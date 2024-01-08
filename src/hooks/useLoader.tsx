import {
  useLoaderContext,
  useTimerContext,
  usePlayerContext,
  useSettingsContext,
} from "../contexts";

const useLoader = () => {
  const { videoRef, setMediaData } = usePlayerContext();
  const { isLoop } = useSettingsContext();
  const { setIsLoading } = useLoaderContext();
  const { setDuration, setCurrentTime } = useTimerContext();

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    setDuration(videoRef.current.duration);
    setMediaData((prev: any) => ({
      ...prev,
      resolution: videoRef.current.videoHeight,
    }));
  };

  const handleVideoEnd = () => {
    if (isLoop) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current.play();
    }
  };

  return {
    handleLoadStart,
    handleLoadEnd,
    handleVideoEnd,
  };
};

export default useLoader;
