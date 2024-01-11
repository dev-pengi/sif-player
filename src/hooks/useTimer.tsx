import { useDispatch, useSelector } from "react-redux";
import { usePlayerContext } from "../contexts";
import { timerActions } from "../store";

const useTimer = () => {
  const dispatch = useDispatch();
  const { videoRef } = usePlayerContext();
  const { duration, currentTime } = useSelector(
    (state: any) => state.timerReducer
  );

  const handleSeek = (time: number) => {
    if (!videoRef?.current) return;
    const clampedTime = Math.max(0, Math.min(time, duration));
    dispatch(timerActions.updateTime(clampedTime));
    videoRef.current.currentTime = clampedTime;
  };

  const handleSkipForward = (amount: number) => {
    const newTime = Math.max(0, Math.min(currentTime + amount, duration));
    dispatch(timerActions.updateTime(newTime));
    videoRef.current.currentTime = newTime;
  };

  const handleSkipBackward = (amount: number) => {
    const newTime = Math.max(0, Math.min(currentTime - amount, duration));
    dispatch(timerActions.updateTime(newTime));
    videoRef.current.currentTime = newTime;
  };

  const handleTimeUpdate = () => {
    const time = videoRef.current.currentTime;
    dispatch(timerActions.updateTime(time));
  };

  return {
    handleSeek,
    handleSkipForward,
    handleSkipBackward,
    handleTimeUpdate,
  };
};

export default useTimer;
