import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  PlayerContextProvider,
  TimerContextProvider,
  ControlsContextProvider,
  LoaderContextProvider,
  SettingsContextProvider,
  VolumeContextProvider,
} from "./contexts";
import { BrowserRouter } from "react-router-dom";

const ContextWrapper: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <PlayerContextProvider>
      <SettingsContextProvider>
        <ControlsContextProvider>
          <TimerContextProvider>
            <VolumeContextProvider>
              <LoaderContextProvider>{children}</LoaderContextProvider>
            </VolumeContextProvider>
          </TimerContextProvider>
        </ControlsContextProvider>
      </SettingsContextProvider>
    </PlayerContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
