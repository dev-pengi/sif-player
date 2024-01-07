import { useEffect } from "react";
import { useSettingsContext, useVolumeContext } from "../contexts";
import { colors } from "../constants";

const useSetup = () => {
  const {
    setPrimaryColor,
    setLockShortcuts,
    setNormalSkipStep,
    setDoubleSkipStep,
    setVolumeStep,
    setDoubleVolumeStep,
    setIsLoop,
    setSaveTrack,
    setSaveAdjustments,
    setShortcutsEnabled,
    setPlayInBackground,
    setPlayToggleClick
  } = useSettingsContext();
  const { setVolume } = useVolumeContext();

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
      if (!colors.includes(storedPrimaryColor))
        return localStorage.removeItem("primary-color");
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

    const storedSaveTrack = localStorage.getItem("save-track");
    if (storedSaveTrack) {
      setSaveTrack(JSON.parse(storedSaveTrack));
    }

    const storedSaveAdjustments = localStorage.getItem("save-adjustments");
    if (storedSaveAdjustments) {
      setSaveAdjustments(JSON.parse(storedSaveAdjustments));
    }

    const storedShortcutsEnabled = localStorage.getItem("shortcuts-enabled");
    if (storedShortcutsEnabled) {
      setShortcutsEnabled(JSON.parse(storedShortcutsEnabled));
    }

    const storedPlayInBackground = localStorage.getItem("play-in-background");
    if (storedPlayInBackground) {
      setPlayInBackground(JSON.parse(storedPlayInBackground));
    }

    const storedPlayToggleClick = localStorage.getItem("play-toggle-click");
    if (storedPlayToggleClick) {
      setPlayToggleClick(JSON.parse(storedPlayToggleClick));
    }
  }, []);
};

export default useSetup;
