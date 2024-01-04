import { Routes, Route } from "react-router-dom";
import { MainPage, PlayerPage } from "./pages";
import { Theme } from "@radix-ui/themes";
import "react-contexify/dist/ReactContexify.css";
import "@radix-ui/themes/styles.css";
import { useSetup } from "./hooks";

function App() {
  useSetup();
  return (
    <Theme>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/player" element={<PlayerPage />} />
      </Routes>
    </Theme>
  );
}

export default App;
