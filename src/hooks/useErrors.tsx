import { useEffect } from "react";
import { usePlayerContext } from "../contexts/PlayerContext";

const useErrors = () => {
  const { videoSrc, setIsError, videoRef } = usePlayerContext();

  const handleError = (error?: any) => {
    setIsError(true);
    console.error(error);
  };

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      if (!videoRef?.current?.readyState) handleError();
    }, 180000);

    return () => {
      clearTimeout(loadTimeout);
      setIsError(false);
    };
  }, [videoSrc]);
  return { handleError };
};

export default useErrors;
