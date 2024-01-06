import { useStore } from ".";
import { usePlayerContext, useTimerContext } from "../contexts";

const useTimer = () => {
  const { videoRef } = usePlayerContext();
  const { duration, currentTime, setCurrentTime, setTimePercentage } =
    useTimerContext();

  const handleCalculateTimePercentage = (time: number) => {
    if (!duration) return setTimePercentage(0);
    const percentage = time / duration;
    setTimePercentage(percentage);
  };

  const handleSeek = (time: number) => {
    if (!videoRef?.current) return;
    const clampedTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(clampedTime);
    videoRef.current.currentTime = clampedTime;
    handleCalculateTimePercentage(time);
  };

  const handleSkipForward = (amount: number) => {
    const newTime = Math.max(0, Math.min(currentTime + amount, duration));
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
    handleCalculateTimePercentage(newTime);
  };

  const handleSkipBackward = (amount: number) => {
    const newTime = Math.max(0, Math.min(currentTime - amount, duration));
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
    handleCalculateTimePercentage(newTime);
  };

  const handleTimeUpdate = () => {
    const time = videoRef.current.currentTime;
    setCurrentTime(time);
    handleCalculateTimePercentage(time);
  };

  return {
    handleSeek,
    handleSkipForward,
    handleSkipBackward,
    handleTimeUpdate,
  };
};

export default useTimer;
