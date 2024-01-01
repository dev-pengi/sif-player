import { FC } from "react";
import { BottomController, CenterController, TopController } from "./Sections";

const MainController: FC = () => {
  return (
    <div className="absolute w-screen h-screen flex flex-col">
      <TopController />
      <CenterController />
      <BottomController />
    </div>
  );
};

export default MainController;
