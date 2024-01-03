import { FC, useState, useEffect, useRef } from "react";
import { BottomController, CenterController, TopController } from "./Sections";
import { AnimatePresence, motion } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";
import { usePlayerContext } from "../../contexts/PlayerContext";

const MainController: FC = () => {
  const [showControllers, setShowControllers] = useState(true);
  const { isPlaying } = usePlayerContext();
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const handleEvent = () => {
      setShowControllers(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        if (isPlaying) setShowControllers(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleEvent);
    window.addEventListener("keydown", handleEvent);

    return () => {
      window.removeEventListener("mousemove", handleEvent);
      window.removeEventListener("keydown", handleEvent);
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
        {showControllers && (
          <motion.div
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="fixed z-0 top-0 left-0 w-full h-[150px] top-shadow"></div>
            <div className="fixed z-0 bottom-0 left-0 w-full h-[150px] bottom-shadow"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <TopController showControllers={showControllers} />
      <CenterController />
      <BottomController showControllers={showControllers} />
    </div>
  );
};

export default MainController;
