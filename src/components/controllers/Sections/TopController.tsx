import { FC } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import { BackButton } from "../Buttons";

const TopController: FC = () => {
  const { mediaData } = usePlayerContext();
  return (
    <>
      <div className="relative flex z-1 w-full items-center overflow-visible px-12 h-[70px] justify-between">
        <div className="relative flex items-center justify-center">
          <BackButton />
          <p className="ml-3">{mediaData.name || "Untitled Media"}</p>
        </div>
      </div>
    </>
  );
};

export default TopController;
