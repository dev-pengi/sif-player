import { FC } from "react";
import Button from "./Button";
import { LockIcon } from "../../../assets";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const LockButton: FC = () => {
  const { setIsLocked } = usePlayerContext();
  return (
    <div>
      <Button onClick={() => setIsLocked(true)}>
        <div className="absolute text-[24px] left-0 right-0 top-0 bottom-0 h-max w-max m-auto">
          <LockIcon />
        </div>
      </Button>
    </div>
  );
};

export default LockButton;