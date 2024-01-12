import { FC } from "react";
import { ActivityIndicator } from "../../spins";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector, usePlayer } from "../../../hooks";

const CenterController: FC = () => {
  const { isLoading } = useAppSelector((state) => state.player);
  const { playToggleClick } = useAppSelector((state) => state.settings);
  const { handleToggleScreen, handleTogglePlay } = usePlayer();

  const handleClickPlay = () => {
    if (playToggleClick) {
      handleTogglePlay();
    }
  };

  return (
    <div
      onDoubleClick={handleToggleScreen}
      onClick={handleClickPlay}
      className="flex-1 flex items-center justify-center"
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-[22px]"
          >
            <ActivityIndicator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CenterController;
