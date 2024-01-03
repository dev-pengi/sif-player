import { FC } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import {
  PlayToggle,
  FullScreenButton,
  VolumeSlider,
  PlayBackSpeed,
} from "../Buttons";
import { formatTime } from "../../../utilities";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import TrackSlider from "../Track/TrackSlider";
import LockButton from "../Buttons/LockButton";

interface BottomControllerProps {
  showControllers: boolean;
}

const BottomController: FC<BottomControllerProps> = ({ showControllers }) => {
  const { duration, currentTime, isLocked, setIsPanelHovering } =
    usePlayerContext();
  return (
    <AnimatePresence>
      {showControllers && !isLocked && (
        <motion.div
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseLeave={() => setIsPanelHovering(false)}
          onMouseEnter={() => setIsPanelHovering(true)}
          className="relative flex w-full items-center px-12 h-[80px] flex-col"
        >
          <TrackSlider />
          <div className="flex justify-between w-full mt-2">
            <div className="relative flex items-center justify-center">
              <PlayToggle />
              <div className="ml-[14px]">
                <LockButton />
              </div>
              <LayoutGroup>
                <div className="ml-3">
                  <VolumeSlider />
                </div>
                <motion.p layout className="drop-shadow-2xl ml-4">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomController;
