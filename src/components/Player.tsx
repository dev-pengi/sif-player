import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePlayerContext } from "../contexts";
import { PlayerError } from "./errors";
import { VideoPlayer } from "./players";
import { useErrors, useEvents, useShortcuts } from "../hooks";

const useVideoSrc = () => {
  const location = useLocation();
  const { setVideoSrc, setMediaData } = usePlayerContext();
  useEvents();
  useShortcuts();
  useErrors()

  useEffect(() => {
    const handleVideoSrc = async () => {
      const queryParams = new URLSearchParams(location.search);
      const src = queryParams.get("src");
      const type = queryParams.get("type");

      const { protocol, host } = window.location;
      if (type === "local") {
        const blobUrl = `blob:${protocol}//${host}/${src}`;
        setVideoSrc(blobUrl);
      } else {
        setVideoSrc(src);
        const controller = new AbortController();
        const signal = controller.signal;

        const mediaData = await fetch(src, { signal });
        const name = mediaData.headers
          .get("Content-Disposition")
          .split(";")[1]
          .trim()
          .split("=")[1]
          .replace(/"/g, "");
        const size = mediaData.headers.get("content-length");
        const type = mediaData.headers.get("content-type");

        setMediaData({ name, size, type });
        controller.abort();
      }
    };

    handleVideoSrc();
  }, []);
};
const Player: FC = () => {
  const { isError } = usePlayerContext();
  useVideoSrc();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-1 bg-black">
      {isError ? <PlayerError /> : <VideoPlayer />}
    </div>
  );
};

export default Player;
