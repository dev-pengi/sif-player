import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, PlayerPage } from "./contexts/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/player" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
