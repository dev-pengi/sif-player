import { FC } from "react";
import { usePlayerContext } from "../../contexts";
import MainController from "../controllers/MainController";
import { useLoader, usePlayer, useTimer } from "../../hooks";

const VideoPlayer: FC = () => {
  const { videoRef, videoSrc } = usePlayerContext();

  const { handleLoadStart, handleLoadEnd, handleVideoEnd } = useLoader();
  const { handlePlay, handlePause } = usePlayer();
  const { handleTimeUpdate } = useTimer();

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
