import { FC } from "react";
import { useAppSelector } from "../../../../../hooks";
import Switch from "react-switch";
import Select from "react-select";
import { Separator, SettingCol } from "..";
import { settingsActions } from "../../../../../store";
import { useDispatch } from "react-redux";
import Slider from "rc-slider";

const Advanced: FC = () => {
  const dispatch = useDispatch();
  const {
    primaryColor,
    allowAnimations,
    borderShadows,
    darkLayer,
    darkLayerOpacity,
    sleepMode,
    sleepModeDelay,
    sleepModeBehavior,
    askForBreak,
    breakDelay,
    breakDuration,
  } = useAppSelector((state) => state.settings);

  const handleToggleAllowAnimations = () => {
    dispatch(settingsActions.toggleAnimations());
  };
  const handleToggleBorderShadows = () => {
    dispatch(settingsActions.toggleBorderShadows());
  };
  const toggleDarkLayer = () => {
    dispatch(settingsActions.toggleDarkLayer());
  };
  const handleDarkLayerOpacityChange = (value: number) => {
    dispatch(settingsActions.updateDarkLayerOpacity(value));
  };
  const handleToggleSleepMode = () => {
    dispatch(settingsActions.toggleSleepMode());
  };

  return (
    <>
      <SettingCol
        title="Use animations"
        description="Enabling this setting animates controls, buttons, and modals, providing a more interactive experience. It's recommended to keep this enabled for a better user experience, unless you're experiencing performance issues"
      >
        <Switch
          onChange={handleToggleAllowAnimations}
          checked={allowAnimations}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={primaryColor}
          height={23}
          width={46}
          handleDiameter={18}
          className="react-switch"
        />
      </SettingCol>
      <Separator />
      <SettingCol
        title="Use border shadows"
        description="sets shadows on the top and bottom of the video player, in order to make the controls clear and visible on any background"
      >
        <Switch
          onChange={handleToggleBorderShadows}
          checked={borderShadows}
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
        title="Use dark layer"
        description="sets a dark opacity layer on the video player, recommended for users who are sensitive to bright colors and effects"
      >
        <Switch
          onChange={toggleDarkLayer}
          checked={darkLayer}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={primaryColor}
          height={23}
          width={46}
          handleDiameter={18}
          className="react-switch"
        />
      </SettingCol>
      {darkLayer && (
        <SettingCol
          title="Dark layer opacity"
          description="set the opacity of the dark layer, in range of 25% to 90%"
        >
          <div className="flex items-center">
            <p className="opacity-70 mR-1">{darkLayerOpacity}%</p>
            <Slider
              step={1}
              value={darkLayerOpacity}
              min={25}
              max={90}
              onChange={handleDarkLayerOpacityChange}
              keyboard={false}
              style={{ width: 60, marginLeft: 15, marginRight: 10 }}
              styles={{
                handle: {
                  border: "none",
                  boxShadow: "none",
                  cursor: "pointer",
                  opacity: 1,
                },
                track: {
                  backgroundColor: "#fff",
                },
                rail: {
                  backgroundColor: "#555",
                },
              }}
            />
          </div>
        </SettingCol>
      )}
      <Separator />
      <SettingCol
        title="Sleep mode"
        description="automatically stop the playback after a certain amount of time of inactivity"
      >
        <Switch
          onChange={handleToggleSleepMode}
          checked={sleepMode}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={primaryColor}
          height={23}
          width={46}
          handleDiameter={18}
          className="react-switch"
        />
      </SettingCol>
      {sleepMode && <></>}
    </>
  );
};

export default Advanced;
