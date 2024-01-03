import { FC } from "react";
import Button from "./Button";
import { MenuIcon } from "../../../assets";
import { DropdownMenu } from "@radix-ui/themes";

const MenuButton: FC = () => {
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
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <p>Repeat Video</p>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MenuButton;
