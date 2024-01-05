import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

interface TimerContextProps {
  duration: number;
  currentTime: number;
  setDuration: Dispatch<SetStateAction<number>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

const useTimerContext = (): TimerContextProps => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error(
      "useTimerContext must be used within a TimerContextProvider"
    );
  }
  return context;
};

interface TimerContextProviderProps {
  children: ReactNode;
}

const TimerContextProvider: FC<TimerContextProviderProps> = ({ children }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const value = {
    duration,
    currentTime,
    setDuration,
    setCurrentTime,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

export { TimerContext, useTimerContext, TimerContextProvider };