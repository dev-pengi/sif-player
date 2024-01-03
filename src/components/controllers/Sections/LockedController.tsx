import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import { UnlockIcon } from "../../../assets";

interface LockedControllerProps {
  showControllers: boolean;
}

const LockedController: FC<LockedControllerProps> = ({ showControllers }) => {
  const { isLocked, setIsLocked } = usePlayerContext();
  return (
    <>
      <AnimatePresence>
        {isLocked && showControllers && (
          <motion.div
            onClick={() => setIsLocked(false)}
            variants={{
              visible: { opacity: 1, y: -20 },
              hidden: { opacity: 0, y: 20 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="py-2 px-4 cursor-pointer bottom-0 bg-[#ffffff3e] w-max rounded-[10px] flex items-center justify-center z-2 absolute left-0 right-0 mx-auto"
          >
            <div className="text-[22px] ">
              <UnlockIcon />
            </div>
            <p className="ml-2 ">Unlock Controllers</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LockedController;
