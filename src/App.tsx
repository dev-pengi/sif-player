import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, PlayerPage } from "./pages";
import { PlayerContextProvider } from "./contexts/PlayerContext";
import "react-contexify/dist/ReactContexify.css";

function App() {
  return (
    <BrowserRouter>
      <PlayerContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </PlayerContextProvider>
    </BrowserRouter>
  );
}

export default App;
