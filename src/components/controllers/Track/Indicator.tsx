import { FC } from "react";
import { motion } from "framer-motion";

interface IndicatorProps {
  indicatorPercentage: number;
  backgroundColor?: string;
  animate?: boolean;
}

const Indicator: FC<IndicatorProps> = ({
  indicatorPercentage,
  backgroundColor,
  animate = true,
}) => {
  return (
    <motion.div
      className="w-full h-full absolute left-0 bottom-0"
      style={{
        backgroundColor: backgroundColor,
        transformOrigin: "0 50%",
      }}
      initial={{
        scaleX: 0,
      }}
      transition={{
        type: "tween",
        duration: animate ? 0.15 : 0,
      }}
      animate={{
        scaleX: indicatorPercentage,
      }}
    />
  );
};

export default Indicator;
