import { FC } from "react";
import { Separator, SettingCol } from "..";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../hooks";
import { settingsActions } from "../../../../../store";
import Switch from "react-switch";

const Accessability: FC = () => {
  const dispatch = useDispatch();
  const {
    primaryColor,
    lockShortcuts,
    fullScreenOnDoubleClick,
    lockGestures,
    playToggleClick,
  } = useAppSelector((state) => state.settings);

  const handleLockGesturesToggle = () => {
    dispatch(settingsActions.toggleGestures());
  };

  const handleLockShortcutsToggle = () => {
    dispatch(settingsActions.toggleLockShortcuts());
  };

  const handleTogglePlayToggleClick = () => {
    dispatch(settingsActions.togglePlayToggleClick());
  };

  const handleToggleFullScreenOnDoubleClick = () => {
    dispatch(settingsActions.toggleFullScreenOnDoubleClick());
  };
  return (
    <>
      <SettingCol
        title="Lock Shortcuts"
        description="disable shortcuts when the player is on lock mode"
      >
        <Switch
          onChange={handleLockShortcutsToggle}
          checked={lockShortcuts}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={primaryColor}
          height={23}
          width={46}
          handleDiameter={18}
          className="react-switch"
        />
      </SettingCol>
      <SettingCol
        title="Lock Gestures"
        description="disable gestures when the player is on lock mode (click, double click, etc)"
      >
        <Switch
          onChange={handleLockGesturesToggle}
          checked={lockGestures}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={primaryColor}
          height={23}
          width={46}
          handleDiameter={18}
          className="react-switch"
        />
      </SettingCol>
      {!lockGestures && (
        <>
          <Separator />
          <SettingCol
            title="Click To Play/Pause"
            description="click anywhere on the screen to toggle the video play/pause"
          >
            <Switch
              onChange={handleTogglePlayToggleClick}
              checked={playToggleClick}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor={primaryColor}
              height={23}
              width={46}
              handleDiameter={18}
              className="react-switch"
            />
          </SettingCol>
          <SettingCol
            title="Full screen on double click"
            description="toggle full screen mode when double clicking on the screen"
          >
            <Switch
              onChange={handleToggleFullScreenOnDoubleClick}
              checked={fullScreenOnDoubleClick}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor={primaryColor}
              height={23}
              width={46}
              handleDiameter={18}
              className="react-switch"
            />
          </SettingCol>
        </>
      )}
    </>
  );
};

export default Accessability;
