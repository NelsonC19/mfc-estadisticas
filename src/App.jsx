import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TablaPosiciones from "./pages/TablaPosiciones";
import TablaGoleadores from "./pages/TablaGoleadores";
import Fixture from "./pages/Fixture";
import Tarjetas from "./pages/Tarjetas";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";

function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* CONTENIDO */}
      <div className="pb-20"> {/* 👈 espacio para que no tape el menú */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posiciones" element={<TablaPosiciones />} />
          <Route path="/goleadores" element={<TablaGoleadores />} />
          <Route path="/fixture" element={<Fixture />} />
          <Route path="/tarjetas" element={<Tarjetas />} />
        </Routes>
      </div>

      {/* NAVBAR MOBILE */}
      <MobileNav />
    </BrowserRouter>
  );
}

export default App;