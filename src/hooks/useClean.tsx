import { useEffect } from "react";
import { useControlsContext } from "../contexts";
import { useDispatch } from "react-redux";
import { playerActions, timerActions } from "../store";

const useClean = () => {
  const dispatch = useDispatch();

  const { setIsFullScreen } = useControlsContext();

  useEffect(() => {
    dispatch(timerActions.resetTimer());
    setIsFullScreen(false);
    dispatch(playerActions.resetPlayer());
  }, []);
};

export default useClean;
