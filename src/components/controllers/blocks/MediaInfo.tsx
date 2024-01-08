import { FC } from "react";
import { usePlayerContext } from "../../../contexts";
import { Separator } from "./Settings";

const MediaInfo: FC = () => {
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 bytes";

    const k = 1024;
    const sizes = ["", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
    );
  }

  const { mediaData } = usePlayerContext();
  const mediaName = mediaData?.name ?? "Untitled Media";
  const mediaType = mediaData?.type ?? "Unspecified Type";
  const mediaSize = mediaData?.size ?? "Unspecified Size";
  const mediaResolution = mediaData?.resolution ?? "Unspecified Resolution";
  return (
    <>
      <div className="flex items-start py-2">
        <h3 className="opacity-95">Name:</h3>
        <p className="ml-6 opacity-80 max-w-[90%] truncate">{mediaName}</p>
      </div>
      <div className="flex items-center py-2">
        <h3 className="opacity-95">Type:</h3>
        <p className="ml-6 opacity-80">{mediaType}</p>
      </div>
      <Separator />
      <div className="flex items-center py-2">
        <h3 className="opacity-95">Size:</h3>
        <p className="ml-6 opacity-80">
          {formatBytes(mediaSize)} ({mediaSize} bytes)
        </p>
      </div>
      <div className="flex items-center py-2">
        <h3 className="opacity-95">Resolution:</h3>
        <p className="ml-6 opacity-80">{mediaResolution}p</p>
      </div>
    </>
  );
};

export default MediaInfo;
