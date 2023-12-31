import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import VolumeButton from "./VolumeButton";
import PlayToggle from "./PlayButton/Toggle";
import FullScreenButton from "./FullScreenButton/Button";

interface PlayerProps {
  // Add your prop types here
}

const Player: FC<PlayerProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const videoRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [videoSrc, setVideoSrc] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(100);
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedTime = [days, hours, minutes, remainingSeconds]
      .map((timeUnit) => (timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`))
      .filter((timeUnit, index) => index > 1 || timeUnit !== "00") // Remove leading zeros except for the last unit
      .join(":");

    return formattedTime;
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const blobID = queryParams.get("src");

    const { protocol, host } = window.location;

    const blobUrl = `blob:${protocol}//${host}/${blobID}`;
    setVideoSrc(blobUrl);
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      const handleMetadataLoaded = () => {
        setDuration(videoRef.current.duration);
      };

      videoRef.current.addEventListener("loadedmetadata", handleMetadataLoaded);

      return () => {
        videoRef?.current?.removeEventListener(
          "loadedmetadata",
          handleMetadataLoaded
        );
      };
    }
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };
  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsError(true);
  };
  const handlePlay = () => {
    setIsPlaying(true);
  };
  const handlePause = () => {
    setIsPlaying(false);
  };
  const handleTogglePlay = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying((prev) => !prev);
  };

  const toggleScreenHandler = () => {
    if (isFullScreen) document.exitFullscreen();
    else document.body.requestFullscreen();

    setIsFullScreen((prev) => !prev);
  };
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-1 bg-black" onDoubleClick={toggleScreenHandler}>
      {isError ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl">
            Error while loading or playing this video :(
          </h1>
          <button
            onClick={handleBack}
            className="py-3 px-5 mt-4 text-[14px] text-white bg-primary rounded-[4px] capitalize"
          >
            Pick another video
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="object-contain w-screen h-screen"
            src={videoSrc}
            onLoadStart={handleLoadStart}
            onLoadedData={handleLoadEnd}
            onTimeUpdate={handleTimeUpdate}
            onError={handleError}
            onPlay={handlePlay}
            onPause={handlePause}
            autoPlay
          ></video>
          <div className="absolute w-screen h-screen flex flex-col">
            <div className="flex-1 flex items-end">
              <div className="flex w-full items-center px-12 py-5 justify-between">
                <div className="flex items-center justify-center">
                  <div className="w-[23px] h-[23px]">
                    <PlayToggle
                      isPlaying={isPlaying}
                      handleTogglePlay={handleTogglePlay}
                    />
                  </div>
                  {/* <div className="ml-5"> */}
                  {/* <VolumeButton/> */}
                  {/* </div> */}
                  <p className="drop-shadow-2xl ml-5">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </p>
                </div>
                <div>
                  <div className="w-[23px] h-[23px] ">
                    <FullScreenButton onToggle={toggleScreenHandler} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
