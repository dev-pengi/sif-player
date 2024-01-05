import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

interface LoaderContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

const useLoaderContext = (): LoaderContextProps => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error(
      "useLoaderContext must be used within a LoaderContextProvider"
    );
  }
  return context;
};

interface LoaderContextProviderProps {
  children: ReactNode;
}

const LoaderContextProvider: FC<LoaderContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const value = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};

export { LoaderContext, useLoaderContext, LoaderContextProvider };