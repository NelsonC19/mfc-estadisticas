// src/components/MobileNav.jsx
import { Link, useLocation } from "react-router-dom";
import { Table, Trophy, CalendarDays, CreditCard } from "lucide-react";

export default function MobileNav() {
  const location = useLocation();

  const items = [
    { name: "Tabla", icon: Table, path: "/tabla" },
    { name: "Goleadores", icon: Trophy, path: "/goleadores" },
    { name: "Fixture", icon: CalendarDays, path: "/fixture" },
    { name: "Tarjetas", icon: CreditCard, path: "/tarjetas" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <div className="flex items-center gap-2 bg-[#182a69]/90 backdrop-blur-lg px-3 py-2 rounded-2xl shadow-xl border border-white/10">
        
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-300
              ${isActive 
                ? "bg-[#00ffff] text-[#182a69] scale-105" 
                : "text-white hover:bg-white/10"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] mt-1">{item.name}</span>
            </Link>
          );
        })}
        
      </div>
    </div>
  );
}
