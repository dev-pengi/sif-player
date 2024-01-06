import { usePlayerContext, useTimerContext } from "../contexts";

const useTimer = () => {
  const { videoRef, mediaData } = usePlayerContext();
  const { duration, currentTime, setCurrentTime, setTimePercentage } =
    useTimerContext();

  const handleCalculateTimePercentage = (time: number) => {
    if (!duration) return setTimePercentage(0);
    const percentage = time / duration;
    setTimePercentage(percentage);
  };
  const handleStoreTime = (time: number) => {
    let data = [];
    const videoName = mediaData?.name || null;
    const videoUrl = mediaData?.url || null;
    if (!videoUrl && !videoName) return;

    const storedData = localStorage.getItem("data");
    data = JSON.parse(storedData);

    if (data) {
      const findVideo = data.find(
        (video: any) => video.url === videoUrl || video.name === videoName
      );

      const updateData = [
        ...data.filter((video: any) => {
          if (video.url !== videoUrl) return true;
          if (video.name !== videoName) return true;
        }),
        {
          ...findVideo,
          url: videoUrl,
          name: videoName,
          time,
        },
      ];
      localStorage.setItem("data", JSON.stringify(updateData));
    } else {
      localStorage.setItem(
        "data",
        JSON.stringify([
          {
            url: videoUrl,
            name: videoName,
            time,
          },
        ])
      );
    }
  };

  const handleSeek = (time: number) => {
    const clampedTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(clampedTime);
    videoRef.current.currentTime = clampedTime;
    handleCalculateTimePercentage(time);
    handleStoreTime(time);
  };

  const handleSkipForward = (amount: number) => {
    const newTime = Math.max(0, Math.min(currentTime + amount, duration));
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
    handleCalculateTimePercentage(newTime);
    handleStoreTime(newTime);
  };

  const handleSkipBackward = (amount: number) => {
    const newTime = Math.max(0, Math.min(currentTime - amount, duration));
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
    handleCalculateTimePercentage(newTime);
    handleStoreTime(newTime);
  };

  const handleTimeUpdate = () => {
    const time = videoRef.current.currentTime;
    setCurrentTime(time);
    handleCalculateTimePercentage(time);
    handleStoreTime(time);
  };

  return {
    handleSeek,
    handleSkipForward,
    handleSkipBackward,
    handleTimeUpdate,
  };
};

export default useTimer;
