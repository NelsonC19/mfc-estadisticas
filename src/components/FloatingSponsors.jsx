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

  // 🔁 Cambio de sponsor MÁS LENTO
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sponsors.length);
    }, 5000); // 👈 MÁS TIEMPO

    return () => clearInterval(interval);
  }, []);

  // 🌊 Onda sincronizada
  useEffect(() => {
    setShowWave(true);

    const timeout = setTimeout(() => {
      setShowWave(false);
    }, 3000); // 👈 duración de onda

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <a
      href={sponsors[index].url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60]"
    >
      {/* TEXTO */}
      <span
        className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-[10px] font-bold text-cyan-400 whitespace-nowrap"
        style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
      >
        Auspiciadores
      </span>

      <div className="relative flex items-center justify-center">

        {/* ONDAS */}
        {showWave && (
          <>
            <span className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full animate-wave1 z-0"></span>
            <span className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full animate-wave2 z-0"></span>
          </>
        )}

        {/* BOTÓN */}
        <div
          className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden 
          border-2 border-cyan-400 shadow-xl flex items-center justify-center animate-bounceSoft"
          style={{ backgroundColor: "#182A69" }}
        >
          <img
            key={index}
            src={sponsors[index].img}
            alt="sponsor"
            className="w-full h-full object-contain p-1 animate-fade"
          />
        </div>
      </div>

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
              transform: scale(2);
              opacity: 0;
            }
          }

          .animate-wave1 {
            background: #182A69;
            animation: wave 3s ease-out forwards;
          }

          .animate-wave2 {
            background: #182A69;
            animation: wave 3s ease-out forwards;
            animation-delay: 1.5s;
          }
        `}
      </style>
    </a>
  );
}