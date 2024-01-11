import { FC } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import {
  PlayToggle,
  FullScreenButton,
  VolumeSlider,
  PlayBackSpeed,
} from "../buttons";
import { formatTime } from "../../../utils";
import { useControlsContext, useTimerContext } from "../../../contexts";
import TrackSlider from "../track/TrackSlider";
import LockButton from "../buttons/LockButton";
import { useSelector } from "react-redux";

const BottomController: FC = () => {
  const { controllersDeps, isLocked, setIsPanelHovering } =
    useControlsContext();
  const { duration, currentTime } = useSelector(
    (state: any) => state.timerReducer
  );

  return (
    <AnimatePresence>
      {controllersDeps.length && !isLocked && (
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
