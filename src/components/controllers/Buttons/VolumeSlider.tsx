import { FC, useEffect, useState } from "react";
import { MaxSoundIcon } from "../../../assets";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { motion, useAnimation } from "framer-motion";
import Button from "./Button";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import MinSoundIcon from "../../../assets/MinSoundIcon";
import MuteSoundIcon from "../../../assets/MuteSoundIcon";

interface VolumeSliderProps {}

const VolumeSlider: FC<VolumeSliderProps> = ({}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { volume, isMuted, isPanelHovering, handleVolumeChange } =
    usePlayerContext();

  const iconVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.2 },
  };

  const sliderControls = useAnimation();
  const maxSoundControls = useAnimation();
  const minSoundControls = useAnimation();
  const muteSoundControls = useAnimation();

  useEffect(() => {
    if (isMuted) {
      maxSoundControls.start("hidden");
      minSoundControls.start("hidden");
      muteSoundControls.start("visible");
      return;
    }
    if (volume > 50) {
      maxSoundControls.start("visible");
      minSoundControls.start("hidden");
      muteSoundControls.start("hidden");
    } else if (volume <= 50 && volume > 0) {
      maxSoundControls.start("hidden");
      minSoundControls.start("visible");
      muteSoundControls.start("hidden");
    } else if (volume === 0) {
      maxSoundControls.start("hidden");
      minSoundControls.start("hidden");
      muteSoundControls.start("visible");
    }
  }, [volume, isMuted]);

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
      <div className="flex items-center justify-start w-full h-[22px] text-[22px]">
        <div className="w-[22px] h-[22px] relative">
          <motion.div
            className="absolute left-0 right-0 top-0 bottom-0 h-max w-max m-auto"
            variants={iconVariants}
            initial="hidden"
            animate={maxSoundControls}
            transition={{
              duration: 0.1,
            }}
          >
            <MaxSoundIcon />
          </motion.div>
          <motion.div
            className="absolute left-0 right-0 top-0 bottom-0 h-max w-max m-auto"
            variants={iconVariants}
            initial="hidden"
            animate={minSoundControls}
            transition={{
              duration: 0.1,
            }}
          >
            <MinSoundIcon />
          </motion.div>
          <motion.div
            className="absolute left-0 right-0 top-0 bottom-0 h-max w-max m-auto"
            variants={iconVariants}
            initial="hidden"
            animate={muteSoundControls}
            transition={{
              duration: 0.1,
            }}
          >
            <MuteSoundIcon />
          </motion.div>
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
            value={volume}
            min={0}
            max={100}
            onChange={(value: number) => {
              handleVolumeChange(value);
              setIsDragging(true);
            }}
            onChangeComplete={() => setIsDragging(false)}
            keyboard={false}
            style={{ width: 60, marginLeft: 15, marginRight: 10 }}
            styles={{
              handle: {
                border: "none",
                boxShadow: "none",
                opacity: 1,
              },
              track: {
                backgroundColor: "#fff",
              },
              rail: {
                backgroundColor: "#555",
              },
            }}
          />
        </motion.div>
      </div>
    </Button>
  );
};

export default VolumeSlider;
