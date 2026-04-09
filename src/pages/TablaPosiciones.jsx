import { useEffect, useState } from "react";

export default function TablaPosiciones() {
  const [data, setData] = useState([]);

  const URL =
    "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/Tabla";

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (data.length === 0) {
    return (
      <div className="min-h-screen pt-30 flex items-center justify-center bg-[#0a1124]">
        <p className="text-white animate-pulse">Cargando tabla...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-30 flex flex-col items-center py-6 px-2 sm:px-4
      bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white">

      {/* TÍTULO */}
        <div className="text-cyan-400 text-center font-extrabold text-3xl md:text-4xl pt-3 pb-10 rounded-t-xl tracking-wider drop-shadow-[0_0_2px_#22d3ee]">
          Tabla de Posiciones
        </div>

      {/* CONTENEDOR FUTURISTA */}
      <div className="w-full max-w-5xl relative p-[2px] rounded-2xl overflow-hidden">

        {/* 🔥 BORDE FUTURISTA MEJORADO */}
        <div className="absolute inset-0 pointer-events-none">

          {/* BORDE PRINCIPAL */}
          <div className="
            absolute inset-0 rounded-2xl
            border-2 border-cyan-400/40
            [clip-path:polygon(22px_0,calc(100%-22px)_0,100%_22px,100%_calc(100%-22px),calc(100%-22px)_100%,22px_100%,0_calc(100%-22px),0_22px)]
            shadow-[0_0_25px_rgba(0,255,255,0.6)]
          " />

          {/* ESQUINAS DESTACADAS */}
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
            <table className="w-full text-xs sm:text-sm min-w-[650px] table-fixed">

              {/* HEADER */}
              <thead className="bg-[#1e3a8a] uppercase text-[10px] sm:text-xs tracking-wider">
                <tr className="text-center">

                  <th className="p-2 w-[35px] sticky left-0 bg-[#1e3a8a] z-20">
                    Pos
                  </th>

                  <th className="p-2 w-[35px] sticky left-[35px] bg-[#1e3a8a] z-20"></th>

                  <th className="p-2 text-left w-[100px] sm:w-[140px] sticky left-[70px] bg-[#1e3a8a] z-20 shadow-md">
                    Equipo
                  </th>

                  <th className="p-2 w-[40px]">PJ</th>
                  <th className="p-2 w-[40px]">G</th>
                  <th className="p-2 w-[40px]">E</th>
                  <th className="p-2 w-[40px]">P</th>
                  <th className="p-2 w-[45px]">GF</th>
                  <th className="p-2 w-[45px]">GC</th>
                  <th className="p-2 w-[45px]">DF</th>

                  <th className="p-2 w-[50px] sticky right-0 bg-[#1e3a8a] z-20 shadow-md">
                    Pts
                  </th>

                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {data.map((team, i) => {
                  const logo = team[" "] || "";
                  const pos = team["Pos."] || team["Pos"];

                  return (
                    <tr
                      key={i}
                      className="
                        border-t border-white/10 text-center
                        transition duration-200
                        hover:bg-[#00ffff]/10
                      "
                    >

                      {/* POS */}
                      <td className="p-2 font-bold sticky left-0 bg-[#0f1f4b] z-10">
                        {pos}
                      </td>

                      {/* LOGO */}
                      <td className="p-2 sticky left-[35px] bg-[#0f1f4b] z-10">
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

                      {/* EQUIPO */}
                      <td
                        className="p-2 text-left font-medium truncate
                        sticky left-[70px] bg-[#0f1f4b] z-10 shadow-md
                        w-[100px] sm:w-[140px]"
                      >
                        {team["Club"]}
                      </td>

                      {/* STATS */}
                      <td>{team["PJ"]}</td>
                      <td>{team["G"]}</td>
                      <td>{team["E"]}</td>
                      <td>{team["P"]}</td>
                      <td>{team["GF"]}</td>
                      <td>{team["GC"]}</td>

                      {/* DF */}
                      <td className={`
                        ${Number(team["DF"]) > 0 ? "text-green-400" : ""}
                        ${Number(team["DF"]) < 0 ? "text-red-400" : ""}
                      `}>
                        {team["DF"]}
                      </td>

                      {/* PTS */}
                      <td className="font-bold text-[#00ffff] text-sm sticky right-0 bg-[#0f1f4b] z-10 shadow-md">
                        {team["Pts."]}
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
