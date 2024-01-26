import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import DragSelect from "dragselect";
import { throttle } from "lodash";

import { DirChain } from "..";
import { ActivityIndicator } from "../../spins";
import { explorerActions, playerActions } from "../../../store";
import DirCard from "../Dirs/DirCard";
import { useAppSelector } from "../../../hooks";
import { getDirInformation } from "../../../utils";
import DirContextMenu from "../Dirs/DirContextMenu";

const path = window.require("path") as typeof import("path");
const fs = window.require("fs") as typeof import("fs");

const FilesViewer: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyPressed, setKeyPressed] = useState("");

  const { primaryColor } = useAppSelector((state) => state.settings);

  const dirCardRefs = useRef([]);
  const explorerAreaRef = useRef(null);

  const [selectedDirs, setSelectedDirs] = useState<any[]>([]);

  const {
    currentDir,
    dirs,
    dirsChain,
    isLoadingFiles,
    currentDirData,
    isSearching,
  } = useAppSelector((state) => state.explorer);

  const handleDragSelectDirs = throttle((ds) => {
    const selectedIndexes = ds
      .getSelection()
      .map((el) => dirCardRefs.current.findIndex((ref) => ref.current === el));

    setSelectedDirs(selectedIndexes.map((index) => dirs[index]));
  }, 30);

  useEffect(() => {
    if (!explorerAreaRef?.current) return;
    let ds = new DragSelect({
      area: explorerAreaRef?.current,
      draggability: false,
      selectorClass: "ds-selector",
    });

    try {
      ds.addSelectables(dirCardRefs.current.map((ref) => ref.current));

      ds.subscribe("DS:end", (el) => {
        handleDragSelectDirs(ds);
      });
    } catch (error) {
      console.error(error);
    }

    return () => {
      if (ds) {
        ds.stop();
        ds.unsubscribe("DS:end");
        ds.unsubscribe("DS:select");
      }
    };
  }, [dirs]);

  useEffect(() => {
    document.title = `Sif Player | ${path.basename(currentDir)}`;
  }, [currentDir]);

  const fetchFiles = async (dir?: string) => {
    dir = path.join(dir || currentDir);
    dispatch(explorerActions.loading());
    const dirents = await fs.promises.readdir(currentDir, {
      withFileTypes: true,
    });

    const dirs_files: any[] = [];

    for (const dirent of dirents) {
      try {
        const file = await getDirInformation(
          path.resolve(currentDir, dirent.name)
        );
        dirs_files.push(file);
      } catch (error) {
        continue;
      }
    }

    const dirData = await getDirInformation(currentDir);
    dispatch(explorerActions.updateCurrentDirData(dirData));

    dirs_files.sort((a, b) => {
      if (a.dir !== b.dir) {
        return a.dir ? -1 : 1;
      }

      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    const chain: string[] = [];
    let isFinished = false;
    let currentChainDir = currentDir;

    while (!isFinished) {
      const baseName = path.basename(currentChainDir);
      if (baseName) {
        chain.push(path.basename(currentChainDir));
        currentChainDir = path.dirname(currentChainDir);
      } else {
        const root = path.parse(currentChainDir).root;
        chain.push(root);
        isFinished = true;
      }
    }

    dispatch(explorerActions.updateDirsChain(chain.reverse()));

    dispatch(explorerActions.updateDirs(dirs_files));

    dispatch(explorerActions.loaded());
  };

  useEffect(() => {
    fetchFiles(currentDir);
  }, [currentDir]);

  const handleNavigate = (dir: string) => {
    dispatch(explorerActions.updateCurrentDir(dir));
  };

  const handleBack = () => {
    dispatch(explorerActions.back());
  };

  const handlePlayFolder = async () => {
    dispatch(playerActions.updatePlaylist(currentDirData.videos));
    dispatch(playerActions.updateVideoIndex(0));
    navigate("/player?type=file");
  };

  useHotkeys("backspace", handleBack, { keyup: true });
  useHotkeys("f5", () => fetchFiles(), { keyup: true });
  useHotkeys(
    "ctrl+p",
    () => {
      if (selectedDirs.length > 0) {
        dispatch(
          playerActions.updatePlaylist(
            selectedDirs.filter((d) => !d.dir).map((d) => d.path)
          )
        );
        dispatch(playerActions.updateVideoIndex(0));
        navigate("/player?type=file");
      } else handlePlayFolder();
    },
    { keyup: true }
  );
  useHotkeys(
    "ctrl,shift",
    (key) => {
      if (key.key !== keyPressed) setKeyPressed(key.key);
    },
    { keydown: true }
  );

  useHotkeys(
    "ctrl,shift",
    (key) => {
      if (key.key === keyPressed) setKeyPressed("");
    },
    { keyup: true }
  );

  useHotkeys("ctrl+a", () => {
    if (selectedDirs.length === dirs.length) {
      setSelectedDirs([]);
      return;
    }
    setSelectedDirs(
      dirs.filter((d) => (isSearching && d.searchValid) || !isSearching)
    );
  });
  useHotkeys("esc", () => {
    setSelectedDirs([]);
  });

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (explorerAreaRef.current && scrollContainerRef.current) {
        explorerAreaRef.current.style.top = `${scrollContainerRef.current.scrollTop}px`;
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleDirNavigate = (dir: any, type: string = "playlist") => {
    if (dir.dir) {
      handleNavigate(dir.path);
    } else {
      if (type === "single") {
        dispatch(playerActions.updatePlaylist([dir.path]));
        dispatch(playerActions.updateVideoIndex(0));
      } else if (type === "playlist") {
        const allVideos =
          dirs.filter((d) => !d.dir)?.map((video) => video.path) ?? [];

        const clickedVideoIndex = allVideos.findIndex(
          (video) => video === dir.path
        );

        dispatch(playerActions.updatePlaylist(allVideos));
        dispatch(playerActions.updateVideoIndex(clickedVideoIndex));
      }
      navigate(`/player?type=file`);
    }
  };
  const handleDirSelect = (dir) => {
    if (keyPressed === "") {
      if (
        selectedDirs.length === 0 ||
        (selectedDirs.length === 1 && selectedDirs[0]?.path === dir?.path)
      ) {
        handleDirNavigate(dir);
      }
    } else if (keyPressed === "" && selectedDirs.length > 1) {
      setSelectedDirs([]);
    }
  };

  return (
    <>
      <div className="relative w-full h-full px-1.5 py-3">
        <>
          <div
            className="h-full w-full overflow-y-auto min-scrollbar relative"
            ref={scrollContainerRef}
          >
            <DirContextMenu
              selectedDirs={[currentDirData]}
              loading={!currentDirData}
              innerMenu
            >
              <div>
                <div
                  ref={explorerAreaRef}
                  onMouseDown={(e) => {
                    setSelectedDirs([]);
                  }}
                  className="min-h-full w-full grid grid-cols-dir gap-3 top-0 left-0 absolute"
                />
              </div>
            </DirContextMenu>
            <div className="w-max px-3 flex items-center relative">
              <DirChain
                dirsChain={dirsChain}
                onClick={(_, index) => {
                  let newPath = path.join(...dirsChain.slice(0, index + 1));
                  handleNavigate(newPath);
                }}
              />
            </div>
            <div className="mt-4 w-full h-max flex">
              {isLoadingFiles ? (
                <div className="flex items-center justify-center mt-[120px] w-full">
                  <ActivityIndicator />
                </div>
              ) : (
                <>
                  {dirs.length === 0 ? (
                    <div className="flex items-center justify-center mt-[120px] w-full">
                      <p className="text-white/50">No videos found</p>
                    </div>
                  ) : (
                    <div className="w-full grid grid-cols-dir gap-3 px-3">
                      {dirs.map((dir, index) => {
                        if (index === 0) dirCardRefs.current = [];
                        dirCardRefs.current[index] = React.createRef();
                        return (
                          <>
                            <div
                              key={dir.path}
                              ref={dirCardRefs.current[index]}
                              style={{
                                display:
                                  (isSearching && dir.searchValid) ||
                                  !isSearching
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <DirCard
                                isSelected={selectedDirs
                                  .map((d) => d?.path)
                                  .includes(dir.path)}
                                onSelected={handleDirSelect}
                                selectedDirs={selectedDirs}
                                dir={dir}
                                handleNavigate={handleDirNavigate}
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      </div>
      <style>{`
        .ds-selector {
          border: 1px solid ${primaryColor} !important;
          background-color: ${primaryColor}20 !important;
        }
        .ds-selected div {
          background-color: #ffffff21 !important;
        }
      `}</style>
    </>
  );
};

export default FilesViewer;
