import { FC, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Slider from "rc-slider";

import { usePlayerContext } from "../../../contexts/PlayerContext";
import Button from "./Button";
import { MaxSoundIcon, MinSoundIcon, MuteSoundIcon } from "../../../assets";
import "rc-slider/assets/index.css";

interface VolumeSliderProps {}

const VolumeSlider: FC<VolumeSliderProps> = ({}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { volume, isMuted, isPanelHovering, handleVolumeChange } =
    usePlayerContext();
  const [currentMaxVar, setCurrentMaxVar] = useState("visible");
  const [currentMinVar, setCurrentMinVar] = useState("hidden");
  const [currentMuteVar, setCurrentMuteVar] = useState("hidden");

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
      currentMaxVar !== "hidden" && maxSoundControls.start("hidden");
      currentMinVar !== "hidden" && minSoundControls.start("hidden");
      currentMuteVar !== "visible" && muteSoundControls.start("visible");
      setCurrentMaxVar("hidden");
      setCurrentMinVar("hidden");
      setCurrentMuteVar("visible");
      return;
    }
    if (volume > 50) {
      currentMaxVar !== "visible" && maxSoundControls.start("visible");
      currentMinVar !== "hidden" && minSoundControls.start("hidden");
      currentMuteVar !== "hidden" && muteSoundControls.start("hidden");
      setCurrentMaxVar("visible");
      setCurrentMinVar("hidden");
      setCurrentMuteVar("hidden");
    } else if (volume <= 50 && volume > 0) {
      currentMaxVar !== "hidden" && maxSoundControls.start("hidden");
      currentMinVar !== "visible" && minSoundControls.start("visible");
      currentMuteVar !== "hidden" && muteSoundControls.start("hidden");
      setCurrentMaxVar("hidden");
      setCurrentMinVar("visible");
      setCurrentMuteVar("hidden");
    } else if (volume === 0) {
      currentMaxVar !== "hidden" && maxSoundControls.start("hidden");
      currentMinVar !== "hidden" && minSoundControls.start("hidden");
      currentMuteVar !== "visible" && muteSoundControls.start("visible");
      setCurrentMaxVar("hidden");
      setCurrentMinVar("hidden");
      setCurrentMuteVar("visible");
    }
  }, [volume, isMuted, currentMaxVar, currentMinVar, currentMuteVar]);

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
            initial="visible"
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
                cursor:'pointer',
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
