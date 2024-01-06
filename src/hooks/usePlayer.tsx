import { usePlayerContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { useControlsContext } from "../contexts";
import { useCallback } from "react";

const usePlayer = () => {
  const navigate = useNavigate();
  const { videoRef, setIsPlaying, setCurrentSpeed } = usePlayerContext();

  const { controllersDeps, setControllersDeps } = useControlsContext();

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleToggleScreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.body.requestFullscreen();
  }, []);

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handlePlaybackSpeedUpdate = useCallback((speed: number) => {
    setCurrentSpeed(speed);
    videoRef.current.playbackRate = speed;
  }, []);

  const handleAddControllerDependencies = useCallback(
    (dependency: string) => {
      if (controllersDeps.includes(dependency)) return;
      setControllersDeps((prev) => [
        ...prev.filter((prevDep: string) => prevDep != dependency),
        dependency,
      ]);
    },
    [controllersDeps]
  );

  const handleRemoveControllerDependencies = useCallback(
    (dependency: string) => {
      if (!controllersDeps.includes(dependency)) return;
      setControllersDeps((prev) => {
        return prev.filter((prevDep: string) => prevDep != dependency);
      });
    },
    [controllersDeps]
  );

  const handleTogglePiP = useCallback(() => {
    if (document.pictureInPictureElement) document.exitPictureInPicture();
    else videoRef.current?.requestPictureInPicture();
  }, []);

  return {
    handlePlay,
    handlePause,
    handleTogglePlay,
    handleToggleScreen,
    handleBack,
    handlePlaybackSpeedUpdate,
    handleAddControllerDependencies,
    handleRemoveControllerDependencies,
    handleTogglePiP,
  };
};

export default usePlayer;
