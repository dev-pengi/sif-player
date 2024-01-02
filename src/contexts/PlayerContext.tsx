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
  setVideoFile: Dispatch<SetStateAction<any>>;
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
  handlePlaybackSpeedUpdate: (speed: number) => void;
  handleVolumeChange: (volume: number) => void;
  setCurrentSpeed: Dispatch<SetStateAction<number>>;
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

  const videoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      if (!videoRef?.current?.readyState) handleError();
    }, 30000);

    return () => {
      clearTimeout(loadTimeout);
      setIsError(false);
    };
  }, [videoSrc]);

  const handleBack = () => {
    navigate("/");
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = (error?: any) => {
    setIsError(true);
    console.error(error);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlaybackSpeedUpdate = (speed: number) => {
    setCurrentSpeed(speed);
    videoRef.current.playbackRate = speed;
  };

  const handleTogglePlay = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying((prev) => !prev);
  };

  const handleToggleScreen = () => {
    if (isFullScreen) document.exitFullscreen();
    else document.body.requestFullscreen();

    setIsFullScreen((prev) => !prev);
  };
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

  // seeking with arrow keys
  useHotkeys("right", () => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 10,
      videoRef.current.duration
    );
    setCurrentTime((prev) => Math.min(prev + 10, videoRef.current.duration));
  });
  useHotkeys("left", () => {
    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 10,
      0
    );
    setCurrentTime((prev) => Math.max(prev - 10, 0));
  });

  // seeking with ctrl+arrow keys
  useHotkeys("ctrl+right", () => {
    videoRef.current.currentTime = Math.min(
      videoRef.current.currentTime + 60,
      videoRef.current.duration
    );
    setCurrentTime((prev) => Math.min(prev + 60, videoRef.current.duration));
  });
  useHotkeys("ctrl+left", () => {
    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 60,
      0
    );
    setCurrentTime((prev) => Math.max(prev - 60, 0));
  });

  // volume control with arrow keys
  useHotkeys("up", () => {
    handleVolumeChange(videoRef.current.volume * 100 + 5);
  });
  useHotkeys("down", () => {
    handleVolumeChange(videoRef.current.volume * 100 - 5);
  });

  // volume control with ctrl+arrow keys
  useHotkeys("ctrl+up", () => {
    handleVolumeChange(videoRef.current.volume * 100 + 20);
  });
  useHotkeys("ctrl+down", () => {
    handleVolumeChange(videoRef.current.volume * 100 - 20);
  });

  // play/pause with space bar
  useHotkeys("space, pause", handleTogglePlay);

  // toggle fullscreen with f
  useHotkeys("f", handleToggleScreen);

  // mute/unmute with m
  useHotkeys("m", handleToggleMute);

  // seek to start/end with home/end
  useHotkeys("end", () => {
    videoRef.current.currentTime = videoRef.current.duration;
    setCurrentTime(videoRef.current.duration);
  });
  useHotkeys("home", () => {
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
  });

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
    setCurrentSpeed,
    videoRef,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export { PlayerContext, usePlayerContext, PlayerContextProvider };
