import { usePlayerContext, useVolumeContext } from "../contexts";

const useVolume = () => {
  const { videoRef } = usePlayerContext();
  const { volume, setVolume, isMuted, setIsMuted } = useVolumeContext();

  const handleVolumeChange = (volume: number) => {
    const newVolume = Math.max(0, Math.min(volume, 100));
    setVolume(newVolume);
    setIsMuted(false);
    videoRef.current.volume = newVolume / 100;
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
    videoRef.current.muted = !isMuted;
  };

  const handleIncreaseVolume = (amount: number) => {
    const newVolume = Math.max(0, Math.min(volume + amount, 100));
    setVolume(newVolume);
    setIsMuted(false);
    videoRef.current.volume = newVolume / 100;
  };

  const handleDecreaseVolume = (amount: number) => {
    const newVolume = Math.max(0, Math.min(volume - amount, 100));
    setVolume(newVolume);
    setIsMuted(false);
    videoRef.current.volume = newVolume / 100;
  };

  return {
    handleVolumeChange,
    handleToggleMute,
    handleIncreaseVolume,
    handleDecreaseVolume,
  };
};

export default useVolume;
