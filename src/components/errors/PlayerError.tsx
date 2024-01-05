import { FC } from "react";
import { usePlayer } from "../../hooks";

const PlayerError: FC = () => {
  const { handleBack } = usePlayer();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">Error while loading or playing this video :(</h1>
      <button
        onClick={handleBack}
        className="py-3 px-5 mt-4 text-[14px] text-white bg-primary rounded-[4px] capitalize"
      >
        Pick another video
      </button>
    </div>
  );
};

export default PlayerError;
