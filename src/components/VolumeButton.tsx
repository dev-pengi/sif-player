import { FC } from "react";
import { motion } from "framer-motion";

interface VolumeButtonProps {
  volume?: number;
}

const VolumeButton: FC<VolumeButtonProps> = () => {
  return (
    <button>
      <motion.svg
        layoutId="volume-svg"
        width="30px"
        height="30px"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.polygon
          points="157.65 176.1 64 176.1 64 335.9 157.65 335.9 288 440 288 72 157.65 176.1"
          fill="#ffffff"
        />
        <motion.path
          d="M352,320c9.74-19.41,16-40.81,16-64,0-23.51-6-44.4-16-64"
          fill="none"
          stroke={"#ffffff"}
          strokeLinecap="square"
          strokeLinejoin="round"
          strokeWidth="40px"
        />
        <motion.path
          d="M400,368c19.48-34,32-64,32-112s-12-77.7-32-112"
          fill="none"
          stroke={"#ffffff"}
          strokeLinecap="square"
          strokeLinejoin="round"
          strokeWidth="40px"
        />
      </motion.svg>
    </button>
  );
};

export default VolumeButton;
