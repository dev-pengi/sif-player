import { FC, useEffect, useState } from "react";
import { MaxSoundIcon } from "../../assets";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { motion, useAnimation } from "framer-motion";
import Button from "../General/Button";

interface VolumeProps {
  volume: number;
  isPanelHovering: boolean;
  onVolumeChange: (volume: number) => void;
}

const Volume: FC<VolumeProps> = ({
  volume,
  isPanelHovering,
  onVolumeChange,
}) => {
  const sliderControls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!(isPanelHovering || isDragging)) sliderControls.start("hidden");
  }, [isPanelHovering, isDragging]);

  return (
    <Button
      style={{
        borderRadius: 6,
      }}
      className="pl-2.5 pr-1.5 py-1.5"
      onMouseEnter={() => sliderControls.start("visible")}
    >
      <div
        className="relative flex items-center justify-start w-full text-[22px]"
      >
        <div className="left-0">
          <MaxSoundIcon />
        </div>
        <motion.div
          className="overflow-hidden"
          variants={{
            visible: {
              opacity: 1,
              width: "max-content",
            },
            hidden: {
              opacity: 0,
              width: 0,
            },
          }}
          initial="hidden"
          animate={sliderControls}
        >
          <Slider
            step={1}
            defaultValue={volume}
            value={volume}
            min={0}
            max={100}
            onChange={(value) => {
              onVolumeChange(value as number);
              setIsDragging(true);
            }}
            onChangeComplete={() => setIsDragging(false)}
            style={{ width: 60, marginLeft: 15, marginRight: 10 }}
            styles={{
              handle: {
                border: "none",
                boxShadow: "none",
              },
              track: {
                backgroundColor: "#fff",
              },
              rail: {
                backgroundColor: "#aaa",
              },
            }}
          />
        </motion.div>
      </div>
    </Button>
  );
};

export default Volume;
