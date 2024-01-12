import { FC, useState } from "react";
import Switch from "react-switch";
import { motion } from "framer-motion";
import { Separator, SettingCol } from "./Settings";
import { colors } from "../../../constants";
import { useAppSelector } from "../../../hooks";
import { useDispatch } from "react-redux";
import { settingsActions } from "../../../store";

interface SettingInputProps {
  defaultValue: string | number;
  onChange: (value: any) => void;
  localValue: string;
  type?: "number" | "text";
}

const SettingInput: FC<SettingInputProps> = ({
  defaultValue,
  onChange,
  localValue,
  type = "number",
}) => {
  const [isError, setIsError] = useState(false);
  const { primaryColor } = useAppSelector((state) => state.settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const value = Number(e.target.value);
      if (!isNaN(value) && value > 0) {
        setIsError(false);
        onChange(value);
        localStorage.setItem(localValue, String(value));
      } else {
        setIsError(true);
      }
    } else {
      const value = e.target.value;
      if (!value?.trim()?.length) {
        onChange(value);
        localStorage.setItem(localValue, String(value));
      }
    }
  };

  return (
    <motion.input
      type="text"
      className={`w-[60px] rounded-[2px] px-2 bg-transparent border-[1px] border-solid duration-100 ${
        isError
          ? "text-red-600 border-red-600"
          : "bg-neutral-800 border-neutral-700"
      }`}
      whileHover={{
        borderColor: isError ? "" : primaryColor,
      }}
      whileFocus={{
        borderColor: isError ? "" : primaryColor,
      }}
      transition={{
        duration: 0.1,
      }}
      defaultValue={defaultValue}
      placeholder={String(defaultValue)}
      onChange={handleChange}
    />
  );
};

interface ColorSelectorProps {
  color: string;
  isSelected: boolean;
  onSelect: (color: string) => void;
}

const ColorSelector: FC<ColorSelectorProps> = ({
  color,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(color)}
      style={{
        backgroundColor: color,
      }}
      className={`w-[24px] h-[24px] cursor-pointer duration-100 rounded-full ${
        isSelected ? "scale-[1.3]" : "hover:scale-[1.15]"
      }`}
    />
  );
};

const SettingsBlock: FC = () => {
  const dispatch = useDispatch();
  const {
    primaryColor,
    lockShortcuts,
    normalSkipStep,
    doubleSkipStep,
    volumeStep,
    doubleVolumeStep,
    saveTrack,
    saveAdjustments,
    playInBackground,
    playToggleClick,
  } = useAppSelector((state) => state.settings);

  const handleSaveTrackToggle = () => {
    localStorage.setItem("save-track", String(!saveTrack));
    dispatch(settingsActions.toggleSaveTrack());
  };

  const handleSaveAdjustmentsToggle = () => {
    localStorage.setItem("save-adjustments", String(!saveAdjustments));
    dispatch(settingsActions.toggleSaveAdjustments());
  };

  const handleLockShortcutsToggle = () => {
    localStorage.setItem("lock-shortcuts", String(!lockShortcuts));
    dispatch(settingsActions.toggleLockShortcuts());
  };

  const handleTogglePlayInBackground = () => {
    localStorage.setItem("play-in-background", String(!playInBackground));
    dispatch(settingsActions.togglePlayInBackground());
  };

  const handleTogglePlayToggleClick = () => {
    localStorage.setItem("play-toggle-click", String(!playToggleClick));
    dispatch(settingsActions.togglePlayToggleClick());
  };

  const handleColorSelect = (color: string) => {
    localStorage.setItem("primary-color", color);
    dispatch(settingsActions.updateColor(color));
  };

  return (
    <>
      <SettingCol
        title="Primary color"
        description="The color used for the main buttons, selections, track progress and switches"
        className="flex-col !items-start !justify-start"
      >
        <div className="mt-3 flex gap-3 flex-wrap">
          {colors.map((color) => {
            return (
              <ColorSelector
                onSelect={handleColorSelect}
                isSelected={primaryColor === color}
                key={color}
                color={color}
              />
            );
          })}
        </div>
      </SettingCol>
      <Separator />
      <SettingCol
        title="Save track"
        description="save the current track by filename when the player is closed"
      >
        <Switch
          onChange={handleSaveTrackToggle}
          checked={saveTrack}
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
        title="Save Adjustments"
        description="save the current adjustments (volume, playback rate, etc) when the player is closed"
      >
        <Switch
          onChange={handleSaveAdjustmentsToggle}
          checked={saveAdjustments}
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
        title="Play In Background"
        description="keep playing the media when you leave the tab or the browser"
      >
        <Switch
          onChange={handleTogglePlayInBackground}
          checked={playInBackground}
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
      <Separator />
      <SettingCol
        title="Forward/Backward"
        description="the amount of seconds to skip forward/backward"
      >
        <SettingInput
          localValue="skip-step"
          defaultValue={normalSkipStep}
          onChange={(value) =>
            dispatch(settingsActions.updateNormalSkipStep(value))
          }
        />
      </SettingCol>
      <SettingCol
        title="Double Forward/Backward"
        description="The amount of seconds to skip forward/backward (double)"
      >
        <SettingInput
          localValue="double-skip-step"
          defaultValue={doubleSkipStep}
          onChange={(value) =>
            dispatch(settingsActions.updateDoubleSkipStep(value))
          }
        />
      </SettingCol>
      <Separator />
      <SettingCol
        title="Increase/Decrease"
        description="The amount of volume to increase/decrease"
      >
        <SettingInput
          localValue="volume-step"
          defaultValue={volumeStep}
          onChange={(value) =>
            dispatch(settingsActions.updateVolumeStep(value))
          }
        />
      </SettingCol>
      <SettingCol
        title="Double Increase/Decrease"
        description="The amount of volume to increase/decrease (double)"
      >
        <SettingInput
          localValue="double-volume-step"
          defaultValue={doubleVolumeStep}
          onChange={(value) =>
            dispatch(settingsActions.updateDoubleVolumeStep(value))
          }
        />
      </SettingCol>
    </>
  );
};

export default SettingsBlock;
