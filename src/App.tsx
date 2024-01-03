import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, PlayerPage } from "./pages";
import { PlayerContextProvider } from "./contexts/PlayerContext";
import { Theme } from "@radix-ui/themes";
import "react-contexify/dist/ReactContexify.css";
import "@radix-ui/themes/styles.css";


function App() {
  return (
    <BrowserRouter>
      <PlayerContextProvider>
        <Theme>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/player" element={<PlayerPage />} />
          </Routes>
        </Theme>
      </PlayerContextProvider>
    </BrowserRouter>
  );
}

export default App;
