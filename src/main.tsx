import React, { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  PlayerContextProvider,
  LoaderContextProvider,
  SettingsContextProvider,
} from "./contexts";
import App from "./App.tsx";
import { store } from "./store";

const ContextWrapper: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <SettingsContextProvider>
      <LoaderContextProvider>{children}</LoaderContextProvider>
    </SettingsContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ContextWrapper>
          <PlayerContextProvider>
            <App />
          </PlayerContextProvider>
        </ContextWrapper>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
