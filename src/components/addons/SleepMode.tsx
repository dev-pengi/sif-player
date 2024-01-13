import { FC, useEffect, useState } from "react";
import { useAppSelector, usePlayer } from "../../hooks";
import { Modal } from "../modals";
import { findLabel, formatTime } from "../../utils";
import { settings } from "../../constants";

const SleepMode: FC = () => {
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
  const [LeftTime, setLeftTime] = useState(60);

  const { sleepMode, sleepModeDelay, sleepModeBehavior } = useAppSelector(
    (state) => state.settings
  );

  const { lastActivityTime } = useAppSelector((state) => state.controls);
  const {
    handlePause,
    handleBack,
    handleAddControllerDependencies,
    handleRemoveControllerDependencies,
  } = usePlayer();

  const sleepAction = () => {
    switch (sleepModeBehavior) {
      case "pause":
        return () => {
          handlePause();
        };
      case "quit":
        return () => {
          handleBack();
        };
      case "close":
        return () => {
          window.close();
        };
    }
  };
  const sleep = sleepAction();

  const handleSleepAlert = () => {
    setIsSleepModalOpen(true);
    handleAddControllerDependencies("sleep-modal");
  };
  const handleSleepCancel = () => {
    setIsSleepModalOpen(false);
    handleRemoveControllerDependencies("sleep-modal");
  };

  useEffect(() => {
    if (!sleepMode || !lastActivityTime) return;
    const timeoutDuration =
      lastActivityTime + sleepModeDelay * 1000 * 60 - Date.now();
    console.log(timeoutDuration);
    let timeUpdateInterval = null;
    let timeFinishTimeout = null;
    if (timeoutDuration <= 0 || timeoutDuration > 60000) {
      handleSleepCancel();
    }
    const sleepTimeout = setTimeout(() => {
      setLeftTime(60);
      handleSleepAlert();
      timeUpdateInterval = setInterval(() => {
        setLeftTime((prev) => prev - 1);
      }, 1000);
      timeFinishTimeout = setTimeout(() => {
        handleSleepCancel();
        sleep();
      }, 60000);
    }, timeoutDuration - 60000);

    return () => {
      clearTimeout(sleepTimeout);
      clearTimeout(timeFinishTimeout);
      clearInterval(timeUpdateInterval);
      setLeftTime(60);
    };
  }, [sleepMode, lastActivityTime, sleepModeDelay]);

  return (
    <>
      <Modal
        isOpen={isSleepModalOpen && sleepMode}
        onClose={handleSleepCancel}
        style={{
          box: { maxWidth: "500px" },
          content: {
            height: "max-content",
            minHeight: 0,
          },
        }}
        title="Sleep Alert"
      >
        <>
          <div className="w-full flex flex-col items-center justify-center">
            <p>
              Your {findLabel(settings.sleepModeDelay, sleepModeDelay)} sleep
              countdown is Almost Up!
            </p>
            <h2 className="mx-2 text-[60px]">{formatTime(LeftTime)}</h2>
            <p className="text-[14px] opacity-75 mt-2">
              NOTE: you can interact with the app to cancel the sleep mode
            </p>
          </div>
        </>
      </Modal>
    </>
  );
};

export default SleepMode;
