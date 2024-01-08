import { FC } from "react";
import { usePlayerContext } from "../../../contexts";
import { Separator } from "./Settings";

const MediaInfo: FC = () => {
  const convertSize = (size: number): string => {
    size;
    return "1.3GB";
  };
  const { mediaData } = usePlayerContext();
  console.log(mediaData);
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
          {convertSize(mediaSize)} ({mediaSize} bytes)
        </p>
      </div>
      <div className="flex items-center py-2">
        <h3 className="opacity-95">Resolution:</h3>
        <p className="ml-6 opacity-80">{mediaResolution}</p>
      </div>
    </>
  );
};

export default MediaInfo;
