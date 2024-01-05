import { useEffect } from "react";
import { usePlayerContext } from "../contexts";

const useErrors = () => {
  const { videoRef, videoSrc, setIsError } = usePlayerContext();
  const handleError = () => setIsError(true);
  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      if (!videoRef?.current?.readyState) handleError();
    }, 180000);

    return () => {
      clearTimeout(loadTimeout);
      setIsError(false);
    };
  }, [videoSrc]);

  useEffect(() => {
    const validTimeout = setTimeout(() => {
      if (!videoSrc) handleError();
    }, 3000);
    return () => clearTimeout(validTimeout);
  }, [videoSrc]);
};

export default useErrors;
