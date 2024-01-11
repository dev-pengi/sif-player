import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  PlayerContextProvider,
  ControlsContextProvider,
  LoaderContextProvider,
  SettingsContextProvider,
  VolumeContextProvider,
} from "./contexts";
import { BrowserRouter } from "react-router-dom";
import { store } from ".//store";
import { Provider } from "react-redux";

const ContextWrapper: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <PlayerContextProvider>
      <SettingsContextProvider>
        <ControlsContextProvider>
            <VolumeContextProvider>
              <LoaderContextProvider>{children}</LoaderContextProvider>
            </VolumeContextProvider>
        </ControlsContextProvider>
      </SettingsContextProvider>
    </PlayerContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ContextWrapper>
          <App />
        </ContextWrapper>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
