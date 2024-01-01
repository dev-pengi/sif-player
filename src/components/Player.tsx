import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";
import PlayToggle from "./controllers/Buttons/PlayToggle";
import FullScreenButton from "./controllers/Buttons/FullScreenToggle";
import Volume from "./controllers/Buttons/VolumeSlider";
import { useHotkeys } from "react-hotkeys-hook";
import MainController from "./controllers/MainController";
import { usePlayerContext } from "../contexts/PlayerContext";

interface PlayerProps {
  // Add your prop types here
}

const Player: FC<PlayerProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const {
    isError,
    videoSrc,
    setVideoSrc,
    setDuration,
    handleBack,
    handleLoadStart,
    handleLoadEnd,
    handleError,
    handlePlay,
    handlePause,
    handleTimeUpdate,
    videoRef
  } = usePlayerContext();

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

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-1 bg-black">
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
            // onError={handleError}
            onInvalid={handleError}
            onPlay={handlePlay}
            onPause={handlePause}
            autoPlay
          ></video>
          <MainController />
        </>
      )}
    </div>
  );
};

export default Player;
