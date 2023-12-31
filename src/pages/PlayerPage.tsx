import { FC, useEffect } from "react";
import { Player } from "../components";
import { usePlayerContext } from "../contexts/PlayerContext";

const PlayerPage: FC = () => {
  const { setVideoFile } = usePlayerContext();
  useEffect(() => {
    setVideoFile(null);
  }, []);
  return <Player />;
};

export default PlayerPage;