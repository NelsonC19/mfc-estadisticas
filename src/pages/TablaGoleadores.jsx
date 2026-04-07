import { useEffect, useState } from "react";

export default function TablaGoleadores() {
  const [data, setData] = useState([]);

  const URL =
    "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/TablaGol";

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1124]">
        <p className="text-white animate-pulse">Cargando goleadores...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-2 sm:px-4
      bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white">

      {/* TÍTULO */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-center tracking-wide">
        Tabla de Goleadores
      </h1>

      {/* CONTENEDOR FUTURISTA */}
      <div className="w-full max-w-3xl relative p-[2px] rounded-2xl overflow-hidden">

        {/* BORDE FUTURISTA */}
        <div className="absolute inset-0 pointer-events-none">

          {/* BORDE PRINCIPAL */}
          <div
            className="
              absolute inset-0 rounded-2xl
              border-2 border-cyan-400/40
              [clip-path:polygon(22px_0,calc(100%-22px)_0,100%_22px,100%_calc(100%-22px),calc(100%-22px)_100%,22px_100%,0_calc(100%-22px),0_22px)]
              shadow-[0_0_25px_rgba(0,255,255,0.6)]
            "
          />

          {/* ESQUINAS */}
          <div className="absolute top-0 left-0 w-[60px] h-[60px]
            border-t-2 border-l-2 border-cyan-400
            rounded-tl-2xl shadow-[0_0_15px_rgba(0,255,255,0.8)]" />

          <div className="absolute top-0 right-0 w-[60px] h-[60px]
            border-t-2 border-r-2 border-cyan-400
            rounded-tr-2xl shadow-[0_0_15px_rgba(0,255,255,0.8)]" />

          <div className="absolute bottom-0 left-0 w-[60px] h-[60px]
            border-b-2 border-l-2 border-cyan-400
            rounded-bl-2xl shadow-[0_0_15px_rgba(0,255,255,0.8)]" />

          <div className="absolute bottom-0 right-0 w-[60px] h-[60px]
            border-b-2 border-r-2 border-cyan-400
            rounded-br-2xl shadow-[0_0_15px_rgba(0,255,255,0.8)]" />

        </div>

        {/* CARD INTERNA */}
        <div className="bg-[#0f1f4b]/80 backdrop-blur-md rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">

              {/* HEADER */}
              <thead className="bg-[#1e3a8a] uppercase text-[10px] sm:text-xs tracking-wider">
                <tr className="text-center">
                  <th className="p-2">Pos</th>
                  <th className="p-2"></th>
                  <th className="p-2 text-left">Jugador</th>
                  <th className="p-2">Goles</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {data
                  .filter(
                    (player) =>
                      player["Jugador"] &&
                      player["Jugador"].trim() !== ""
                  )
                  .map((player, i) => {
                    const pos = player["Pos"];
                    const logo = player["Logo"];
                    const nombre = player["Jugador"];
                    const goles = player["Goles"];

                    return (
                      <tr
                        key={i}
                        className={`
                          border-t border-white/10 text-center
                          transition duration-200
                          hover:bg-[#00ffff]/10
                          ${i < 3 ? "bg-[#00ffff]/5" : ""}
                        `}
                      >
                        <td className="p-2 font-bold">{pos}</td>

                        <td className="p-2">
                          {logo && (
                            <div className="w-5 h-5 mx-auto">
                              <img
                                src={logo}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                        </td>

                        <td className="p-2 text-left whitespace-nowrap font-medium">
                          {nombre}
                        </td>

                        <td className="font-bold text-[#00ffff] text-sm">
                          ⚽ {goles}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
