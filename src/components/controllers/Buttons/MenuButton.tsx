import { FC } from "react";
import Button from "./Button";
import { MenuIcon } from "../../../assets";
// import { usePlayerContext } from "../../../contexts/PlayerContext";
import { Item, Menu, useContextMenu } from "react-contexify";
const MENU_ID = "actions-menu";

const MenuButton: FC = () => {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleOpenMenu(e: React.MouseEvent) {
    show({
      event: e,
    });
  }

  return (
    <>
      <Button onClick={handleOpenMenu}>
        <div className="absolute text-[24px] left-0 right-0 top-0 bottom-0 h-max w-max m-auto">
          <MenuIcon />
        </div>
      </Button>
      <Menu id={MENU_ID}>
        <Item>
          <p>Repeat Video</p>
        </Item>
      </Menu>
    </>
  );
};

export default MenuButton;