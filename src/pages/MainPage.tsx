import { FC, useEffect, useState } from "react";
import { VideoPicker } from "../components";
import { LinkIcon, WindowsIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ActivityIndicator } from "../components/spins";
import { DropdownMenu } from "@radix-ui/themes";
import { useAppSelector, useClean } from "../hooks";

const MainPage: FC = () => {
  const navigate = useNavigate();
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  useEffect(() => {
    document.title = `Sif Player | Web Player`;
  }, []);

  const { primaryColor } = useAppSelector((state) => state.settings);

  const [url, setUrl] = useState("");
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);
  const handleUrlSubmit = (e: any) => {
    e.preventDefault();
    if (!url?.trim()?.length) return setIsInvalidUrl(true);
    navigate(`/player?src=${url}&type=url`);
  };

  useClean();

  return (
    <div className="h-screen">
      <nav className="flex w-full items-center h-[90px] px-6 fixed">
        <div className="flex flex-1"></div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="px-3 py-2 rounded-md bg-[#ffffff16]">
              Contact Developer
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <a target="_blank" href="https://instagram.com/_sif.js">
              <DropdownMenu.Item>Instagram</DropdownMenu.Item>
            </a>
            <a target="_blank" href="https://t.me/sifjs">
              <DropdownMenu.Item>Telegram</DropdownMenu.Item>
            </a>
            <a target="_blank" href="https://github.com/dev-pengi">
              <DropdownMenu.Item>Github</DropdownMenu.Item>
            </a>
            <a target="_blank" href="https://sifedine.com">
              <DropdownMenu.Item>Portfolio</DropdownMenu.Item>
            </a>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </nav>
      <div className="flex h-full justify-center items-center flex-col">
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
                    style={{
                      color: primaryColor,
                    }}
                    className="py-2 px-9 mt-4 text-[14px] border-[2px] border-current bg-current hover:opacity-90 duration-200 border-solid rounded-[4px]"
                  >
                    <p className="text-white">Play Video</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>

        <p className="text-center font-semibold mt-12">
          <span className="block">for faster and better user experience</span>
          <span className="block">
            we recommend you to use our new desktop version
          </span>
        </p>
        <a
          style={{
            color: primaryColor,
          }}
          href="https://github.com/dev-pengi/sif-player/releases/latest/download/sif-player.exe"
          target="_blank"
          className="py-2 px-9 mt-6 text-[16px] border-[2px] border-current bg-current hover:opacity-90 duration-200 border-solid rounded-[4px] flex items-center justify-center gap-3"
        >
          <WindowsIcon />
          <p className="text-white">Download for windows!</p>
        </a>
      </div>
    </div>
  );
};

export default MainPage;
