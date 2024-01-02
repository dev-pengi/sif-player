import { FC } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import { ActivityIndicator } from "../../loaders";
import { AnimatePresence, motion } from "framer-motion";

const CenterController: FC = () => {
  const { isLoading } = usePlayerContext();
  return (
    <div className="flex-1 flex items-center justify-center">
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