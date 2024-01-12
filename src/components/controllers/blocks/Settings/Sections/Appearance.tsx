import { FC } from "react";
import { SettingCol, ColorSelector, Separator } from "..";
import { colors } from "../../../../../constants";
import { useAppSelector } from "../../../../../hooks";
import { useDispatch } from "react-redux";
import { settingsActions } from "../../../../../store";
import Switch from "react-switch";

const Appearance: FC = () => {
  const dispatch = useDispatch();
  const { primaryColor, showHoverThumbnail } = useAppSelector(
    (state) => state.settings
  );

  const handleColorSelect = (color: string) => {
    dispatch(settingsActions.updateColor(color));
  };
  const handleToggleHoverThumbnail = () => {
    dispatch(settingsActions.toggleHoverThumbnail());
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
        title="Show hover thumbnail"
        description="Show a thumbnail when hovering the progress bar"
      >
        <Switch
          onChange={handleToggleHoverThumbnail}
          checked={showHoverThumbnail}
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
  );
};

export default Appearance;
