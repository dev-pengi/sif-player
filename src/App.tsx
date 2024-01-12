import { Routes, Route } from "react-router-dom";
import { MainPage, PlayerPage } from "./pages";
import { Theme } from "@radix-ui/themes";
import "react-contexify/dist/ReactContexify.css";
import "@radix-ui/themes/styles.css";
import { useAppSelector, useSetup } from "./hooks";

function App() {
  const { primaryColor } = useAppSelector((state) => state.settings);
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
