import { FC } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { PlayToggle, FullScreenButton, VolumeSlider } from "../Buttons";
import { formatTime } from "../../../utils";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const BottomController: FC = () => {
  const { duration, currentTime, setIsPanelHovering } = usePlayerContext();
  return (
    <div
      onMouseLeave={() => setIsPanelHovering(false)}
      onMouseEnter={() => setIsPanelHovering(true)}
      className="flex w-full items-center px-12 py-5 justify-between"
    >
      <div className="flex items-center justify-center">
        <PlayToggle />
        <LayoutGroup>
          <div className="ml-3">
            <VolumeSlider />
          </div>
          <motion.p layout className="drop-shadow-2xl ml-3">
            {formatTime(currentTime)} / {formatTime(duration)}
          </motion.p>
        </LayoutGroup>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[23px] h-[23px] ">
          <FullScreenButton />
        </div>
      </div>
    </div>
  );
};

export default BottomController;
