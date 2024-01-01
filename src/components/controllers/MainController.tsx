import { FC, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { PlayToggle, FullScreenButton, VolumeSlider } from "./Buttons";
import { formatTime } from "../../utils";
import { usePlayerContext } from "../../contexts/PlayerContext";
import { BottomController, CenterController } from "./Sections";

const MainController: FC = () => {
  return (
    <div className="absolute w-screen h-screen flex flex-col">
      <CenterController />
      <BottomController />
    </div>
  );
};

export default MainController;
