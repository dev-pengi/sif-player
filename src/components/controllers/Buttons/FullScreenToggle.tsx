import { FC } from "react";
import Button from "./Button";
import { MaximizeIcon } from "../../../assets";
import { usePlayerContext } from "../../../contexts/PlayerContext";


const FullScreenButton: FC = () => {
  const { handleToggleScreen } = usePlayerContext();

  return (
    <Button onClick={handleToggleScreen}>
      <div className="absolute text-[24px] left-0 right-0 top-0 bottom-0 h-max w-max m-auto">
        <MaximizeIcon />
      </div>
    </Button>
  );
};

export default FullScreenButton;
