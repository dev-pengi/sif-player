import { useStore } from ".";
import {
  usePlayerContext,
  useSettingsContext,
  useVolumeContext,
} from "../contexts";

const useVolume = () => {
  const { videoRef } = usePlayerContext();
  const { volume, setVolume, setIsMuted } = useVolumeContext();
  const { saveAdjustments } = useSettingsContext();
  const { handleStoreData } = useStore();

  const handleVolumeChange = (volume: number) => {
    if (!videoRef?.current) return;
    const newVolume = Math.max(0, Math.min(volume, 100));
    setVolume(newVolume);
    if (newVolume == 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
      saveAdjustments && handleStoreData({
        volume: newVolume,
        muted: true,
      });
    } else {
      setIsMuted(false);
      videoRef.current.muted = false;
      saveAdjustments && handleStoreData({
        volume: newVolume,
        muted: false,
      });
    }
    videoRef.current.volume = newVolume / 100;
  };

  const handleToggleMute = () => {
    if (!videoRef?.current) return;
    setIsMuted((prev) => {
      videoRef.current.muted = !prev;
      if (prev && volume == 0) {
        handleVolumeChange(30);
      }
      saveAdjustments && handleStoreData({
        muted: !prev,
      });
      return !prev;
    });
  };

  const handleIncreaseVolume = (amount: number) => {
    handleVolumeChange(volume + amount);
  };

  const handleDecreaseVolume = (amount: number) => {
    handleVolumeChange(volume - amount);
  };

  return {
    handleVolumeChange,
    handleToggleMute,
    handleIncreaseVolume,
    handleDecreaseVolume,
  };
};

export default useVolume;
