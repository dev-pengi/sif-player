import { FC, useEffect, useState, useRef } from "react";
import {
  usePlayerContext,
  useSettingsContext,
  useTimerContext,
} from "../../../contexts";
import { motion } from "framer-motion";
import Indicator from "./Indicator";
import { usePlayer, useTimer } from "../../../hooks";

const TrackSlider: FC = () => {
  const { primaryColor } = useSettingsContext();
  const { duration, bufferedPercentage, timePercentage } = useTimerContext();
  const { handlePlay, handlePause } = usePlayer();
  const { handleSeek } = useTimer();

  const [hoverPoint, setHoverPoint] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const calculateTime = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    let clickedPercentage = x / rect.width;

    clickedPercentage = Math.max(0, Math.min(clickedPercentage, 1));

    const newCurrentTime = clickedPercentage * duration;
    handleSeek(newCurrentTime);
  };

  const handleHoverMouseMove = (event) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clickedPercentage = x / rect.width;
    setHoverPoint(clickedPercentage);
  };

  const handleDragMouseMove = (event) => {
    event.preventDefault();
    console.count("executed");
    if (isDragging) {
      handlePause();
      calculateTime(event);
    }
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    handlePause();
    calculateTime(event);
    setIsDragging(true);
  };

  const handleMouseUp = (event) => {
    event.preventDefault();
    handlePlay();
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="w-full h-[16px] relative flex items-center justify-center"
    >
      <motion.div
        className="w-full cursor-pointer relative bg-[#ffffff52] rounded-[1px] overflow-hidden"
        style={{
          height: "6px",
        }}
        initial={{
          scaleY: 0.6,
        }}
        animate={{
          scaleY: isHovering ? 1 : 0.6,
        }}
        transition={{
          type: "tween",
          duration: 0.15,
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={() => setHoverPoint(0)}
        onMouseMove={handleHoverMouseMove}
        ref={sliderRef}
      >
        <Indicator
          indicatorPercentage={bufferedPercentage}
          backgroundColor="#ffffff40"
          animate={false}
        />
        <Indicator
          indicatorPercentage={hoverPoint}
          backgroundColor="#ffffff7d"
          animate={false}
        />
        <Indicator
          indicatorPercentage={timePercentage}
          backgroundColor={primaryColor}
          animate={false}
        />
      </motion.div>
      <motion.div
        style={{
          borderRadius: "50%",
          backgroundColor: primaryColor,
        }}
        initial={{
          left: 0,
          opacity: 0,
          width: 0,
          height: 0,
        }}
        animate={{
          left: timePercentage * 100 + "%",
          opacity: isHovering ? 1 : 0,
          width: isHovering ? 13 : 0,
          height: isHovering ? 13 : 0,
        }}
        transition={{
          type: "tween",
          duration: isDragging ? 0 : 0.1,
        }}
        className="bottom-0 top-0 m-auto  absolute transform -translate-x-1/2 pointer-events-none"
      />
    </div>
  );
};

export default TrackSlider;
