import { FC, useEffect } from "react";
import { VideoPicker } from "../components";
import { usePlayerContext } from "../contexts/PlayerContext";

const MainPage: FC = () => {
  const { setVideoFile } = usePlayerContext();
  useEffect(() => {
    setVideoFile(null);
  }, []);
  return (
    <div className="flex h-screen items-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="backdrop-blur-2xl border-[1px] border-solid border-neutral-800 bg-zinc-800/30 from-inherit px-2 py-2">
          <VideoPicker />
        </div>
      </div>
      <div className="w-[0.5px] h-full bg-gray-600" />
      <div className="flex-1 px-3 flex flex-col justify-center items-center"></div>
    </div>
  );
};

export default MainPage;
