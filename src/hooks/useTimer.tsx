import { usePlayerContext, useTimerContext } from "../contexts";

const useTimer = () => {
  const { videoRef } = usePlayerContext();
  const { duration, currentTime, setCurrentTime } = useTimerContext();

  const handleSeek = (time: number) => {
    const clampedTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(clampedTime);
    videoRef.current.currentTime = clampedTime;
  };

  const handleSkipForward = (amount: number) => {
    const newTime = Math.max(0, Math.min(currentTime + amount, duration));
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };

  const handleSkipBackward = (amount: number) => {
    const newTime = Math.max(0, Math.min(currentTime - amount, duration));
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  return {
    handleSeek,
    handleSkipForward,
    handleSkipBackward,
    handleTimeUpdate,
  };
};

export default useTimer;
