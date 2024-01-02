import { FC, useEffect } from "react";
import { VideoPicker } from "../components";
import { usePlayerContext } from "../contexts/PlayerContext";
import { LinkIcon } from "../assets";

const MainPage: FC = () => {
  const { setVideoFile } = usePlayerContext();
  useEffect(() => {
    setVideoFile(null);
  }, []);
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="backdrop-blur-2xl border-[1px] flex items-center w-full max-w-[1000px] rounded-md border-solid border-neutral-800 bg-zinc-800/30 from-inherit px-2 py-2">
        <VideoPicker />
        <div className="ml-6 flex-1">
          <label htmlFor="media-url" className="text-white/50 uppercase">
            Play with a URL
          </label>
          <div className="mt-2 relative">
            <div className="text-[18px] absolute top-1/2 left-4 transform -translate-y-1/2">
              <LinkIcon />
            </div>
            <input
              type="text"
              id="media-url"
              className="px-6 py-3 pl-[46px] w-full h-max bg-transparent rounded-md border-neutral-600 border-solid border-[1px]"
            />
          </div>
          <div className="flex">
            <button className="py-2 px-9 mt-4 text-[14px] border-[2px] border-primary text-white bg-primary hover:opacity-80 duration-200 border-solid rounded-[4px]">
              Play Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
