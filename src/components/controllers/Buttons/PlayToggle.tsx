import { FC, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { PauseIcon, PlayIcon } from "../../../assets";
import Button from "./Button";
import { usePlayerContext } from "../../../contexts/PlayerContext";

interface PlayToggleProps {}

const PlayToggle: FC<PlayToggleProps> = ({}) => {
  const playController = useAnimation();
  const pauseController = useAnimation();

  const { isPlaying, handleTogglePlay } = usePlayerContext();

  useEffect(() => {
    playController.start(isPlaying ? "hidden" : "visible");
    pauseController.start(isPlaying ? "visible" : "hidden");
  }, [isPlaying]);

  return (
    <Button onClick={handleTogglePlay}>
      <motion.div
        className="absolute left-0 right-0 top-0 bottom-0 h-max w-max m-auto"
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0.2 },
        }}
        initial="hidden"
        animate={playController}
      >
        <PlayIcon />
      </motion.div>
      <motion.div
        className="absolute text-[22px] left-0 right-0 top-0 bottom-0 h-max w-max m-auto"
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0.2 },
        }}
        initial="visible"
        animate={pauseController}
      >
        <PauseIcon />
      </motion.div>
    </Button>
  );
};

export default PlayToggle;
