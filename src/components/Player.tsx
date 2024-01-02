import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePlayerContext } from "../contexts/PlayerContext";
import { PlayerError } from "./errors";
import { VideoPlayer } from "./players";

const useVideoSrc = () => {
  const location = useLocation();
  const { setVideoSrc } = usePlayerContext();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const blobID = queryParams.get("src");

    const { protocol, host } = window.location;

    const blobUrl = `blob:${protocol}//${host}/${blobID}`;
    setVideoSrc(blobUrl);
  }, []);
};

const useVideoMetadata = () => {
  const { setDuration, videoRef, videoSrc } = usePlayerContext();

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
  }, [videoSrc]);
};

const Player: FC = () => {
  const { isError } = usePlayerContext();
  useVideoSrc();
  useVideoMetadata();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-1 bg-black">
      {isError ? <PlayerError /> : <VideoPlayer />}
    </div>
  );
};

export default Player;
