import { useEffect } from "react";
import { useControlsContext } from "../contexts";
import { useDispatch } from "react-redux";
import { playerActions, timerActions, volumeActions } from "../store";

const useClean = () => {
  const dispatch = useDispatch();

  const { setIsFullScreen } = useControlsContext();

  useEffect(() => {
    dispatch(timerActions.reset());
    dispatch(volumeActions.reset());
    dispatch(playerActions.reset());
    setIsFullScreen(false);
  }, []);
};

export default useClean;
