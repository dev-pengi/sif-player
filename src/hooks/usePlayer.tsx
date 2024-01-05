import { usePlayerContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { useControlsContext } from "../contexts";

const usePlayer = () => {
  const navigate = useNavigate();
  const { videoRef, setIsPlaying, setCurrentSpeed } = usePlayerContext();

  const { controllersDeps, setControllersDeps } = useControlsContext();

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

  const handleAddControllerDependencies = (dependency: string) => {
    if (controllersDeps.includes(dependency)) return;
    console.log("adding");
    setControllersDeps((prev) => [
      ...prev.filter((prevDep: string) => prevDep != dependency),
      dependency,
    ]);
  };

  const handleRemoveControllerDependencies = (dependency: string) => {
      console.log("removing");
    setControllersDeps((prev) => {
      console.log(prev);
      console.log(prev.filter((prevDep: string) => prevDep != dependency));
      return prev.filter((prevDep: string) => prevDep != dependency);
    });
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
    handleAddControllerDependencies,handleRemoveControllerDependencies,
    handleTogglePiP,
  };
};

export default usePlayer;
