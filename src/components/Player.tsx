import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  usePlayerContext,
  useSettingsContext,
  useTimerContext,
} from "../contexts";
import { PlayerError } from "./errors";
import { VideoPlayer } from "./players";
import {
  useErrors,
  useEvents,
  usePlayer,
  useShortcuts,
  useStore,
  useTimer,
  useVolume,
} from "../hooks";

const useVideoSrc = () => {
  const location = useLocation();
  const { setVideoSrc, setMediaData } = usePlayerContext();

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
        const url = src;
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

        setMediaData({ name, url, size, type });
        controller.abort();
      }
    };

    handleVideoSrc();
  }, []);
};

const Player: FC = () => {
  const { isError, mediaData } = usePlayerContext();
  const { duration } = useTimerContext();
  const { saveTrack, saveAdjustments } = useSettingsContext();
  const { handleSeek } = useTimer();
  const { handleVolumeChange } = useVolume();
  const { handlePlaybackSpeedUpdate } = usePlayer();
  useVideoSrc();
  useEvents();
  useShortcuts();
  useErrors();

  const { handleFetchData } = useStore();

  useEffect(() => {
    const data = handleFetchData();
    if (data) {
      const { time, volume, muted, speed } = data;
      if (time && !isNaN(time) && saveTrack) handleSeek(Math.round(time));
      if (!saveAdjustments) {
        if (volume && !isNaN(volume)) {
          handleVolumeChange(volume);
          if (muted) handleVolumeChange(0);
        }
        if (speed && !isNaN(speed)) handlePlaybackSpeedUpdate(speed);
      }
    }
  }, [mediaData?.name, mediaData?.url, duration]);

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-1 bg-black">
      {isError ? <PlayerError /> : <VideoPlayer />}
    </div>
  );
};

export default Player;
