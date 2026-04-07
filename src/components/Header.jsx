import { Link, useLocation } from "react-router-dom";
// import { Trophy, Table, Calendar, ShieldAlert, Home } from "lucide-react";

export default function Header() {
  const location = useLocation();

  const menu = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Tabla", path: "/tabla", icon: Table },
    { name: "Goleadores", path: "/goleadores", icon: Trophy },
    { name: "Fixture", path: "/fixture", icon: Calendar },
    { name: "Tarjetas", path: "/tarjetas", icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0f172a]/80 border-b border-cyan-500/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo / Título */}
        <h1 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wide">
          ⚽ MFC Estadísticas
        </h1>

        {/* Menú */}
        <nav className="hidden md:flex gap-4">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 
                  ${isActive 
                    ? "bg-cyan-500/20 text-cyan-300 shadow-md" 
                    : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                  }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Menú móvil */}
      <div className="md:hidden flex justify-around py-2 border-t border-cyan-500/20">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-xs transition 
                ${isActive ? "text-cyan-400" : "text-gray-400"}`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
