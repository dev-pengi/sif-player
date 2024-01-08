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
    const resolution = videoRef.current.videoHeight;

    setMediaData((prev) => {
      const safePrev = prev || {};
      safePrev.resolution = resolution;
      return safePrev;
    });
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
