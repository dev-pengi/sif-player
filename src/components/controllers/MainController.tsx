import { FC, useEffect, useRef } from "react";
import {
  BottomController,
  CenterController,
  LockedController,
  TopController,
} from "./Controls";
import { AnimatePresence, motion } from "framer-motion";
import { useControlsContext } from "../../contexts";
import { usePlayer } from "../../hooks";

const CONTROLLER_DEP: string = "active";

const MainController: FC = () => {
  const { isLocked, controllersDeps } = useControlsContext();
  const {
    handleAddControllerDependencies,
    handleRemoveControllerDependencies,
  } = usePlayer();
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // console.log(controllersDeps);
    const handleEvent = () => {
      handleAddControllerDependencies(CONTROLLER_DEP);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        handleRemoveControllerDependencies(CONTROLLER_DEP);
      }, 2000);
    };

    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("keyup", handleEvent);
    window.addEventListener("mousedown", handleEvent);
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("touchmove", handleEvent);
    window.addEventListener("touchend", handleEvent);

    return () => {
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("keydown", handleEvent);
      window.removeEventListener("keyup", handleEvent);
      window.removeEventListener("mousedown", handleEvent);
      window.removeEventListener("touchstart", handleEvent);
      window.removeEventListener("touchmove", handleEvent);
      window.removeEventListener("touchend", handleEvent);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [controllersDeps]);

  return (
    <div
      style={{
        cursor: controllersDeps.length ? "auto" : "none",
      }}
      className="fixed w-screen h-screen flex flex-col z-1"
    >
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
            className="fixed z-0 top-0 left-0 w-full h-[150px] top-shadow"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {controllersDeps.length && (
          <motion.div
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed z-0 bottom-0 left-0 w-full h-[150px] bottom-shadow"
          ></motion.div>
        )}
      </AnimatePresence>
      <TopController />
      <CenterController />
      <BottomController />
      <LockedController />
    </div>
  );
};

export default MainController;
