import { usePlayerContext, useVolumeContext } from "../contexts";

const useVolume = () => {
  const { videoRef } = usePlayerContext();
  const { volume, setVolume, isMuted, setIsMuted } = useVolumeContext();

  const handleVolumeChange = (volume: number) => {
    const newVolume = Math.max(0, Math.min(volume, 100));
    setVolume(newVolume);
    if (newVolume == 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
    videoRef.current.volume = newVolume / 100;
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      videoRef.current.muted = !prev;
      if (prev && volume == 0) {
        handleVolumeChange(30);
      }
      return !prev;
    });
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
