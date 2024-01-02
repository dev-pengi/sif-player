import { FC } from "react";
import Button from "./Button";
import { CheckIcon, PlaybackSpeedIcon } from "../../../assets";
import { Item, Menu, useContextMenu } from "react-contexify";
import { usePlayerContext } from "../../../contexts/PlayerContext";
const MENU_ID = "playback-speed-menu";

const PlayBackSpeed: FC = () => {
  const { currentSpeed, handlePlaybackSpeedUpdate } = usePlayerContext();
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleOpenMenu(e: React.MouseEvent) {
    show({
      event: e,
    });
  }

  const SPEEDS = new Array(9).fill(0, 1, 9);

  return (
    <>
      <Button onClick={handleOpenMenu}>
        <div className="absolute text-[22px] left-0 right-0 top-0 bottom-0 h-max w-max m-auto">
          <PlaybackSpeedIcon />
        </div>
      </Button>
      <Menu animation={false} id={MENU_ID} className="b-[200px]">
        {SPEEDS.map((_s, index) => {
          const speed = index * 0.25;
          return (
            <Item
              closeOnClick={false}
              onClick={() => handlePlaybackSpeedUpdate(speed)}
              key={`pb-speed-${index}`}
            >
              <div className="text-[22px] w-[22px] h-[22px]">
                {speed === currentSpeed && <CheckIcon />}
              </div>
              <p className="ml-3">{speed === 1 ? "Normal" : speed}</p>
            </Item>
          );
        })}
      </Menu>
    </>
  );
};

export default PlayBackSpeed;
