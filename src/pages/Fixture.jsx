import { useEffect, useState } from "react";
import FuturisticHeader from "../components/FuturisticHeader";


export default function Fixture() {
  const [data, setData] = useState([]);
  const [fechaActiva, setFechaActiva] = useState(8);
  const [tab, setTab] = useState("vuelta");

  const URL =
    "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/Resultados";

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ TRANSFORMACIÓN CORRECTA (CON BONUS)
  const partidos = data.map((row) => ({
    fecha: Number(row.Fecha?.replace("Fecha ", "")) || 0,
    titulo: row.FechaTexto || "",

    local: row.Local || "",
    logoLocal: row.LogoLocal?.trim() || "",

    resLocal: row.ResLocal ?? "",
    sep: row.Sep || "-",
    resVisita: row.ResVisita ?? "",

    logoVisita: row.LogoVisita?.trim() || "",
    visita: row.Visita || "",
  }));

  // 🔥 FILTRO IDA / VUELTA
  const rangoFechas =
    tab === "ida"
      ? [1, 2, 3, 4, 5, 6, 7]
      : [8, 9, 10, 11, 12, 13, 14];

  const fechas = [...new Set(partidos.map((p) => p.fecha))].filter((f) =>
    rangoFechas.includes(f)
  );

  const partidosFiltrados = partidos.filter(
    (p) => p.fecha === fechaActiva
  );

  // ⏳ LOADING
  if (data.length === 0) {
    return (
      <div className="min-h-screen pt-40 flex items-center justify-center bg-[#0a1124] text-white">
        Cargando fixture...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-30 bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white py-10 px-4">

      {/* 🔥 TITULO */}     
      <FuturisticHeader title="Fixture" className="w-fit min-w-[200px]" />

      {/* 🔥 TABS PREMIUM */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white/5 backdrop-blur-lg p-1 rounded-full border border-white/10 shadow-inner">

          {/* IDA */}
          <button
            onClick={() => {
              setTab("ida");
              setFechaActiva(1);
            }}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ease-out
              ${
                tab === "ida"
                  ? "bg-[#00ffff] text-black shadow-[0_0_12px_#00ffff] scale-105"
                  : "text-gray-300 hover:text-white"
              }`}
          >
            IDA
          </button>

          {/* VUELTA */}
          <button
            onClick={() => {
              setTab("vuelta");
              setFechaActiva(8);
            }}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ease-out
              ${
                tab === "vuelta"
                  ? "bg-[#00ffff] text-black shadow-[0_0_12px_#00ffff] scale-105"
                  : "text-gray-300 hover:text-white"
              }`}
          >
            VUELTA
          </button>

        </div>
      </div>

      {/* 🔥 FECHAS */}
      <div className="flex overflow-x-auto gap-3 mb-6 px-2 py-2 justify-start md:justify-center scrollbar-hide">
        {fechas.map((f) => {
          const isActive = fechaActiva === f;

          return (
            <button
              key={f}
              onClick={() => setFechaActiva(f)}
              className={`
                relative px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                transition-all duration-300

                ${
                  isActive
                    ? "text-black bg-[#00ffff] shadow-[0_0_12px_#00ffff]"
                    : "text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              Fecha {f}

              {isActive && (
                <span className="absolute inset-0 rounded-full border border-cyan-300 animate-pulse opacity-40"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* 🔥 TITULO FECHA */}
      {partidosFiltrados.length > 0 && (
<h2 className="text-center mb-6 text-lg md:text-xl">

  {/* FECHA (DESTACADA) */}
  <span className="font-poppins font-extrabold text-white tracking-wide">
    Fecha {fechaActiva}
  </span>

  {/* SEPARADOR */}
  <span className="mx-2 text-gray-400">-</span>

  {/* FECHA TEXTO (SUAVE) */}
  <span className="font-[Poppins] font-medium text-gray-400">
    {partidosFiltrados[0].titulo}
  </span>

</h2>
      )}

      {/* 🔥 PARTIDOS */}
      <div className="max-w-3xl mx-auto space-y-4">
        {partidosFiltrados.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-[#0f1f4b]/80 backdrop-blur-md
            rounded-xl px-4 py-3 border border-white/10 shadow-md hover:scale-[1.02] transition"
          >
            {/* LOCAL */}
            <div className="flex items-center gap-2 w-[40%] justify-end text-right">
              <span className="font-semibold truncate">
                {p.local}
              </span>

              {p.logoLocal && (
                <img
                  src={p.logoLocal}
                  className="w-7 h-7 object-contain"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>

            {/* SCORE */}
            <div className="w-[20%] text-center font-bold text-lg">
              <span>{p.resLocal}</span>
              <span className="mx-1 text-gray-400">{p.sep}</span>
              <span>{p.resVisita}</span>
            </div>

            {/* VISITA */}
            <div className="flex items-center gap-2 w-[40%]">
              {p.logoVisita && (
                <img
                  src={p.logoVisita}
                  className="w-7 h-7 object-contain"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}

              <span className="font-semibold truncate">
                {p.visita}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}