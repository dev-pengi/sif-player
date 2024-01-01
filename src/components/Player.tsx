import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";
import PlayToggle from "./PlayButton/Toggle";
import FullScreenButton from "./FullScreenButton/FullScreenToggle";
import Volume from "./VolumeButton/Volume";
import { useHotkeys } from "react-hotkeys-hook";

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

  const [isPanelHovering, setIsPanelHovering] = useState(false);

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

  const handleError = (error) => {
    setIsError(true);
    console.error(error);
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

  const handleVolumeChange = (volume) => {
    setVolume(volume);
    videoRef.current.volume = volume / 100;
  };

  useHotkeys("right", () => {
    videoRef.current.currentTime += 10;
  });
  useHotkeys("left", () => {
    videoRef.current.currentTime -= 10;
  });
  useHotkeys("up", () => {
    videoRef.current.volume = Math.min(videoRef.current.volume + 0.05, 1);
    setVolume((prev) => Math.min(prev + 5, 100));
  });
  useHotkeys("down", () => {
    videoRef.current.volume = Math.max(videoRef.current.volume - 0.05, 0);
    setVolume((prev) => Math.max(prev - 5, 0));
  });
  useHotkeys("space", () => {
    handleTogglePlay();
  });
  useHotkeys("f", () => {
    toggleScreenHandler();
  });
  useHotkeys("m", () => {
    videoRef.current.muted = !videoRef.current.muted;
  });

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
          <div className="absolute w-screen h-screen flex flex-col">
            <div className="flex-1 flex items-end">
              <div
                onMouseLeave={() => setIsPanelHovering(false)}
                onMouseEnter={() => setIsPanelHovering(true)}
                className="flex w-full items-center px-12 py-5 justify-between"
              >
                <div className="flex items-center justify-center">
                  <PlayToggle
                    isPlaying={isPlaying}
                    handleTogglePlay={handleTogglePlay}
                  />
                  <LayoutGroup>
                    <div className="ml-3">
                      <Volume
                        onVolumeChange={handleVolumeChange}
                        volume={volume}
                        isPanelHovering={isPanelHovering}
                      />
                    </div>
                    <motion.p layout className="drop-shadow-2xl ml-3">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </motion.p>
                  </LayoutGroup>
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
