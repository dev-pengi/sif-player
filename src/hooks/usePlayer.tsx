import { usePlayerContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { useControlsContext } from "../contexts";
import { useStore } from ".";

const usePlayer = () => {
  const navigate = useNavigate();
  const { videoRef, setIsPlaying, setCurrentSpeed } = usePlayerContext();
  const { controllersDeps, setControllersDeps } = useControlsContext();

  const { handleStoreData } = useStore();

  const handleToggleScreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.body.requestFullscreen();
  };

  const handleBack = () => {
    navigate("/");
  };

  const handlePlaybackSpeedUpdate = (speed: number) => {
    if (!videoRef.current) return;
    setCurrentSpeed(speed);
    videoRef.current.playbackRate = speed;
    handleStoreData({ speed });
  };

  const handleAddControllerDependencies = (dependency: string) => {
    if (controllersDeps.includes(dependency)) return;
    setControllersDeps((prev) => [
      ...prev.filter((prevDep: string) => prevDep != dependency),
      dependency,
    ]);
  };

  const handleRemoveControllerDependencies = (dependency: string) => {
    if (!controllersDeps.includes(dependency)) return;
    setControllersDeps((prev) => {
      return prev.filter((prevDep: string) => prevDep != dependency);
    });
  };

  const handleTogglePiP = () => {
    if (document.pictureInPictureElement) document.exitPictureInPicture();
    else videoRef.current?.requestPictureInPicture();
  };

  const requestPiP = () => {
    videoRef.current?.requestPictureInPicture();
  };

  const cancelPiP = () => {
    document.exitPictureInPicture();
  };

  const handlePlayingChange = (status: boolean = null, toggle = false) => {
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
  };

  const handlePlay = () => {
    handlePlayingChange(true);
  };

  const handlePause = () => {
    handlePlayingChange(false);
  };

  const handleTogglePlay = () => {
    handlePlayingChange(null, true);
  };

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
