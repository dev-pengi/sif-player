import { FC, useEffect, useState } from "react";
import { VideoPicker } from "../components";
import { usePlayerContext } from "../contexts/PlayerContext";
import { LinkIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ActivityIndicator } from "../components/loaders";

const MainPage: FC = () => {
  const navigate = useNavigate();
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  const {
    setVideoFile,
    setMediaData,
    setVideoSrc,
    setIsLoading,
    setIsError,
    setIsPlaying,
    setIsFullScreen,
    setVolume,
    setIsMuted,
    setDuration,
    setCurrentTime,
    setIsPanelHovering,
    setCurrentSpeed,
  } = usePlayerContext();

  useEffect(() => {
    setVideoFile(null);
    setMediaData(null);
    setVideoSrc("");
    setIsLoading(true);
    setIsError(false);
    setIsPlaying(false);
    setIsFullScreen(false);
    setVolume(100);
    setIsMuted(false);
    setDuration(0);
    setCurrentTime(0);
    setIsPanelHovering(false);
    setCurrentSpeed(1);
  }, []);

  const [URl, setURL] = useState("");

  const handleUrlSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/player?src=${URl}&type=url`);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <motion.div
        layout
        style={{
          borderRadius: 6,
        }}
        className="backdrop-blur-2xl border-[1px] flex items-center justify-center w-max border-solid border-neutral-800 bg-zinc-800/30 from-inherit px-2 py-2"
      >
        {isVideoUploading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            layout
            className="w-[200px] h-[200px] flex justify-center items-center flex-col"
          >
            <ActivityIndicator />
            <p className="mt-2">Loading Video Data...</p>
          </motion.div>
        ) : (
          <>
            <VideoPicker handleLoadStart={() => setIsVideoUploading(true)} />
            <div className="ml-6 flex-1">
              <label htmlFor="media-url" className="text-white/50 uppercase">
                Play with a URL
              </label>
              <div className="mt-2 relative">
                <div className="text-[18px] absolute top-1/2 left-4 transform -translate-y-1/2">
                  <LinkIcon />
                </div>
                <input
                  onChange={(e) => setURL(e.target.value)}
                  value={URl}
                  type="text"
                  placeholder="Enter URL"
                  id="media-url"
                  className="px-6 py-3 w-[600px] pl-[46px] w-full h-max bg-transparent rounded-md border-neutral-600 border-solid border-[1px]"
                />
              </div>
              <div className="flex">
                <button
                  onClick={handleUrlSubmit}
                  className="py-2 px-9 mt-4 text-[14px] border-[2px] border-primary text-white bg-primary hover:opacity-90 duration-200 border-solid rounded-[4px]"
                >
                  Play Video
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default MainPage;
