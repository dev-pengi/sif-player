import { FC, useState, useEffect, useRef } from "react";
import {
  BottomController,
  CenterController,
  LockedController,
  TopController,
} from "./Sections";
import { AnimatePresence, motion } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";
import { usePlayerContext } from "../../contexts/PlayerContext";

const MainController: FC = () => {
  const [showControllers, setShowControllers] = useState(true);
  const { isLocked } = usePlayerContext();
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const handleEvent = () => {
      setShowControllers(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setShowControllers(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("keydown", handleEvent);
    window.addEventListener("mousedown", handleEvent);
    window.addEventListener("touchstart", handleEvent);
    window.addEventListener("touchmove", handleEvent);
    window.addEventListener("touchend", handleEvent);


    return () => {
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("keydown", handleEvent);
      window.removeEventListener("mousedown", handleEvent);
      window.removeEventListener("touchstart", handleEvent);
      window.removeEventListener("touchmove", handleEvent);
      window.removeEventListener("touchend", handleEvent);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  useHotkeys("c", () => {
    setShowControllers((prev) => !prev);
  });

  return (
    <div
      style={{
        cursor: showControllers ? "auto" : "none",
      }}
      className="fixed w-screen h-screen flex flex-col z-1"
    >
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
            className="fixed z-0 top-0 left-0 w-full h-[150px] top-shadow"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showControllers && (
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
      <TopController showControllers={showControllers} />
      <CenterController />
      <BottomController showControllers={showControllers} />
      <LockedController showControllers={showControllers} />
    </div>
  );
};

export default MainController;
