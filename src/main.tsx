import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { PlayerContextProvider } from "./contexts/PlayerContext.tsx";
import { SettingsContextProvider } from "./contexts/SettingsContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <BrowserRouter>
    <PlayerContextProvider>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </PlayerContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
