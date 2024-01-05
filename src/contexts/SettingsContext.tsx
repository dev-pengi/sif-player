import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

interface SettingsContextProps {
  primaryColor: string;
  lockShortcuts: boolean;
  normalSkipStep: number;
  doubleSkipStep: number;
  volumeStep: number;
  doubleVolumeStep: number;
  isLoop: boolean;
  shortcutsEnabled: boolean;
  setPrimaryColor: Dispatch<SetStateAction<string>>;
  setLockShortcuts: Dispatch<SetStateAction<boolean>>;
  setNormalSkipStep: Dispatch<SetStateAction<number>>;
  setDoubleSkipStep: Dispatch<SetStateAction<number>>;
  setVolumeStep: Dispatch<SetStateAction<number>>;
  setDoubleVolumeStep: Dispatch<SetStateAction<number>>;
  setIsLoop: Dispatch<SetStateAction<boolean>>;
  setShortcutsEnabled: Dispatch<SetStateAction<boolean>>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

const useSettingsContext = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider"
    );
  }
  return context;
};

interface SettingsContextProviderProps {
  children: ReactNode;
}

const SettingsContextProvider: FC<SettingsContextProviderProps> = ({
  children,
}) => {
  const [primaryColor, setPrimaryColor] = useState("#ff00fb");
  const [lockShortcuts, setLockShortcuts] = useState(true);
  const [normalSkipStep, setNormalSkipStep] = useState(10);
  const [doubleSkipStep, setDoubleSkipStep] = useState(60);
  const [volumeStep, setVolumeStep] = useState(5);
  const [doubleVolumeStep, setDoubleVolumeStep] = useState(20);
  const [isLoop, setIsLoop] = useState(false);
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);

  const value = {
    primaryColor,
    lockShortcuts,
    normalSkipStep,
    doubleSkipStep,
    volumeStep,
    doubleVolumeStep,
    isLoop,
    shortcutsEnabled,
    setPrimaryColor,
    setLockShortcuts,
    setNormalSkipStep,
    setDoubleSkipStep,
    setVolumeStep,
    setDoubleVolumeStep,
    setIsLoop,
    setShortcutsEnabled,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, useSettingsContext, SettingsContextProvider };
