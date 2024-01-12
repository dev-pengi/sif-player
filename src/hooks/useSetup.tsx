import { useEffect } from "react";
import { colors } from "../constants";
import { useDispatch } from "react-redux";
import { volumeActions, settingsActions } from "../store";

const useSetup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedVolume = localStorage.getItem("volume");
    if (storedVolume) {
      dispatch(volumeActions.update(JSON.parse(storedVolume)));
    }

    const storedIsLoop = localStorage.getItem("is-loop");
    if (storedIsLoop) {
      storedIsLoop === "true"
        ? dispatch(settingsActions.enableLoop())
        : dispatch(settingsActions.disableLoop());
    }

    const storedPrimaryColor = localStorage.getItem("primary-color");
    if (storedPrimaryColor) {
      if (!colors.includes(storedPrimaryColor))
        return localStorage.removeItem("primary-color");
      dispatch(settingsActions.updateColor(storedPrimaryColor));
    }

    const storedAllowLockedShortcuts = localStorage.getItem("lock-shortcuts");
    if (storedAllowLockedShortcuts) {
      storedAllowLockedShortcuts === "true"
        ? dispatch(settingsActions.lockShortcuts())
        : dispatch(settingsActions.unlockShortcuts());
    }

    const storedNormalSkipStep = localStorage.getItem("skip-step");
    if (storedNormalSkipStep) {
      dispatch(
        settingsActions.updateNormalSkipStep(JSON.parse(storedNormalSkipStep))
      );
    }

    const storedDoubleSkipStep = localStorage.getItem("double-skip-step");
    if (storedDoubleSkipStep) {
      dispatch(
        settingsActions.updateDoubleSkipStep(JSON.parse(storedDoubleSkipStep))
      );
    }

    const storedVolumeStep = localStorage.getItem("volume-step");
    if (storedVolumeStep) {
      dispatch(settingsActions.updateVolumeStep(JSON.parse(storedVolumeStep)));
    }

    const storedDoubleVolumeStep = localStorage.getItem("double-volume-step");
    if (storedDoubleVolumeStep) {
      dispatch(
        settingsActions.updateDoubleVolumeStep(
          JSON.parse(storedDoubleVolumeStep)
        )
      );
    }

    const storedSaveTrack = localStorage.getItem("save-track");
    if (storedSaveTrack) {
      storedSaveTrack === "true"
        ? dispatch(settingsActions.enableSaveTrack())
        : dispatch(settingsActions.disableSaveTrack());
    }

    const storedSaveAdjustments = localStorage.getItem("save-adjustments");
    if (storedSaveAdjustments) {
      storedSaveAdjustments === "true"
        ? dispatch(settingsActions.enableSaveAdjustments())
        : dispatch(settingsActions.disableSaveAdjustments());
    }

    const storedShortcutsEnabled = localStorage.getItem("shortcuts-enabled");
    if (storedShortcutsEnabled) {
      storedShortcutsEnabled === "true"
        ? dispatch(settingsActions.enableShortcuts())
        : dispatch(settingsActions.disableShortcuts());
    }

    const storedPlayInBackground = localStorage.getItem("play-in-background");
    if (storedPlayInBackground) {
      storedPlayInBackground === "true"
        ? dispatch(settingsActions.enablePlayInBackground())
        : dispatch(settingsActions.disablePlayInBackground());
    }

    const storedPlayToggleClick = localStorage.getItem("play-toggle-click");
    if (storedPlayToggleClick) {
      storedPlayToggleClick === "true"
        ? dispatch(settingsActions.enablePlayToggleClick())
        : dispatch(settingsActions.disablePlayToggleClick());
    }
  }, []);
};

export default useSetup;
