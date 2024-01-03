import { FC } from "react";
import Button from "./Button";
import { MenuIcon } from "../../../assets";
import { DropdownMenu } from "@radix-ui/themes";
import Switch from "react-switch";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const MenuButton: FC = () => {
  const {
    isLoop,
    setIsLoop,
    shortcutsEnabled,
    setShortcutsEnabled,
    isPiP,
    setIsPiP,
  } = usePlayerContext();
  const handleLoopToggle = () => {
    setIsLoop((prev) => !prev);
  };
  const handleShortcutsToggle = () => {
    setShortcutsEnabled((prev) => !prev);
  };
  const handlePiPChange = () => {
    setIsPiP((prev) => !prev);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div>
          <Button>
            <div className="absolute text-[24px] left-0 right-0 top-0 bottom-0 h-max w-max m-auto">
              <MenuIcon />
            </div>
          </Button>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        style={{
          minWidth: 250,
        }}
      >
        <DropdownMenu.Item
          onSelect={(event) => {
            event.preventDefault();
            handleLoopToggle();
          }}
        >
          <p>Loop Video</p>
          <Switch
            onChange={handleLoopToggle}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#ff00fb"
            height={23}
            width={46}
            handleDiameter={18}
            checked={isLoop}
            className="pointer-events-none react-switch"
          />
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={(event) => {
            event.preventDefault();
            handleShortcutsToggle();
          }}
        >
          <p>Enable Shortcuts</p>
          <Switch
            onChange={handleShortcutsToggle}
            checked={shortcutsEnabled}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#ff00fb"
            height={23}
            width={46}
            handleDiameter={18}
            className="pointer-events-none react-switch"
          />
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={(event) => {
            event.preventDefault();
            handlePiPChange();
          }}
        >
          <p>Picture in Picture</p>

          <Switch
            onChange={handlePiPChange}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#ff00fb"
            height={23}
            width={46}
            handleDiameter={18}
            checked={isPiP}
            className="pointer-events-none react-switch"
          />
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <p>More Settings</p>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <p>Keyboard Shortcuts</p>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <p>Media Info</p>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MenuButton;
