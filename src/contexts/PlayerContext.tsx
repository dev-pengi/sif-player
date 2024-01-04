// yeah right, that's the black magic powering this app, enjoy this complete mess,
// or feel free to contribute and make it more readable :)

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useRef,
  useEffect,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";

interface PlayerContextProps {
  videoFile: any;
  isLoading: boolean;
  isError: boolean;
  videoSrc: string;
  isPlaying: boolean;
  isFullScreen: boolean;
  volume: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  isPanelHovering: boolean;
  mediaData: any;
  currentSpeed: number;
  isLocked: boolean;
  isLoop: boolean;
  shortcutsEnabled: boolean;
  isPiP: boolean;
  controllersDeps: string[];
  setControllersDeps: Dispatch<SetStateAction<string[]>>;
  setIsPiP: Dispatch<SetStateAction<boolean>>;
  setShortcutsEnabled: Dispatch<SetStateAction<boolean>>;
  setIsLoop: Dispatch<SetStateAction<boolean>>;
  setIsLocked: Dispatch<SetStateAction<boolean>>;
  setVideoFile: Dispatch<SetStateAction<any>>;
  setMediaData: Dispatch<SetStateAction<any>>;
  setVideoSrc: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
  setDuration: Dispatch<SetStateAction<number>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  setIsPanelHovering: Dispatch<SetStateAction<boolean>>;
  setCurrentSpeed: Dispatch<SetStateAction<number>>;
  handleBack: () => void;
  handleLoadStart: () => void;
  handleLoadEnd: () => void;
  handleError: (error: any) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleTogglePlay: () => void;
  handleToggleScreen: () => void;
  handleToggleMute: () => void;
  handleTimeUpdate: () => void;
  handleReset: () => void;
  handlePlaybackSpeedUpdate: (speed: number) => void;
  handleVolumeChange: (volume: number) => void;
  handleVideoEnd: () => void;
  handleAddDep: (dep: string) => void;
  handleRemoveDep: (dep: string) => void;
  videoRef: any;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

const usePlayerContext = (): PlayerContextProps => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error(
      "usePlayerContext must be used within a PlayerContextProvider"
    );
  }
  return context;
};

interface PlayerContextProviderProps {
  children: ReactNode;
}

const PlayerContextProvider: FC<PlayerContextProviderProps> = ({
  children,
}) => {
  const [mediaData, setMediaData] = useState({});
  const [videoFile, setVideoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPanelHovering, setIsPanelHovering] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);
  const [isPiP, setIsPiP] = useState(false);
  const [controllersDeps, setControllersDeps] = useState([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      if (!videoRef?.current?.readyState) handleError();
    }, 180000);

    return () => {
      clearTimeout(loadTimeout);
      setIsError(false);
    };
  }, [videoSrc]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (isPiP) videoElement.requestPictureInPicture();
    else document.exitPictureInPicture();

    const enterPiPHandler = () => setIsPiP(true);
    const leavePiPHandler = () => setIsPiP(false);

    videoElement.addEventListener("enterpictureinpicture", enterPiPHandler);
    videoElement.addEventListener("leavepictureinpicture", leavePiPHandler);

    return () => {
      videoElement.removeEventListener(
        "enterpictureinpicture",
        enterPiPHandler
      );
      videoElement.removeEventListener(
        "leavepictureinpicture",
        leavePiPHandler
      );
    };
  }, [isPiP]);

  const handleAddDep = (dep: string) => {
    if (controllersDeps.includes(dep)) return;
    setControllersDeps((prev) => [
      ...prev.filter((prevDep: string) => prevDep !== dep),
      dep,
    ]);
  };
  const handleRemoveDep = (dep: string) => {
    setControllersDeps((prev) => prev.filter((prevDep) => prevDep !== dep));
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleLoadStart = () => {
    console.log("load start");
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    setDuration(videoRef.current.duration);
  };

  const handleVideoEnd = () => {
    if (isLoop) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      videoRef.current.play();
    }
  };

  const handleError = (error?: any) => {
    setIsError(true);
    console.error(error);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef?.current?.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    videoRef?.current?.pause();
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);

    isPlaying ? videoRef?.current?.pause() : videoRef?.current?.play();
  };

  const handlePlaybackSpeedUpdate = (speed: number) => {
    setCurrentSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const handleToggleScreen = () => {
    if (isFullScreen) document.exitFullscreen();
    else document.body.requestFullscreen();
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      videoRef.current.muted = !prev;
      return !prev;
    });
  };
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleVolumeChange = (volume: number) => {
    const newVolume = Math.max(0, Math.min(volume, 100));
    setVolume(newVolume);
    setIsMuted(false);
    videoRef.current.volume = newVolume / 100;
  };
  const handleReset = () => {
    setVideoFile(null);
    setMediaData(null);
    setVideoSrc("");
    setIsLoading(true);
    setIsError(false);
    setIsPlaying(false);
    setIsFullScreen(false);
    setDuration(0);
    setCurrentTime(0);
    setIsPanelHovering(false);
    setIsPiP(false);
    setVolume(Number(localStorage.getItem("volume")) || 100);
    setIsMuted(localStorage.getItem("isMuted") === "true" || false);
    setCurrentSpeed(Number(localStorage.getItem("currentSpeed")) || 1);
    setIsLocked(localStorage.getItem("isLocked") === "true" || false);
    setIsLoop(localStorage.getItem("isLoop") === "true" || false);
    setShortcutsEnabled(
      localStorage.getItem("shortcutsEnabled") === "true" || true
    );
  };

  useEffect(() => {
    localStorage.setItem("volume", String(volume));
    localStorage.setItem("isMuted", String(isMuted));
    localStorage.setItem("currentSpeed", String(currentSpeed));
    localStorage.setItem("isLocked", String(isLocked));
    localStorage.setItem("isLoop", String(isLoop));
    localStorage.setItem("shortcutsEnabled", String(shortcutsEnabled));
  }, [volume, isMuted, currentSpeed, isLocked, isLoop, shortcutsEnabled]);

  const useConditionalHotkeys = (key, callback, once = false) => {
    useHotkeys(
      key,
      () => {
        if (shortcutsEnabled) {
          callback();
        }
      },
      {
        keydown: !once,
        keyup: once,
      }
    );
  };

  // seeking with arrow keys
  useConditionalHotkeys("right", () => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 10,
      videoRef.current.duration
    );
    setCurrentTime((prev) => Math.min(prev + 10, videoRef.current.duration));
  });
  useConditionalHotkeys("left", () => {
    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 10,
      0
    );
    setCurrentTime((prev) => Math.max(prev - 10, 0));
  });

  // seeking with ctrl+arrow keys
  useConditionalHotkeys("ctrl+right", () => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 60,
      videoRef.current.duration
    );
    setCurrentTime((prev) => Math.min(prev + 60, videoRef.current.duration));
  });
  useConditionalHotkeys("ctrl+left", () => {
    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 60,
      0
    );
    setCurrentTime((prev) => Math.max(prev - 60, 0));
  });

  // volume control with arrow keys
  useConditionalHotkeys("up", () => {
    handleVolumeChange(videoRef.current.volume * 100 + 5);
  });
  useConditionalHotkeys("down", () => {
    handleVolumeChange(videoRef.current.volume * 100 - 5);
  });

  // volume control with ctrl+arrow keys
  useConditionalHotkeys("ctrl+up", () => {
    handleVolumeChange(videoRef.current.volume * 100 + 20);
  });
  useConditionalHotkeys("ctrl+down", () => {
    handleVolumeChange(videoRef.current.volume * 100 - 20);
  });

  // play/pause with space bar
  useConditionalHotkeys("space, pause", handleTogglePlay, true);

  // toggle fullscreen with f
  useConditionalHotkeys("f", handleToggleScreen, true);
  useConditionalHotkeys("r", () => {
    setIsLoop((prev) => !prev);
  });
  useConditionalHotkeys(
    "l",
    () => {
      setIsLocked((prev) => !prev);
    },
    true
  );

  // mute/unmute with m
  useConditionalHotkeys("m", handleToggleMute, true);

  // seek to start/end with home/end
  useConditionalHotkeys(
    "end",
    () => {
      videoRef.current.currentTime = videoRef.current.duration;
      setCurrentTime(videoRef.current.duration);
    },
    true
  );
  useConditionalHotkeys(
    "home",
    () => {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    },
    true
  );
  useConditionalHotkeys(
    "ctrl+alt+e",
    () => {
      handleBack();
    },
    true
  );

  const value = {
    videoFile,
    mediaData,
    isLoading,
    isError,
    videoSrc,
    isPlaying,
    isFullScreen,
    volume,
    isMuted,
    duration,
    currentTime,
    isPanelHovering,
    currentSpeed,
    isLocked,
    isLoop,
    shortcutsEnabled,
    isPiP,
    controllersDeps,
    handleAddDep,
    handleRemoveDep,
    setControllersDeps,
    setIsPiP,
    setShortcutsEnabled,
    setIsLoop,
    setIsLocked,
    setVideoFile,
    setMediaData,
    setIsPanelHovering,
    setVideoSrc,
    setIsLoading,
    setIsError,
    setIsPlaying,
    setIsFullScreen,
    setVolume,
    setIsMuted,
    setDuration,
    setCurrentTime,
    handleBack,
    handleLoadStart,
    handleLoadEnd,
    handleError,
    handlePlay,
    handlePause,
    handleTogglePlay,
    handleToggleScreen,
    handleToggleMute,
    handleTimeUpdate,
    handleVolumeChange,
    handlePlaybackSpeedUpdate,
    handleReset,
    handleVideoEnd,
    setCurrentSpeed,
    videoRef,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export { PlayerContext, usePlayerContext, PlayerContextProvider };
