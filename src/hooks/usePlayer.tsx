import { usePlayerContext, useSettingsContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { useControlsContext } from "../contexts";
import { useCallback } from "react";
import { useStore } from ".";

const usePlayer = () => {
  const navigate = useNavigate();
  const { videoRef, setIsPlaying, setCurrentSpeed } = usePlayerContext();
  const { saveAdjustments } = useSettingsContext();
  const { controllersDeps, setControllersDeps } = useControlsContext();

  const { handleStoreData } = useStore();

  const handleToggleScreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.body.requestFullscreen();
  }, []);

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handlePlaybackSpeedUpdate = useCallback((speed: number) => {
    if (!videoRef.current) return;
    setCurrentSpeed(speed);
    videoRef.current.playbackRate = speed;
    handleStoreData({ speed });
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

  const requestPiP = useCallback(() => {
    videoRef.current?.requestPictureInPicture();
  }, []);

  const cancelPiP = useCallback(() => {
    document.exitPictureInPicture();
  }, []);

  const handlePlayingChange = useCallback(
    (status: boolean = null, toggle = false) => {
      if (status === null && toggle === true) {
        setIsPlaying((prev) => {
          if (prev) {
            videoRef.current?.pause();
            handleAddControllerDependencies("paused");
          } else {
            videoRef.current?.play();
            handleRemoveControllerDependencies("paused");
          }
          return !prev;
        });
        return;
      }
      setIsPlaying(status);
      if (status) {
        videoRef.current?.play();
        handleRemoveControllerDependencies("paused");
      } else {
        videoRef.current?.pause();
        handleAddControllerDependencies("paused");
      }
    },
    []
  );

  const handlePlay = useCallback(() => {
    handlePlayingChange(true);
  }, []);

  const handlePause = useCallback(() => {
    handlePlayingChange(false);
  }, []);

  const handleTogglePlay = useCallback(() => {
    handlePlayingChange(null, true);
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
    requestPiP,
    cancelPiP,
  };
};

export default usePlayer;
