import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useRef,
  RefObject,
} from "react";

interface PlayerContextProps {
  videoRef: RefObject<HTMLVideoElement>;
  videoFile: any;
  isError: boolean;
  videoSrc: string;
  isPlaying: boolean;
  mediaData: any;
  currentSpeed: number;
  isPiP: boolean;
  setVideoFile: Dispatch<SetStateAction<any>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setVideoSrc: Dispatch<SetStateAction<string>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setMediaData: Dispatch<SetStateAction<any>>;
  setCurrentSpeed: Dispatch<SetStateAction<number>>;
  setIsPiP: Dispatch<SetStateAction<boolean>>;
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
  const [isError, setIsError] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [isPiP, setIsPiP] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const value = {
    videoRef,

    videoFile,
    isError,
    videoSrc,
    isPlaying,
    mediaData,
    currentSpeed,
    isPiP,
    setVideoFile,
    setIsError,
    setVideoSrc,
    setIsPlaying,
    setMediaData,
    setCurrentSpeed,
    setIsPiP,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export { PlayerContext, usePlayerContext, PlayerContextProvider };
