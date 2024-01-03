import { FC, useEffect } from "react";
import { usePlayerContext } from "../../contexts/PlayerContext";
import MainController from "../controllers/MainController";

const VideoPlayer: FC = () => {
  const {
    videoRef,
    videoSrc,
    handleLoadStart,
    handleLoadEnd,
    handleTimeUpdate,
    handlePlay,
    handleError,
    handlePause,
    handleVideoEnd,
  } = usePlayerContext();

  useEffect(() => {
    const validTimeout = setTimeout(() => {
      if (!videoSrc) handleError("Video source is not valid");
    }, 3000);
    return () => clearTimeout(validTimeout);
  }, [videoSrc]);

  return (
    <>
      {videoSrc && (
        <video
          ref={videoRef}
          className="object-contain w-screen h-screen"
          src={videoSrc}
          onError={handleLoadStart}
          onLoadStart={handleLoadStart}
          onWaiting={handleLoadStart}
          onPlaying={handleLoadEnd}
          onLoadedData={handleLoadEnd}
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleVideoEnd}
          autoPlay
        ></video>
      )}
      <MainController />
    </>
  );
};

export default VideoPlayer;
