import { FC } from "react";
import { motion, LayoutGroup } from "framer-motion";
import {
  PlayToggle,
  FullScreenButton,
  VolumeSlider,
  PlayBackSpeed,
} from "../Buttons";
import { formatTime } from "../../../utils";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const BottomController: FC = () => {
  const { duration, currentTime, setIsPanelHovering } = usePlayerContext();
  return (
    <div
      onMouseLeave={() => setIsPanelHovering(false)}
      onMouseEnter={() => setIsPanelHovering(true)}
      className="relative flex w-full items-center px-12 h-[70px] justify-between"
    >
      <div className="relative flex items-center justify-center">
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
      <div className="relative flex items-center justify-center">
        <PlayBackSpeed />
        <div className="ml-3">
          <FullScreenButton />
        </div>
      </div>
    </div>
  );
};

export default BottomController;
