import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

interface VolumeContextProps {
  volume: number;
  isMuted: boolean;
  setVolume: Dispatch<SetStateAction<number>>;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
}

const VolumeContext = createContext<VolumeContextProps | undefined>(undefined);

const useVolumeContext = (): VolumeContextProps => {
  const context = useContext(VolumeContext);
  if (!context) {
    throw new Error(
      "useVolumeContext must be used within a VolumeContextProvider"
    );
  }
  return context;
};

interface VolumeContextProviderProps {
  children: ReactNode;
}

const VolumeContextProvider: FC<VolumeContextProviderProps> = ({
  children,
}) => {
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  const value = {
    volume,
    isMuted,
    setVolume,
    setIsMuted,
  };

  return (
    <VolumeContext.Provider value={value}>{children}</VolumeContext.Provider>
  );
};

export { VolumeContext, useVolumeContext, VolumeContextProvider };