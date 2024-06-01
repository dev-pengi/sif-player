import { Routes, Route, useNavigate } from "react-router-dom";
import { MainPage, PlayerPage } from "./pages";
import { Theme } from "@radix-ui/themes";
import "react-contexify/dist/ReactContexify.css";
import "@radix-ui/themes/styles.css";
import { useAppSelector } from "./hooks";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
  return null;
};

function App() {
  const { primaryColor } = useAppSelector((state) => state.settings);
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Theme>
  );
}

export default App;
