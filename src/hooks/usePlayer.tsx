import { useCallback, useEffect } from "react";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useHotkeys } from "react-hotkeys-hook";

const usePlayer = () => {
  const {
    videoRef,
    isPlaying,
    setIsPlaying,
    isFullScreen,
    setIsFullScreen,
    setCurrentSpeed,
    shortcutsEnabled,
  } = usePlayerContext();

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef?.current?.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    videoRef?.current?.pause();
  };

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);

    isPlaying ? videoRef?.current?.pause() : videoRef?.current?.play();
  }, [isPlaying]);

  const handlePlaybackSpeedUpdate = useCallback((speed: number) => {
    setCurrentSpeed(speed);
    videoRef.current.playbackRate = speed;
  }, []);

  const handleToggleScreen = () => {
    if (isFullScreen) document.exitFullscreen();
    else document.body.requestFullscreen();
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
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

  // play/pause with space bar
  useConditionalHotkeys("space, pause", handleTogglePlay, true);

  // toggle fullscreen with f
  useConditionalHotkeys("f", handleToggleScreen, true);

  return {
    handlePlay,
    handlePause,
    handleTogglePlay,
    handlePlaybackSpeedUpdate,
    handleToggleScreen,
  };
};

export default usePlayer;
