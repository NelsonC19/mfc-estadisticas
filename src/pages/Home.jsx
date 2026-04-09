import { useEffect, useState } from "react";

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

  // 🔥 FECHAS
  const fechas = [...new Set(matches.map((m) => m.Fecha))];

  const getNumeroFecha = (f) => {
    if (!f) return 0;
    const match = f.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const fechasOrdenadas = fechas.sort(
    (a, b) => getNumeroFecha(a) - getNumeroFecha(b)
  );

  // 🔥 ÚLTIMA FECHA CON RESULTADOS
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

  // 🔥 obtener texto tipo "Sábado..."
  const getFechaTexto = (lista) =>
    lista.length > 0 ? lista[0].FechaTexto : "";

  return (
    <div className="min-h-screen pt-40 bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white p-6 pb-24 flex flex-col items-center">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6">

        {/* 🔥 ÚLTIMOS PARTIDOS */}
        <div>
          <div className="bg-[#182A69] text-cyan-400 text-center font-bold text-lg md:text-xl py-3 rounded-t-xl tracking-wide">
            Últimos Partidos
          </div>

          {/* 🔥 TITULO PRO */}
<h2 className="text-center mb-4 mt-2">

  <span className="font-[Poppins] font-extrabold text-sm md:text-base text-white">
    {ultimaFecha}
  </span>

  <span className="mx-2 text-gray-400 text-lg md:text-sm">-</span>

  <span className="font-[Poppins] font-medium text-lg md:text-sm text-gray-400">
    {getFechaTexto(ultimos)}
  </span>

</h2>

          {ultimos.length === 0 ? (
            <p className="text-center mt-4 opacity-70">
              Cargando partidos...
            </p>
          ) : (
            ultimos.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#0f1f4b]/80 backdrop-blur-md
                rounded-xl px-4 py-3 mb-3 border border-white/10 shadow-md hover:scale-[1.02] transition"
              >
                {/* LOCAL */}
                <div className="flex items-center gap-2 w-[40%] justify-end text-right">
                  <span className="font-semibold text-sm truncate">
                    {m.Local}
                  </span>
                  <img
                    src={m.LogoLocal}
                    className="w-7 h-7 object-contain"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>

                {/* SCORE */}
                <div className="text-center font-bold text-base">
                  {m.ResLocal}
                  <span className="mx-1 text-gray-400">{m.Sep}</span>
                  {m.ResVisita}
                </div>

                {/* VISITA */}
                <div className="flex items-center gap-2 w-[40%]">
                  <img
                    src={m.LogoVisita}
                    className="w-7 h-7 object-contain"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span className="font-semibold text-sm truncate">
                    {m.Visita}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 🔥 PRÓXIMOS PARTIDOS */}
        <div>
          <div className="bg-[#182A69] text-cyan-400 text-center font-bold text-lg md:text-xl py-3 rounded-t-xl tracking-wide">
            Próximos Partidos
          </div>

          {/* 🔥 TITULO PRO */}
<h2 className="text-center mb-4 mt-2">

  <span className="font-[Poppins] font-extrabold text-sm md:text-base text-white">
    {proximaFecha}
  </span>

  <span className="mx-2 text-gray-400 text-lg md:text-sm">-</span>

  <span className="font-[Poppins] font-medium text-lg md:text-sm text-gray-400">
    {getFechaTexto(proximos)}
  </span>

</h2>

          {proximos.length === 0 ? (
            <p className="text-center mt-4 opacity-70">
              Cargando partidos...
            </p>
          ) : (
            proximos.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#0f1f4b]/80 backdrop-blur-md
                rounded-xl px-4 py-3 mb-3 border border-white/10 shadow-md hover:scale-[1.02] transition"
              >
                {/* LOCAL */}
                <div className="flex items-center gap-2 w-[40%] justify-end text-right">
                  <span className="font-semibold text-sm truncate">
                    {m.Local}
                  </span>
                  <img
                    src={m.LogoLocal}
                    className="w-7 h-7 object-contain"
                  />
                </div>

                {/* VS */}
                <div className="text-gray-400 font-bold text-sm">
                  vs
                </div>

                {/* VISITA */}
                <div className="flex items-center gap-2 w-[40%]">
                  <img
                    src={m.LogoVisita}
                    className="w-7 h-7 object-contain"
                  />
                  <span className="font-semibold text-sm truncate">
                    {m.Visita}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}