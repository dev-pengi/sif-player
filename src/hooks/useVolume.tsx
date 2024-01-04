import { useHotkeys } from "react-hotkeys-hook";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useCallback } from "react";

const useVolume = () => {
  const { setVolume, setIsMuted, videoRef, shortcutsEnabled } =
    usePlayerContext();
  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      videoRef.current.muted = !prev;
      return !prev;
    });
  }, []);

  const handleVolumeChange = useCallback((volume: number) => {
    const newVolume = Math.max(0, Math.min(volume, 100));
    setVolume(newVolume);
    setIsMuted(false);
    videoRef.current.volume = newVolume / 100;
  }, []);

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

  // volume control with arrow keys
  useConditionalHotkeys("up", () => {
    handleVolumeChange(videoRef.current.volume * 100 + 5);
  });
  useConditionalHotkeys("down", () => {
    handleVolumeChange(videoRef.current.volume * 100 - 5);
  });

  // volume control with ctrl+arrow keys
  useConditionalHotkeys("ctrl+up", () => {
    handleVolumeChange(videoRef.current.volume * 100 + 20);
  });
  useConditionalHotkeys("ctrl+down", () => {
    handleVolumeChange(videoRef.current.volume * 100 - 20);
  });

  useConditionalHotkeys("m", handleToggleMute, true);

  return { handleToggleMute };
};

export default useVolume;
