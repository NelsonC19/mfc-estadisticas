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

  // 🔥 Scroll
  {/*  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); */}

  // 🔥 Indicador FIX REAL
  useEffect(() => {
    const activeIndex = menu.findIndex(
      (item) => item.path === location.pathname
    );

    if (navRef.current && activeIndex !== -1) {
      const el = navRef.current.querySelectorAll("a")[activeIndex]; // ✅ SOLO LINKS
      if (el) {
        setIndicatorStyle({
          width: el.offsetWidth + "px",
          transform: `translateX(${el.offsetLeft}px)`,
        });
      }
    }
  }, [location.pathname]);

  return (
     <header className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/95 backdrop-blur-xl border-b border-cyan-500/10">
      
      {/*<header
     className={`sticky top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#0f172a]/95 backdrop-blur-xl shadow-md"
            : "bg-[#0f172a]/80 backdrop-blur-md"
        }
        border-b border-cyan-500/10`} 
    >*/}
      
      <div
        className={`max-w-6xl mx-auto px-4 flex items-center justify-between transition-all duration-300
        ${scrolled ? "py-1.5" : "py-2"}  /* 🔥 MÁS BAJO */`}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="MFC Logo"
            className={`object-contain transition-all duration-300
              ${scrolled ? "w-8 h-8" : "w-10 h-10"}`}
            onError={(e) => (e.target.style.display = "none")}
          />

          <h1 className="!font-medium !text-gray-300 !tracking-wide !text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
          >          
            MADRUGADORES FC
          </h1>
        </div>

        {/* NAV */}
        <nav
          ref={navRef}
          className="hidden md:flex gap-1 relative bg-white/5 px-2 py-1 rounded-xl backdrop-blur-lg"
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