import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
  const location = useLocation();

  const menu = [
    { name: "Inicio", path: "/", icon: "🏠" },
    { name: "Tabla", path: "/posiciones", icon: "📊" },
    { name: "Goleadores", path: "/goleadores", icon: "⚽" },
    { name: "Fixture", path: "/fixture", icon: "📅" },
    { name: "Tarjetas", path: "/tarjetas", icon: "🟥" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden">
      
      {/* FONDO BLUR */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg border-t border-white/10" />

      {/* CONTENIDO */}
      <div className="relative flex justify-around items-center py-2">

        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center text-xs transition-all"
            >
              {/* BOTÓN */}
              <div
                className={`
                  flex items-center justify-center
                  w-12 h-12 rounded-full transition-all duration-300
                  ${isActive
                    ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,255,255,0.8)] scale-110"
                    : "text-gray-400"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
              </div>

              {/* TEXTO */}
              <span
                className={`
                  mt-1 text-[10px]
                  ${isActive ? "text-cyan-400" : "text-gray-400"}
                `}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}