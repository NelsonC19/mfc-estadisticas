import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const menu = [
    { name: "Inicio", path: "/", icon: "🏠" },
    { name: "Tabla", path: "/posiciones", icon: "📊" },
    { name: "Goleadores", path: "/goleadores", icon: "⚽" },
    { name: "Fixture", path: "/fixture", icon: "📅" },
    { name: "Tarjetas", path: "/tarjetas", icon: "🟥" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/80 border-b border-cyan-500/20 shadow-lg">
      
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wide">
          ⚽ MFC Estadísticas
        </h1>

        {/* SOLO DESKTOP */}
        <nav className="hidden md:flex gap-4">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 
                  ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 shadow-md"
                      : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                  }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

    </header>
  );
}