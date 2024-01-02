import { FC, useState, useEffect, useRef } from "react";
import { BottomController, CenterController, TopController } from "./Sections";
import { AnimatePresence, motion } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";

const MainController: FC = () => {
  const [showControllers, setShowControllers] = useState(true);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControllers(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setShowControllers(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useHotkeys("h", () => {
    setShowControllers(false);
  });
  useHotkeys("s", () => {
    setShowControllers(true);
  });
  useHotkeys("shift+c", () => {
    setShowControllers((prev) => !prev);
  });

  useEffect(() => {
    if (showControllers) {
      document.body.style.cursor = "auto";
    } else {
      document.body.style.cursor = "none";
    }
  }, [showControllers]);

  return (
    <div className="fixed w-screen h-screen flex flex-col z-1">
      <motion.div
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        initial="visible"
        animate={showControllers ? "visible" : "hidden"}
      >
        <div className="fixed z-0 top-0 left-0 w-full h-[150px] top-shadow"></div>
        <div className="fixed z-0 bottom-0 left-0 w-full h-[150px] bottom-shadow"></div>
      </motion.div>
      <TopController showControllers={showControllers} />
      <CenterController />
      <BottomController showControllers={showControllers} />
    </div>
  );
};

export default MainController;
