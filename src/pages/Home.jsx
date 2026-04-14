import { useEffect, useState } from "react";
import { Play } from "lucide-react";

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/Resultados"
        );
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchData();
  }, []);

  const fechas = [...new Set(matches.map((m) => m.Fecha))];

  const getNumeroFecha = (f) => {
    if (!f) return 0;
    const match = f.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const fechasOrdenadas = fechas.sort(
    (a, b) => getNumeroFecha(a) - getNumeroFecha(b)
  );

  const fechasConResultados = fechasOrdenadas.filter((f) =>
    matches.some(
      (m) =>
        m.Fecha === f &&
        m.ResLocal !== "" &&
        m.ResVisita !== ""
    )
  );

  const ultimaFecha =
    fechasConResultados[fechasConResultados.length - 1];

  const indexUltima = fechasOrdenadas.indexOf(ultimaFecha);
  const proximaFecha = fechasOrdenadas[indexUltima + 1];

  const ultimos = matches
    .filter((m) => m.Fecha === ultimaFecha)
    .slice(0, 4);

  const proximos = matches
    .filter((m) => m.Fecha === proximaFecha)
    .slice(0, 4);

  const getFechaTexto = (lista) =>
    lista.length > 0 ? lista[0].FechaTexto : "";

  const horarios = ["6:15 h", "7:45 h", "9:15 h", "10:45 h"];

  // 🔥 MARCO FUTURISTA REUTILIZABLE
  const FuturisticFrame = ({ title, children }) => (
    <div className="w-full relative p-[2px] rounded-2xl overflow-hidden">

      {/* BORDE FUTURISTA */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute inset-0 rounded-2xl
            border-2 border-cyan-400/40
            [clip-path:polygon(22px_0,calc(100%-22px)_0,100%_22px,100%_calc(100%-22px),calc(100%-22px)_100%,22px_100%,0_calc(100%-22px),0_22px)]
            shadow-[0_0_25px_rgba(0,255,255,0.5)]
          "
        />

        {/* esquinas */}
        <div className="absolute top-0 left-0 w-[60px] h-[60px] border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-[60px] h-[60px] border-t-2 border-r-2 border-cyan-400 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-[60px] h-[60px] border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-[60px] h-[60px] border-b-2 border-r-2 border-cyan-400 rounded-br-2xl" />
      </div>

      {/* CONTENIDO */}
      <div className="bg-[#0f1f4b]/80 backdrop-blur-md rounded-2xl overflow-hidden p-4">

        {/* 🔥 HEADER CON BRILLO ANIMADO */}
        <div className="relative mb-5 overflow-hidden rounded-xl">

          <div className="relative bg-[#1e3a8a]/80 backdrop-blur-md 
          border-2 border-cyan-400/60 
          rounded-xl px-4 py-2 text-center
          shadow-[0_0_15px_rgba(0,255,255,0.4)]">

            {/* ✨ BRILLO */}
            <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
              <div className="absolute top-0 left-[-100%] w-[60%] h-full
              bg-gradient-to-r from-transparent via-cyan-600/30 to-transparent
              skew-x-[-20deg]
              [animation:shimmer_2.5s_infinite]" />
            </div>

            {/* TEXTO */}
            <span className="relative z-10 text-cyan-300 font-extrabold text-lg md:text-xl tracking-wide">
              {title}
            </span>
          </div>

          {/* línea glow */}
          <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-20 h-[2px] bg-cyan-400 blur-sm opacity-70"></div>

        </div>

        {children}

      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 md:pt-28 bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white px-4 pb-24 flex flex-col items-center">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">

        {/* 🔥 ÚLTIMOS */}
        <FuturisticFrame title="Últimos Partidos">

          <h2 className="text-center my-4 flex justify-center gap-2">
            <span className="font-bold text-white text-lg">{ultimaFecha}</span>
            <span className="text-cyan-400/70 font-bold">-</span>
            <span className="text-gray-300 text-lg">{getFechaTexto(ultimos)}</span>
          </h2>

          <div className="space-y-3">
            {ultimos.map((m, i) => (
              <div key={i} className="bg-[#111c44]/70 rounded-xl p-3 border border-white/10">

                <div className="flex items-center justify-between">

                  <div className="flex flex-col items-center w-[30%]">
                    <img src={m.LogoLocal} className="w-9 h-9 object-contain mb-1" />
                    <span className="text-sm truncate">{m.Local}</span>
                  </div>

                  <div className="flex flex-col items-center w-[40%]">
                    <div className="text-xl font-bold">
                      {m.ResLocal}-{m.ResVisita}
                    </div>

                    {m.Transmi && (
                      <a
                        href={m.Transmi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center gap-1 text-xs px-3 py-1 rounded-full
                        bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 transition"
                      >
                        <Play size={14} />
                        Ver partido
                      </a>
                    )}
                  </div>

                  <div className="flex flex-col items-center w-[30%]">
                    <img src={m.LogoVisita} className="w-9 h-9 object-contain mb-1" />
                    <span className="text-sm truncate">{m.Visita}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </FuturisticFrame>

        {/* 🔥 PRÓXIMOS */}
        <FuturisticFrame title="Próximos Partidos">

          <h2 className="text-center my-4 flex justify-center gap-2">
            <span className="font-bold text-white text-lg">{proximaFecha}</span>
            <span className="text-cyan-400/70 font-bold">-</span>
            <span className="text-gray-300 text-lg">{getFechaTexto(proximos)}</span>
          </h2>

          <div className="space-y-3">
            {proximos.map((m, i) => (
              <div key={i} className="bg-[#111c44]/70 rounded-xl p-3 border border-white/10">

                <div className="flex items-center justify-between">

                  <div className="flex flex-col items-center w-[30%]">
                    <img src={m.LogoLocal} className="w-9 h-9 object-contain mb-1" />
                    <span className="text-sm truncate">{m.Local}</span>
                  </div>

                  <div className="flex flex-col items-center w-[40%]">
                    <div className="text-sm font-bold text-cyan-300">
                      {horarios[i]}
                    </div>

                    <div className="mt-2 text-xs px-4 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-center">
                      Club Cumbaza
                    </div>
                  </div>

                  <div className="flex flex-col items-center w-[30%]">
                    <img src={m.LogoVisita} className="w-9 h-9 object-contain mb-1" />
                    <span className="text-sm truncate">{m.Visita}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </FuturisticFrame>

      </div>
    </div>
  );
}