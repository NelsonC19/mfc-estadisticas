import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import FloatingSponsors from "./components/FloatingSponsors";

import Home from "./pages/Home";
import TablaPosiciones from "./pages/TablaPosiciones";
import TablaGoleadores from "./pages/TablaGoleadores";
import Fixture from "./pages/Fixture";
import Tarjetas from "./pages/Tarjetas";

function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* 🔥 CONTENIDO CON ANIMACIÓN */}
      <div className="pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posiciones" element={<TablaPosiciones />} />
          <Route path="/goleadores" element={<TablaGoleadores />} />
          <Route path="/fixture" element={<Fixture />} />
          <Route path="/tarjetas" element={<Tarjetas />} />
        </Routes>
      </div>

      <FloatingSponsors />
      <MobileNav />
    </BrowserRouter>
  );
}

export default App;