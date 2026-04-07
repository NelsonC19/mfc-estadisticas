import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
  const location = useLocation();

  const items = [
    { path: "/", label: "Inicio", icon: "🏠" },
    { path: "/posiciones", label: "Tabla", icon: "📊" },
    { path: "/goleadores", label: "Goles", icon: "⚽" },
    { path: "/fixture", label: "Fixture", icon: "📅" },
    { path: "/tarjetas", label: "Tarjetas", icon: "🟥" },
  ];

  return (
    <div className="
      fixed bottom-0 left-0 w-full z-50
      md:hidden
    ">
      {/* Fondo glass */}
      <div className="
        mx-2 mb-2
        rounded-2xl
        bg-[#0f1f4b]/80
        backdrop-blur-lg
        border border-white/10
        shadow-[0_0_20px_rgba(0,255,255,0.3)]
      ">
        <div className="flex justify-around items-center py-2">

          {items.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center justify-center
                  text-[10px] w-full py-1
                  transition duration-300
                  ${isActive ? "text-cyan-400 scale-110" : "text-white/70"}
                `}
              >
                <span className={`
                  text-lg mb-1
                  ${isActive ? "drop-shadow-[0_0_6px_cyan]" : ""}
                `}>
                  {item.icon}
                </span>

                {item.label}
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
}
