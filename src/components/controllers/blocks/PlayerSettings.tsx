import { FC, useState } from "react";
import Switch from "react-switch";
import { useSettingsContext } from "../../../contexts";
import { Separator, SettingCol } from "./Settings";
import { motion } from "framer-motion";

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
  const { primaryColor } = useSettingsContext();

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
  localValue: string;
}

const ColorSelector: FC<ColorSelectorProps> = ({
  color,
  isSelected,
  onSelect,
  localValue,
}) => {
  const handleSelect = () => {
    onSelect(color);
    localStorage.setItem(localValue, color);
  };
  return (
    <div
      onClick={handleSelect}
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
  const {
    primaryColor,
    setPrimaryColor,
    lockShortcuts,
    setLockShortcuts,
    normalSkipStep,
    setNormalSkipStep,
    doubleSkipStep,
    setDoubleSkipStep,
    volumeStep,
    setVolumeStep,
    doubleVolumeStep,
    setDoubleVolumeStep,
    saveTrack,
    saveAdjustments,
    setSaveTrack,
    setSaveAdjustments,
  } = useSettingsContext();

  const handleSaveTrackToggle = () => {
    setSaveTrack((prev) => !prev);
    localStorage.setItem("save-track", String(!saveTrack));
  };

  const handleSaveAdjustmentsToggle = () => {
    setSaveAdjustments((prev) => !prev);
    localStorage.setItem("save-adjustments", String(!saveAdjustments));
  };

  const COLORS = [
    "#e37171",
    "#e64545",
    "#e32d2d",
    "#db4614",
    "#eb9e34",
    "#dbd800",
    "#50db00",
    "#3461eb",
    "#00afdb",
    "#343deb",
    "#9834eb",
    "#db34eb",
    "#ff00fb",
    "#7c00db",
    "#855b81",
    "#855b5b",
    "#6d5b85",
    "#486770",
    "#3d3d3d",
    "#2e2e2e",
  ];

  const handleLockShortcutsToggle = () => {
    setLockShortcuts((prev) => !prev);
    localStorage.setItem("lock-shortcuts", String(!lockShortcuts));
  };

  return (
    <>
      <SettingCol
        title="Primary color"
        description="The color used for the main buttons, selections, track progress and switches"
        className="flex-col !items-start !justify-start"
      >
        <div className="mt-3 flex gap-3 flex-wrap">
          {COLORS.map((color) => {
            return (
              <ColorSelector
                localValue="primary-color"
                onSelect={setPrimaryColor}
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
          onChange={setNormalSkipStep}
        />
      </SettingCol>
      <SettingCol
        title="Double Forward/Backward"
        description="The amount of seconds to skip forward/backward (double)"
      >
        <SettingInput
          localValue="double-skip-step"
          defaultValue={doubleSkipStep}
          onChange={setDoubleSkipStep}
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
          onChange={setVolumeStep}
        />
      </SettingCol>
      <SettingCol
        title="Double Increase/Decrease"
        description="The amount of volume to increase/decrease (double)"
      >
        <SettingInput
          localValue="double-volume-step"
          defaultValue={doubleVolumeStep}
          onChange={setDoubleVolumeStep}
        />
      </SettingCol>
    </>
  );
};

export default SettingsBlock;