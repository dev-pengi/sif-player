import { FC, useEffect, useState, useRef } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import { motion } from "framer-motion";
import Indicator from "./Indicator";

const TrackSlider: FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    videoRef,
    duration,
    currentTime,
    setCurrentTime,
  } = usePlayerContext();
  const [timePercentage, setTimePercentage] = useState(0);
  const [hoverPoint, setHoverPoint] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [bufferedPercentage, setBufferedPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!duration) return setTimePercentage(0);
    setTimePercentage(currentTime / duration);
  }, [currentTime]);

  const calculateTime = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    let clickedPercentage = x / rect.width;

    clickedPercentage = Math.max(0, Math.min(clickedPercentage, 1));

    const newCurrentTime = clickedPercentage * duration;
    setCurrentTime(newCurrentTime);
    videoRef.current.currentTime = newCurrentTime;
  };

  const calculateBufferedPercentage = () => {
    if (!videoRef.current) return 0;
    const buffered = videoRef.current.buffered;
    if (buffered.length === 0) return 0;
    const bufferedEnd = buffered.end(buffered.length - 1);
    return bufferedEnd / duration;
  };

  const handleHoverMouseMove = (event) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clickedPercentage = x / rect.width;
    setHoverPoint(clickedPercentage);
  };

  const handleDragMouseMove = (event) => {
    if (isDragging) {
      calculateTime(event);
    }
  };

  const handleMouseDown = (event) => {
    calculateTime(event);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleDragMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleDragMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const bufferedPercentage = calculateBufferedPercentage();
    setBufferedPercentage(bufferedPercentage);
  }, [currentTime]);

  useEffect(() => {
    if (isDragging && isPlaying) {
      setIsPlaying(false);
    }
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
        {isDragging && (
          <div className="fixed left-0 right-0 top-0 bottom-0 m-auto w-full bg-transparent" />
        )}

        <Indicator
          indicatorPercentage={bufferedPercentage}
          backgroundColor="#ffffff40"
          animate={true}
        />
        <Indicator
          indicatorPercentage={hoverPoint}
          backgroundColor="#ffffff7d"
          animate={true}
        />
        <Indicator
          indicatorPercentage={timePercentage}
          backgroundColor="#ff00fb"
          animate={!isDragging}
        />
      </motion.div>
      <motion.div
        style={{
          borderRadius: "50%",
          width: 13,
          height: 13,
        }}
        initial={{
          left: 0,
          opacity: 0,
        }}
        animate={{
          left: timePercentage * 100 + "%",
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: isDragging ? 0 : 0.1,
        }}
        className="bottom-0 top-0 m-auto bg-primary absolute transform -translate-x-1/2 pointer-events-none"
      />
    </div>
  );
};

export default TrackSlider;
