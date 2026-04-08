import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Trophy,
  Users,
  Calendar,
  ShieldAlert,
} from "lucide-react";

export default function Header() {
  const location = useLocation();

  const menu = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Tabla", path: "/posiciones", icon: Trophy },
    { name: "Goleadores", path: "/goleadores", icon: Users },
    { name: "Fixture", path: "/fixture", icon: Calendar },
    { name: "Tarjetas", path: "/tarjetas", icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-cyan-500/10">

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* 🔥 LOGO + NOMBRE */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png" // 👉 asegúrate que esté en /public/logo.png
            alt="MFC Logo"
            className="w-15 h-15 object-contain"
            onError={(e) => (e.target.style.display = "none")}
          />

          <h1 className="text-sm md:text-base font-medium text-gray-300 tracking-wide">
            MADRUGADORES FC
          </h1>
        </div>

        {/* 🔥 MENÚ DESKTOP */}
        <nav className="hidden md:flex gap-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 
                  ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 shadow-sm"
                      : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                  }`}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}