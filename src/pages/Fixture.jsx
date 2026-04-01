import { useEffect, useState } from "react";

export default function Fixture() {
  const [data, setData] = useState([]);
  const [fechaActiva, setFechaActiva] = useState(1);
  const [tab, setTab] = useState("ida"); // 🔥 TAB ACTIVO

  const URL =
    "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/Resultados";

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 TRANSFORMACIÓN (TU VERSIÓN QUE YA FUNCIONA)
  const partidos = data.map((row, index) => {
    const v = Object.values(row);

    return {
      fecha: Math.floor(index / 4) + 1, // 🔥 4 partidos por fecha
      titulo: v[0],

      local: v[1],
      logoLocal: v[2]?.trim(),

      resLocal: v[4],
      sep: v[5] || "-",
      resVisita: v[6],

      logoVisita: v[7]?.trim(),
      visita: v[8],
    };
  });

  // 🔥 FILTRAR SEGÚN TAB
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

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1124] text-white">
        Cargando fixture...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white py-10 px-4">

      {/* TITULO */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        📅 Fixture
      </h1>

      {/* 🔥 TABS */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => {
            setTab("ida");
            setFechaActiva(1);
          }}
          className={`px-6 py-2 rounded-full font-bold transition
            ${
              tab === "ida"
                ? "bg-[#00ffff] text-black"
                : "bg-white/10 hover:bg-white/20"
            }`}
        >
          IDA
        </button>

        <button
          onClick={() => {
            setTab("vuelta");
            setFechaActiva(8);
          }}
          className={`px-6 py-2 rounded-full font-bold transition
            ${
              tab === "vuelta"
                ? "bg-[#00ffff] text-black"
                : "bg-white/10 hover:bg-white/20"
            }`}
        >
          VUELTA
        </button>
      </div>

      {/* FECHAS */}
      <div className="flex overflow-x-auto gap-3 mb-6 justify-center">
        {fechas.map((f) => (
          <button
            key={f}
            onClick={() => setFechaActiva(f)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold transition
              ${
                fechaActiva === f
                  ? "bg-[#00ffff] text-black"
                  : "bg-white/10 hover:bg-white/20"
              }
            `}
          >
            Fecha {f}
          </button>
        ))}
      </div>

      {/* TITULO FECHA */}
      {partidosFiltrados.length > 0 && (
        <h2 className="text-center font-bold text-lg mb-6">
          Fecha {fechaActiva} - {partidosFiltrados[0].titulo}
        </h2>
      )}

      {/* PARTIDOS */}
      <div className="max-w-3xl mx-auto space-y-4">
        {partidosFiltrados.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-[#0f1f4b]/80 backdrop-blur-md
            rounded-xl px-4 py-3 border border-white/10 shadow-md hover:scale-[1.01] transition"
          >
            {/* LOCAL */}
            <div className="flex items-center gap-2 w-[40%] justify-end text-right">
              <span className="font-semibold truncate">{p.local}</span>
              {p.logoLocal && (
                <img src={p.logoLocal} className="w-7 h-7 object-contain" />
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
                <img src={p.logoVisita} className="w-7 h-7 object-contain" />
              )}
              <span className="font-semibold truncate">{p.visita}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}