import { useHotkeys } from "react-hotkeys-hook";
import { useControlsContext, useSettingsContext } from "../contexts";
import { usePlayer, useTimer, useVolume } from ".";
import { useAppSelector } from "./useAppSelector";

const useShortcuts = () => {
  const { duration } = useAppSelector(state => state.timerReducer);
  const {
    normalSkipStep,
    doubleSkipStep,
    volumeStep,
    doubleVolumeStep,
    lockShortcuts,
    shortcutsEnabled,
    setIsLoop,
  } = useSettingsContext();
  const { setIsLocked, isLocked } = useControlsContext();

  const { handleTogglePlay, handleToggleScreen, handleBack } = usePlayer();
  const { handleToggleMute, handleIncreaseVolume, handleDecreaseVolume } =
    useVolume();
  const { handleSkipForward, handleSkipBackward, handleSeek } = useTimer();

  const useConditionalHotkeys = (
    key: string,
    callback: () => void,
    once = false
  ) => {
    useHotkeys(
      key,
      () => {
        if (!shortcutsEnabled || (isLocked && lockShortcuts)) return;
        callback();
      },
      {
        keydown: !once,
        keyup: once,
      }
    );
  };

  // seeking with arrow keys
  useConditionalHotkeys("right", () => {
    handleSkipForward(normalSkipStep);
  });
  useConditionalHotkeys("left", () => {
    handleSkipBackward(normalSkipStep);
  });

  // seeking with ctrl+arrow keys
  useConditionalHotkeys("ctrl+right", () => {
    handleSkipForward(doubleSkipStep);
  });
  useConditionalHotkeys("ctrl+left", () => {
    handleSkipBackward(doubleSkipStep);
  });

  // volume control with arrow keys
  useConditionalHotkeys("up", () => {
    handleIncreaseVolume(volumeStep);
  });
  useConditionalHotkeys("down", () => {
    handleDecreaseVolume(volumeStep);
  });

  // volume control with ctrl+arrow keys
  useConditionalHotkeys("ctrl+up", () => {
    handleIncreaseVolume(doubleVolumeStep);
  });
  useConditionalHotkeys("ctrl+down", () => {
    handleDecreaseVolume(doubleVolumeStep);
  });

  // play/pause with space bar
  useConditionalHotkeys("space, pause,enter", handleTogglePlay, true);

  // toggle fullscreen with f
  useConditionalHotkeys("f", handleToggleScreen, true);
  useConditionalHotkeys("r", () => {
    setIsLoop((prev) => !prev);
  });
  useConditionalHotkeys(
    "l",
    () => {
      setIsLocked((prev) => !prev);
    },
    true
  );

  // mute/unmute with m
  useConditionalHotkeys("m", handleToggleMute, true);

  // seek to start/end with home/end
  useConditionalHotkeys(
    "end",
    () => {
      handleSeek(duration);
    },
    true
  );
  useConditionalHotkeys(
    "home",
    () => {
      handleSeek(0);
    },
    true
  );
  useConditionalHotkeys(
    "ctrl+alt+e",
    () => {
      handleBack();
    },
    true
  );
};

export default useShortcuts;
