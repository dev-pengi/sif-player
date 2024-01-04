import { useEffect } from "react";
import { useSettingsContext } from "../contexts/SettingsContext";
import { usePlayerContext } from "../contexts/PlayerContext";

const useSetup = () => {
  const {
    setPrimaryColor,
    setLockShortcuts,
    setNormalSkipStep,
    setDoubleSkipStep,
    setVolumeStep,
    setDoubleVolumeStep,
  } = useSettingsContext();

  const { setVolume, setIsLoop } = usePlayerContext();

  useEffect(() => {
    const storedVolume = localStorage.getItem("volume");
    if (storedVolume) {
      setVolume(JSON.parse(storedVolume));
    }
    
    const storedIsLoop = localStorage.getItem("is-loop");
    if (storedIsLoop) {
      setIsLoop(JSON.parse(storedIsLoop));
    }

    const storedPrimaryColor = localStorage.getItem("primary-color");
    if (storedPrimaryColor) {
      setPrimaryColor(storedPrimaryColor);
    }

    const storedAllowLockedShortcuts = localStorage.getItem("lock-shortcuts");
    if (storedAllowLockedShortcuts) {
      setLockShortcuts(JSON.parse(storedAllowLockedShortcuts));
    }

    const storedNormalSkipStep = localStorage.getItem("skip-step");
    if (storedNormalSkipStep) {
      setNormalSkipStep(JSON.parse(storedNormalSkipStep));
    }

    const storedDoubleSkipStep = localStorage.getItem("double-skip-step");
    if (storedDoubleSkipStep) {
      setDoubleSkipStep(JSON.parse(storedDoubleSkipStep));
    }

    const storedVolumeStep = localStorage.getItem("volume-step");
    if (storedVolumeStep) {
      setVolumeStep(JSON.parse(storedVolumeStep));
    }

    const storedDoubleVolumeStep = localStorage.getItem("double-volume-step");
    if (storedDoubleVolumeStep) {
      setDoubleVolumeStep(JSON.parse(storedDoubleVolumeStep));
    }
  }, []);
};

export default useSetup;
