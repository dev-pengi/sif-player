import { FC, useCallback, useEffect, useRef } from "react";
import {
  BottomController,
  CenterController,
  LockedController,
  TopController,
} from "./controls";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector, usePlayer } from "../../hooks";
import { throttle } from "lodash";

const CONTROLLER_DEP: string = "active";

const MainController: FC = () => {
  const { isLocked, controllersDeps } = useAppSelector(
    (state) => state.controls
  );
  const {
    handleAddControllerDependencies,
    handleRemoveControllerDependencies,
  } = usePlayer();
  const timerRef = useRef<any>(null);

  const handleEvent = useCallback(
    throttle(() => {
      handleAddControllerDependencies(CONTROLLER_DEP);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        handleRemoveControllerDependencies(CONTROLLER_DEP);
      }, 2000);
    }, 200),
    [controllersDeps]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("mousedown", handleEvent);
    window.addEventListener("keyup", handleEvent);
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("touchend", handleEvent);

    return () => {
      window.removeEventListener("mousedown", handleEvent);
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("keyup", handleEvent);
      window.removeEventListener("touchstart", handleEvent);
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
