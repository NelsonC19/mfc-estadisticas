import { useEffect, useState } from "react";

export default function Tarjetas() {
  const [rojas, setRojas] = useState([]);
  const [amarillas, setAmarillas] = useState([]);

  const URL_ROJAS =
    "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/TarRoja";

  const URL_AMARILLAS =
    "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/TarAmar";

  useEffect(() => {
    fetch(URL_ROJAS)
      .then((res) => res.json())
      .then((data) => setRojas(data));

    fetch(URL_AMARILLAS)
      .then((res) => res.json())
      .then((data) => setAmarillas(data));
  }, []);

  if (rojas.length === 0 && amarillas.length === 0) {
    return (
      <div className="min-h-screen pt-30 flex items-center justify-center bg-[#0a1124]">
        <p className="text-white animate-pulse">Cargando tarjetas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-30 flex flex-col items-center py-10 px-4
      bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white">

        <div className="text-cyan-400 text-center font-extrabold text-3xl md:text-4xl pt-3 pb-7 rounded-t-xl tracking-wider drop-shadow-[0_0_20px_#000000]">
          Tarjetas
        </div>

      {/* 🟥 ROJAS */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-xl font-semibold mb-4 pb-3 text-red-400">
          🟥 Tarjetas Rojas
        </h2>

        {/* CONTENEDOR BORDE */}
        <div className="w-full relative p-[2px] rounded-2xl overflow-hidden">

          {/* BORDE FUTURISTA */}
          <div className="absolute inset-0 pointer-events-none">

            <div className="
              absolute inset-0 rounded-2xl
              border-2 border-red-400/40
              [clip-path:polygon(22px_0,calc(100%-22px)_0,100%_22px,100%_calc(100%-22px),calc(100%-22px)_100%,22px_100%,0_calc(100%-22px),0_22px)]
              shadow-[0_0_25px_rgba(255,0,0,0.6)]
            " />

            <div className="absolute top-0 left-0 w-[60px] h-[60px]
              border-t-2 border-l-2 border-red-400
              rounded-tl-2xl shadow-[0_0_15px_rgba(255,0,0,0.8)]" />

            <div className="absolute top-0 right-0 w-[60px] h-[60px]
              border-t-2 border-r-2 border-red-400
              rounded-tr-2xl shadow-[0_0_15px_rgba(255,0,0,0.8)]" />

            <div className="absolute bottom-0 left-0 w-[60px] h-[60px]
              border-b-2 border-l-2 border-red-400
              rounded-bl-2xl shadow-[0_0_15px_rgba(255,0,0,0.8)]" />

            <div className="absolute bottom-0 right-0 w-[60px] h-[60px]
              border-b-2 border-r-2 border-red-400
              rounded-br-2xl shadow-[0_0_15px_rgba(255,0,0,0.8)]" />

          </div>

          {/* CARD */}
          <div className="bg-[#0f1f4b]/80 backdrop-blur-md rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1e3a8a] uppercase text-xs">
                <tr className="text-center">
                  <th className="p-3"></th>
                  <th className="p-3 text-left">Jugador</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Cond.</th>
                  <th className="p-3">Vuelve</th>
                </tr>
              </thead>

              <tbody>
                {rojas
                  .filter((r) => r["Jugador"]?.trim())
                  .map((r, i) => (
                    <tr
                      key={i}
                      className="border-t border-white/10 text-center
                        hover:bg-red-500/10 transition"
                    >
                      <td className="p-3">
                        <img src={r["Club"]} className="w-6 h-6 mx-auto" />
                      </td>

                      <td className="text-left p-3 font-medium">
                        {r["Jugador"]}
                      </td>

                      <td>{r["Fecha"]}</td>

                      <td className="text-red-400 font-semibold">
                        {r["Cond."]}
                      </td>

                      <td className="text-cyan-400 font-semibold">
                        {r["Vuelve"]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🟨 AMARILLAS */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 pb-3 text-yellow-400">
          🟨 Tarjetas Amarillas
        </h2>

        {/* CONTENEDOR BORDE */}
        <div className="w-full relative p-[2px] rounded-2xl overflow-hidden">

          {/* BORDE FUTURISTA */}
          <div className="absolute inset-0 pointer-events-none">

            <div className="
              absolute inset-0 rounded-2xl
              border-2 border-yellow-400/40
              [clip-path:polygon(22px_0,calc(100%-22px)_0,100%_22px,100%_calc(100%-22px),calc(100%-22px)_100%,22px_100%,0_calc(100%-22px),0_22px)]
              shadow-[0_0_25px_rgba(255,255,0,0.6)]
            " />

            <div className="absolute top-0 left-0 w-[60px] h-[60px]
              border-t-2 border-l-2 border-yellow-400
              rounded-tl-2xl shadow-[0_0_15px_rgba(255,255,0,0.8)]" />

            <div className="absolute top-0 right-0 w-[60px] h-[60px]
              border-t-2 border-r-2 border-yellow-400
              rounded-tr-2xl shadow-[0_0_15px_rgba(255,255,0,0.8)]" />

            <div className="absolute bottom-0 left-0 w-[60px] h-[60px]
              border-b-2 border-l-2 border-yellow-400
              rounded-bl-2xl shadow-[0_0_15px_rgba(255,255,0,0.8)]" />

            <div className="absolute bottom-0 right-0 w-[60px] h-[60px]
              border-b-2 border-r-2 border-yellow-400
              rounded-br-2xl shadow-[0_0_15px_rgba(255,255,0,0.8)]" />

          </div>

          {/* CARD */}
          <div className="bg-[#0f1f4b]/80 backdrop-blur-md rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1e3a8a] uppercase text-xs">
                <tr className="text-center">
                  <th className="p-3"></th>
                  <th className="p-3 text-left">Jugador</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Vuelve</th>
                </tr>
              </thead>

              <tbody>
                {amarillas
                  .filter((r) => r["Jugador"]?.trim())
                  .map((r, i) => (
                    <tr
                      key={i}
                      className="border-t border-white/10 text-center
                        hover:bg-yellow-400/10 transition"
                    >
                      <td className="p-3">
                        <img src={r["Club"]} className="w-6 h-6 mx-auto" />
                      </td>

                      <td className="text-left p-3 font-medium">
                        {r["Jugador"]}
                      </td>

                      <td>{r["Fecha"]}</td>

                      <td className="text-cyan-400 font-semibold">
                        {r["Vuelve"]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}