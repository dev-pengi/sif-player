import { FC, useEffect, useState } from "react";
import { VideoPicker } from "../components";
import { usePlayerContext } from "../contexts/PlayerContext";
import { LinkIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ActivityIndicator } from "../components/spins";

const MainPage: FC = () => {
  const navigate = useNavigate();
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  useEffect(() => {
    document.title = `Sif Player | Web Player`;
  }, []);

  const { handleReset } = usePlayerContext();

  useEffect(() => {
    handleReset();
  }, []);

  const [url, setUrl] = useState("");
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);
  const handleUrlSubmit = (e: any) => {
    e.preventDefault();
    if (!url?.trim()?.length) return setIsInvalidUrl(true);
    navigate(`/player?src=${url}&type=url`);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <motion.div
        layout
        style={{
          borderRadius: 6,
        }}
        transition={{
          duration: 0.15,
        }}
        className="backdrop-blur-2xl border-[1px] flex items-center justify-center w-max border-solid border-neutral-800 bg-zinc-800/30 from-inherit px-2 py-2"
      >
        {isVideoUploading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.16,
              duration: 0.2,
            }}
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
                  onChange={(e) => {
                    setIsInvalidUrl(false);
                    setUrl(e.target.value);
                  }}
                  value={url}
                  type="text"
                  placeholder="Enter URL"
                  id="media-url"
                  className={`px-6 py-3 w-[600px] pl-[46px] h-max bg-transparent rounded-md ${
                    isInvalidUrl ? "border-red-400" : "border-neutral-600"
                  } border-solid border-[1px]`}
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
