import { FC, useEffect, useRef, useState } from "react";
import { play1, play2, pause1, pause2 } from "./paths";
import { interpolate } from "flubber";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

interface PlayToggleProps {
  isPlaying: boolean;
  handleTogglePlay: () => void;
}

const PlayToggle: FC<PlayToggleProps> = ({ isPlaying, handleTogglePlay }) => {
  return (
    <button onClick={handleTogglePlay}>
      <svg
        id="pp-toggle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 700"
        width="auto"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <SVGMorph isPlaying={isPlaying} paths={[play1, pause1, play1]} />
        <SVGMorph isPlaying={isPlaying} paths={[play2, pause2, play2]} />
      </svg>
    </button>
  );
};

export default PlayToggle;

function SVGMorph({ paths, isPlaying }) {
  const [pathIndex, setPathIndex] = useState(1);
  const progress = useMotionValue(0) as any;
  const getIndex = paths.map((_: string, i: number) => i);
  const path = useTransform(progress, getIndex, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 4 }),
  });

  useEffect(() => {
    if (isPlaying) {
      animate(progress, pathIndex, {
        duration: 0.2,
      });
    } else {
      animate(progress, 0, {
        duration: 0.2,
      });}
  }, [isPlaying]);

  return <motion.path height={"100%"} d={path} fill="#ffffff" />;
}
