import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TablaPosiciones from "./pages/TablaPosiciones";
import TablaGoleadores from "./pages/TablaGoleadores";
import Fixture from "./pages/Fixture";
import Tarjetas from "./pages/Tarjetas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posiciones" element={<TablaPosiciones />} />
        <Route path="/goleadores" element={<TablaGoleadores />} />
        <Route path="/fixture" element={<Fixture />} />
        <Route path="/tarjetas" element={<Tarjetas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;