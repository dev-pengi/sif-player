import { FC } from "react";
import { motion } from "framer-motion";

interface PlayToggleProps {
  isPlaying: boolean;
  handleTogglePlay: () => void;
}

const PlayToggle: FC<PlayToggleProps> = ({ isPlaying, handleTogglePlay }) => {
  return (
    <>
      <button onClick={handleTogglePlay}>
        {isPlaying ? (
          <motion.svg
            layoutId="pp-svg"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              layoutId="pp-path"
              d="M754.571 0v1920H206V0h548.571Zm960 0v1920H1166V0h548.571Z"
              fill="currentColor"
            />
          </motion.svg>
        ) : (
          <motion.svg
            fill="currentColor"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            enable-background="new 0 0 24 24"
          >
            <path d="M19,12L5,22.2V1.8L19,12z" />
          </motion.svg>
        )}
      </button>
    </>
  );
};

export default PlayToggle;
