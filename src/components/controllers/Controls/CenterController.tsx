import { FC } from "react";
import { useLoaderContext, useSettingsContext } from "../../../contexts";
import { ActivityIndicator } from "../../spins";
import { AnimatePresence, motion } from "framer-motion";
import { usePlayer } from "../../../hooks";

const CenterController: FC = () => {
  const { isLoading } = useLoaderContext();
  const { playToggleClick } = useSettingsContext();
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
