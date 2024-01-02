import { FC } from "react";
import { BottomController, CenterController, TopController } from "./Sections";

const MainController: FC = () => {
  return (
    <>
      <div className="fixed w-screen h-screen flex flex-col z-1">
        <div className="fixed z-0 top-0 left-0 w-full h-[150px] top-shadow"></div>
        <div className="fixed z-0 bottom-0 left-0 w-full h-[150px] bottom-shadow"></div>
        <TopController />
        <CenterController />
        <BottomController />
      </div>
    </>
  );
};

export default MainController;
