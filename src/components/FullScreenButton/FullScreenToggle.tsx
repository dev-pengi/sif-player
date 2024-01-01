import { FC } from "react";
import Button from "../General/Button";
import {MaximizeIcon} from "../../assets";

interface FullScreenButtonProps {
  onToggle: () => void;
}

const FullScreenButton: FC<FullScreenButtonProps> = ({ onToggle }) => {
  return (
    <Button onClick={onToggle}>
      <div className="absolute text-[24px] left-0 right-0 top-0 bottom-0 h-max w-max m-auto">
        <MaximizeIcon />
      </div>
    </Button>
  );
};

export default FullScreenButton;
