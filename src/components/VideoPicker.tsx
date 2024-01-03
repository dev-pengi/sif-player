import { FC, useRef, RefObject, useState, useEffect } from "react";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useNavigate } from "react-router-dom";
import { extractUUIDFromBlobUrl } from "../utils";

interface VideoPickerProps {
  handleLoadStart: () => void;
}
const VideoPicker: FC<VideoPickerProps> = ({ handleLoadStart }) => {
  const navigate = useNavigate();
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null);
  const [isDragOver, setDragOver] = useState(false);
  const { videoFile, setVideoFile, setMediaData } = usePlayerContext();

  useEffect(() => {
    if (videoFile) {
      const reader = new FileReader();

      reader.onloadstart = () => {};

      reader.onload = (event) => {
        console.log(event.target.result);
        const blob = new Blob([event.target.result], { type: "video/mp4" });
        console.log(blob);
        const blobUrl = URL.createObjectURL(blob);
        console.log(blobUrl);
        const extractedID = extractUUIDFromBlobUrl(blobUrl);
        navigate(`/player?src=${extractedID}&type=local`);
      };

      reader.readAsArrayBuffer(videoFile);
      handleLoadStart();
    } else {
      navigate("/");
    }
  }, [videoFile]);

  const handleFileInputChange = () => {
    const selectedFiles = fileInputRef.current?.files;
    if (selectedFiles) {
      handleSelectedFiles(selectedFiles);
    }
  };

  const handleSelectedFiles = async (files: FileList) => {
    const fileData = files[0];
    setMediaData(fileData);
    setVideoFile(fileData);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleSelectedFiles(files);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed  ${
        isDragOver ? "border-primary text-primary" : "border-neutral-600"
      } duration-100 capitalize w-max px-16 py-9 rounded-lg flex items-center justify-center flex-col`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <FontAwesomeIcon
        icon={faCloudArrowUp}
        className={`text-[40px] text-neutral-400 ${
          isDragOver ? "text-primary" : "text-neutral-400"
        }`}
      />
      <h3 className="mt-2 capitalize">
        {isDragOver ? "Release File" : "Drag & Drop Video here"}
      </h3>
      <span className="text-[12px] mt-4">or</span>
      <button
        onClick={handleFileInputClick}
        className="py-2 px-9 mt-4 text-[14px] text-primary border-[2px] border-primary hover:text-white hover:bg-primary duration-200 border-solid rounded-[4px]"
      >
        Browse Files
      </button>
      <input
        type="file"
        accept="video/*,.mkv"
        style={{
          display: "none",
        }}
        onChange={handleFileInputChange}
        ref={fileInputRef}
      />
    </div>
  );
};

export default VideoPicker;
