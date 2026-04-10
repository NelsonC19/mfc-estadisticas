import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Trophy,
  Users,
  Calendar,
  ShieldAlert,
} from "lucide-react";

export default function MobileNav() {
  const location = useLocation();
  const [activeWave, setActiveWave] = useState(null);

  const menu = [
    { name: "Tabla", path: "/posiciones", icon: Trophy },
    { name: "Goleadores", path: "/goleadores", icon: Users },
    { name: "Inicio", path: "/", icon: Home, center: true },
    { name: "Fixture", path: "/fixture", icon: Calendar },
    { name: "Tarjetas", path: "/tarjetas", icon: ShieldAlert },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 h-16">

      <div className="absolute inset-0 bg-[#0f172a] border-t border-cyan-500/20"></div>

      <div className="relative flex justify-around items-end py-2">

        {menu.map((item, i) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                setActiveWave(i);
                setTimeout(() => setActiveWave(null), 300);
              }}
              className={`relative flex flex-col items-center text-xs transition-all duration-300 ${
                isActive ? "text-cyan-400" : "text-gray-400"
              }`}
            >
              
              <Icon
                size={22}
                className={`transition-all duration-300 ${
                  isActive
                    ? "animate-bounceSoft scale-110 shadow-lg"
                    : ""
                }`}
              />

              <span className="mt-1">{item.name}</span>

              {activeWave === i && (
                <span className="absolute w-10 h-10 bg-cyan-400/30 rounded-full animate-ping"></span>
              )}
            </Link>
          );
        })}
      </div>

      <style>
        {`
          @keyframes bounceSoft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounceSoft {
            animation: bounceSoft 0.3s ease;
          }
        `}
      </style>
    </div>
  );
}