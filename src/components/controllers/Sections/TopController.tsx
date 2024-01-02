import { FC } from "react";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import { BackButton } from "../Buttons";
import { motion } from "framer-motion";

interface TopControllerProps {
  showControllers: boolean;
}

const TopController: FC<TopControllerProps> = ({ showControllers }) => {
  const { mediaData } = usePlayerContext();
  return (
    <motion.div
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="visible"
      animate={showControllers ? "visible" : "hidden"}
      className="relative flex z-1 w-full items-center overflow-visible px-12 h-[70px] justify-between"
    >
      <div className="relative flex items-center justify-center">
        <BackButton />
        <p className="ml-3">{mediaData?.name ?? "Untitled Media"}</p>
      </div>
    </motion.div>
  );
};

export default TopController;
