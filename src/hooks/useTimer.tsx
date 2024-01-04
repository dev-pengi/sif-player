import { useHotkeys } from "react-hotkeys-hook";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useCallback } from "react";

const useTimer = () => {
  const { videoRef, setCurrentTime, shortcutsEnabled } = usePlayerContext();
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };
  const useConditionalHotkeys = useCallback(
    (key: string, callback: (...props: any) => any, once = false) => {
      useHotkeys(
        key,
        () => {
          if (shortcutsEnabled) {
            callback();
          }
        },
        {
          keydown: !once,
          keyup: once,
        }
      );
    },
    []
  );

  // seeking with arrow keys
  useConditionalHotkeys("right", () => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 10,
      videoRef.current.duration
    );
    setCurrentTime((prev) => Math.min(prev + 10, videoRef.current.duration));
  });
  useConditionalHotkeys("left", () => {
    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 10,
      0
    );
    setCurrentTime((prev) => Math.max(prev - 10, 0));
  });

  // seeking with ctrl+arrow keys
  useConditionalHotkeys("ctrl+right", () => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 60,
      videoRef.current.duration
    );
    setCurrentTime((prev) => Math.min(prev + 60, videoRef.current.duration));
  });
  useConditionalHotkeys("ctrl+left", () => {
    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 60,
      0
    );
    setCurrentTime((prev) => Math.max(prev - 60, 0));
  });
  useConditionalHotkeys(
    "end",
    () => {
      videoRef.current.currentTime = videoRef.current.duration;
      setCurrentTime(videoRef.current.duration);
    },
    true
  );
  useConditionalHotkeys(
    "home",
    () => {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    },
    true
  );
  return {
    handleTimeUpdate,
  };
};

export default useTimer;
