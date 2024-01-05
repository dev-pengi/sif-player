import { Routes, Route } from "react-router-dom";
import { MainPage, PlayerPage } from "./pages";
import { Theme } from "@radix-ui/themes";
import "react-contexify/dist/ReactContexify.css";
import "@radix-ui/themes/styles.css";
import { useSetup } from "./hooks";
import { useSettingsContext } from "./contexts";

function App() {
  const { primaryColor } = useSettingsContext();
  useSetup();
  return (
    <Theme>
      <style>
        {`
          ::selection {
            background: ${primaryColor} !important;
          }
          ::-moz-selection {
            background: ${primaryColor} !important;
          }
        `}
      </style>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/player" element={<PlayerPage />} />
      </Routes>
    </Theme>
  );
}

export default App;
