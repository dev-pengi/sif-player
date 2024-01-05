import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

interface ControlsContextProps {
  isFullScreen: boolean;
  isPanelHovering: boolean;
  isLocked: boolean;
  controllersDeps: string[];
  setControllersDeps: Dispatch<SetStateAction<string[]>>;
  setIsLocked: Dispatch<SetStateAction<boolean>>;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setIsPanelHovering: Dispatch<SetStateAction<boolean>>;
}

const ControlsContext = createContext<ControlsContextProps | undefined>(
  undefined
);

const useControlsContext = (): ControlsContextProps => {
  const context = useContext(ControlsContext);
  if (!context) {
    throw new Error(
      "useControlsContext must be used within a ControlsContextProvider"
    );
  }
  return context;
};

interface ControlsContextProviderProps {
  children: ReactNode;
}

const ControlsContextProvider: FC<ControlsContextProviderProps> = ({
  children,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPanelHovering, setIsPanelHovering] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [controllersDeps, setControllersDeps] = useState(["active"]);

  const value = {
    isFullScreen,
    isPanelHovering,
    isLocked,
    controllersDeps,
    setControllersDeps,
    setIsLocked,
    setIsPanelHovering,
    setIsFullScreen,
  };

  return (
    <ControlsContext.Provider value={value}>
      {children}
    </ControlsContext.Provider>
  );
};

export { ControlsContext, useControlsContext, ControlsContextProvider };
