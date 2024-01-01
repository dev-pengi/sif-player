import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useRef,
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
  duration: number;
  currentTime: number;
  isPanelHovering: boolean;
  setVideoSrc: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
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
  handleTimeUpdate: () => void;
  handleVolumeChange: (volume: number) => void;
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
  const [videoFile, setVideoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPanelHovering, setIsPanelHovering] = useState(false);

  const videoRef = useRef(null);

  const navigate = useNavigate();
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

  const handleToggleScreen = () => {
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
    handleToggleScreen();
  });
  useHotkeys("m", () => {
    videoRef.current.muted = !videoRef.current.muted;
  });

  const value = {
    videoFile,
    setVideoFile,
    isLoading,
    isError,
    videoSrc,
    isPlaying,
    isFullScreen,
    volume,
    duration,
    currentTime,
    isPanelHovering,
    setIsPanelHovering,
    setVideoSrc,
    setIsLoading,
    setIsError,
    setIsPlaying,
    setIsFullScreen,
    setVolume,
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
    handleTimeUpdate,
    handleVolumeChange,
    videoRef,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export { PlayerContext, usePlayerContext, PlayerContextProvider };
