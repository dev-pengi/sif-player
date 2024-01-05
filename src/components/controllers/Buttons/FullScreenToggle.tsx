import { FC, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import Button from "./Button";
import { MaximizeIcon, MinimizeIcon } from "../../../assets";
import { useControlsContext, usePlayerContext } from "../../../contexts";
import { usePlayer } from "../../../hooks";

const FullScreenButton: FC = () => {
  const { isFullScreen } = useControlsContext();
  const { handleToggleScreen } = usePlayer();

  const maximizeController = useAnimation();
  const minimizeController = useAnimation();
  const iconVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.2 },
  };

  useEffect(() => {
    maximizeController.start(isFullScreen ? "hidden" : "visible");
    minimizeController.start(isFullScreen ? "visible" : "hidden");
  }, [isFullScreen]);

  return (
    <Button onClick={handleToggleScreen}>
      <motion.div
        className="absolute left-0 right-0 top-0 bottom-0 h-max w-max m-auto text-[28px]"
        variants={iconVariants}
        initial="hidden"
        animate={maximizeController}
      >
        <MaximizeIcon />
      </motion.div>
      <motion.div
        className="absolute text-[32px] left-0 right-0 top-0 bottom-0 h-max w-max m-auto"
        variants={iconVariants}
        initial="visible"
        animate={minimizeController}
      >
        <MinimizeIcon />
      </motion.div>
    </Button>
  );
};

export default FullScreenButton;
