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
  setPrimaryColor: Dispatch<SetStateAction<string>>;
  lockShortcuts: boolean;
  setLockShortcuts: Dispatch<SetStateAction<boolean>>;
  normalSkipStep: number;
  setNormalSkipStep: Dispatch<SetStateAction<number>>;
  doubleSkipStep: number;
  setDoubleSkipStep: Dispatch<SetStateAction<number>>;
  volumeStep: number;
  setVolumeStep: Dispatch<SetStateAction<number>>;
  doubleVolumeStep: number;
  setDoubleVolumeStep: Dispatch<SetStateAction<number>>;
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

  const value = {
    primaryColor,
    setPrimaryColor,
    lockShortcuts,
    setLockShortcuts,

    normalSkipStep,
    setNormalSkipStep,
    doubleSkipStep,
    setDoubleSkipStep,
    volumeStep,
    setVolumeStep,
    doubleVolumeStep,
    setDoubleVolumeStep,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, useSettingsContext, SettingsContextProvider };
