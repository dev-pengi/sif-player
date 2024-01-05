import { usePlayerContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { useControlsContext } from "../contexts";

const usePlayer = () => {
  const navigate = useNavigate();
  const {
    videoRef,
    setIsPlaying,

    setCurrentSpeed,
  } = usePlayerContext();
  const { isFullScreen, controllersDeps, setControllersDeps } =
    useControlsContext();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleToggleScreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.body.requestFullscreen();
  };
  const handleBack = () => {
    navigate("/");
  };
  const handlePlaybackSpeedUpdate = (speed: number) => {
    setCurrentSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const handleControllerDependencies = (dependency: string, toAdd = true) => {
    if (controllersDeps.includes(dependency)) return;
    if (toAdd) {
      setControllersDeps((prev) => [
        ...prev.filter((prevDep: string) => prevDep !== dependency),
        dependency,
      ]);
    } else {
      setControllersDeps((prev) =>
        prev.filter((prevDep: string) => prevDep !== dependency)
      );
    }
  };

  const handleTogglePiP = () => {
    if (document.pictureInPictureElement) document.exitPictureInPicture();
    else videoRef.current?.requestPictureInPicture();
  };

  return {
    handlePlay,
    handlePause,
    handleTogglePlay,
    handleToggleScreen,
    handleBack,
    handlePlaybackSpeedUpdate,
    handleControllerDependencies,
    handleTogglePiP,
  };
};

export default usePlayer;
