import { FC, useEffect } from "react";
import { useControlsContext, usePlayerContext } from "../../../contexts";
import { BackButton, MenuButton } from "../Buttons";
import { AnimatePresence, motion } from "framer-motion";

const TopController: FC = () => {
  const { mediaData } = usePlayerContext();
  const { isLocked, controllersDeps } = useControlsContext();
  const videoName = mediaData?.name ?? "Untitled Video";

  useEffect(() => {
    document.title = `Sif Player | ${videoName}`;
  }, [mediaData]);

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
          className="relative flex z-1 w-full items-center overflow-visible px-12 h-[70px] justify-between"
        >
          <div className="relative flex items-center justify-center">
            <BackButton />
            <p className="ml-3">{videoName}</p>
          </div>
          <div className="relative flex items-center justify-center">
            <MenuButton />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopController;
