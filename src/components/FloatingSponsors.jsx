import { useEffect, useState } from "react";

export default function FloatingSponsors() {
  const sponsors = [
    {
      img: "/sponsor-1.png",
      url: "https://www.instagram.com/vimaluhacienda",
    },
    {
      img: "/sponsor-2.png",
      url: "https://crconsult.pe/",
    },
    {
      img: "/sponsor-3.png",
      url: "https://wa.me/51987278281",
    },
  ];

  const [index, setIndex] = useState(0);
  const [showWave, setShowWave] = useState(false);
  const [visible, setVisible] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false); // 👈 nuevo

  // 🔁 Cambio de sponsor
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🌊 Onda sincronizada
  useEffect(() => {
    setShowWave(true);

    const timeout = setTimeout(() => {
      setShowWave(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [index]);

  // 🚫 Evitar rebote al inicio
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartAnimation(true);
    }, 500); // delay inicial

    return () => clearTimeout(timeout);
  }, []);

  // ❌ Si está cerrado, no renderiza nada
  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60]">
      
      {/* BOTÓN CERRAR */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setVisible(false);
        }}
        className="absolute -top-12 md:-top-13 left-1/2 
        translate-x-[120%] md:translate-x-[160%] 
        z-30 w-5 h-5 flex items-center justify-center 
        rounded-full bg-black text-white text-[10px] shadow-md 
        hover:scale-110 transition"
      >
        ✕
      </button>

      {/* TEXTO */}
      <span
        className="absolute -top-6 md:-top-7 left-1/2 -translate-x-1/2 z-20 text-xs font-bold text-cyan-400 whitespace-nowrap"
        style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
      >
        Auspiciadores
      </span>

      {/* LINK */}
      <a
        href={sponsors[index].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative flex items-center justify-center">

          {/* ONDAS */}
          {showWave && (
            <>
              <span className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full animate-wave1 z-0"></span>
              <span className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full animate-wave2 z-0"></span>
            </>
          )}

          {/* BOTÓN */}
          <div
            className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden 
            border-2 border-cyan-400 shadow-xl flex items-center justify-center 
            ${startAnimation ? "animate-bounceSoft" : ""}`}
            style={{ backgroundColor: "#182A69" }}
          >
            <img
              key={index}
              src={sponsors[index].img}
              alt="sponsor"
              className="w-full h-full object-contain p-2 animate-fade"
            />
          </div>
        </div>
      </a>

      <style>
        {`
          @keyframes bounceSoft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }

          .animate-bounceSoft {
            animation: bounceSoft 2s infinite;
          }

          @keyframes fade {
            from { opacity: 0.3; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          .animate-fade {
            animation: fade 0.4s ease-in-out;
          }

          @keyframes wave {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            100% {
              transform: scale(1.4);
              opacity: 0;
            }
          }

          .animate-wave1,
          .animate-wave2 {
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.6);
            background: transparent;
            animation: wave 3s ease-out forwards;
          }

          .animate-wave2 {
            animation-delay: 1.5s;
          }
        `}
      </style>
    </div>
  );
}