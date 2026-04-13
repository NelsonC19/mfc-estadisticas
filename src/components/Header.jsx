import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Home,
  Trophy,
  Users,
  Calendar,
  ShieldAlert,
} from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);

  const menu = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Tabla", path: "/posiciones", icon: Trophy },
    { name: "Goleadores", path: "/goleadores", icon: Users },
    { name: "Fixture", path: "/fixture", icon: Calendar },
    { name: "Tarjetas", path: "/tarjetas", icon: ShieldAlert },
  ];

  {/*// 🔥 Scroll efecto reducir el header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);*/}

  // 🔥 Indicador activo
  useEffect(() => {
    const activeIndex = menu.findIndex(
      (item) => item.path === location.pathname
    );

    if (navRef.current && activeIndex !== -1) {
      const el = navRef.current.querySelectorAll("a")[activeIndex];
      if (el) {
        setIndicatorStyle({
          width: el.offsetWidth + "px",
          transform: `translateX(${el.offsetLeft}px)`,
        });
      }
    }
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-3">
      <div className="w-full max-w-6xl px-4 flex items-center justify-between">
        
        {/* 🔥 LOGO CON LINK */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="MFC Logo"
            className={`object-contain transition-all duration-300 cursor-pointer
              ${scrolled ? "w-10 h-10" : "w-12 h-12"}
              group-hover:scale-105`}
            onError={(e) => (e.target.style.display = "none")}
          />

          {/* OPCIONAL: nombre del club 
          <span className="hidden sm:block text-gray-300 text-sm tracking-wide group-hover:text-cyan-300 transition">
            MFC
          </span>*/}
        </Link>

        {/* 🔥 NAV */}
        <nav
          ref={navRef}
          className="hidden md:flex gap-1 relative bg-[#0f172a]/80 px-3 py-2 rounded-2xl backdrop-blur-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          {/* INDICADOR */}
          <span
            className="absolute bottom-0 left-0 h-[2px] bg-cyan-400 rounded-full transition-all duration-300"
            style={indicatorStyle}
          />

          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? "text-cyan-300"
                      : "text-gray-400 hover:text-cyan-400"
                  }
                  ${scrolled ? "text-xs" : "text-sm"}
                `}
              >
                <Icon
                  size={scrolled ? 16 : 18}
                  className={`transition-all duration-300 ${
                    isActive ? "scale-110 drop-shadow-[0_0_6px_#22d3ee]" : ""
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}