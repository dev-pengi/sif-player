import React, { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PlayerContextProvider, SettingsContextProvider } from "./contexts";
import App from "./App.tsx";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerContextProvider>
        <Provider store={store}>
          <SettingsContextProvider>
            <App />
          </SettingsContextProvider>
        </Provider>
      </PlayerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
