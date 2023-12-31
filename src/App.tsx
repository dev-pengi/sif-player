import { useEffect, useState, useRef } from "react";
import { VideoPicker } from "./components";
import { usePlayerContext } from "./contexts/PlayerContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, PlayerPage } from "./pages";
import MorphTest from "./components/PlayButton/Toggle";

function App() {
  const { videoFile } = usePlayerContext();
  const [videoBlobUrl, setVideoBlobUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/player" element={<PlayerPage />} />
        {/* <Route path="/morph" element={<MorphTest />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
