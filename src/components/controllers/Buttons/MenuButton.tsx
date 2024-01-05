import { FC, useState } from "react";
import Button from "./Button";
import { MenuIcon } from "../../../assets";
import { DropdownMenu } from "@radix-ui/themes";
import Switch from "react-switch";
import { usePlayerContext } from "../../../contexts";
import { Modal } from "../../modals";
import { useSettingsContext } from "../../../contexts";
import { SettingsBlock } from "../blocks";
import { usePlayer } from "../../../hooks";

const MenuButton: FC = () => {
  const { isLoop, setIsLoop, shortcutsEnabled, setShortcutsEnabled } =
    useSettingsContext();
  const { isPiP } =
    usePlayerContext();
  const { handleControllerDependencies, handleTogglePiP } = usePlayer();
  const { primaryColor } = useSettingsContext();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const handleLoopToggle = () => {
    setIsLoop((prev) => !prev);
  };
  const handleShortcutsToggle = () => {
    setShortcutsEnabled((prev) => !prev);
  };

  const handleSettingsOpen = () => {
    setSettingsModalOpen(true);
    handleControllerDependencies("settings");
  };
  const handleSettingsClose = () => {
    setSettingsModalOpen(false);
    handleControllerDependencies("settings", false);
  };

  return (
    <>
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
              onColor={primaryColor}
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
              onColor={primaryColor}
              height={23}
              width={46}
              handleDiameter={18}
              className="pointer-events-none react-switch"
            />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(event) => {
              event.preventDefault();
              handleTogglePiP();
            }}
          >
            <p>Picture in Picture</p>

            <Switch
              onChange={handleTogglePiP}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor={primaryColor}
              height={23}
              width={46}
              handleDiameter={18}
              checked={isPiP}
              className="pointer-events-none react-switch"
            />
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={handleSettingsOpen}>
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
      <Modal
        isOpen={settingsModalOpen}
        onClose={handleSettingsClose}
        title="Player settings"
      >
        <SettingsBlock />
      </Modal>
    </>
  );
};

export default MenuButton;
