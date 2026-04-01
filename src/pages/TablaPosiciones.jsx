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
      <div className="min-h-screen flex items-center justify-center bg-[#0a1124]">
        <p className="text-white animate-pulse">Cargando tabla...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-2 sm:px-4
      bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white">

      {/* TÍTULO */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-center tracking-wide">
        Tabla de Posiciones
      </h1>

      {/* CARD */}
      <div className="w-full max-w-5xl bg-[#0f1f4b]/80 backdrop-blur-md
        rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

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
                <th className="p-2 w-[50px] sticky right-0 bg-[#1e3a8a] z-20 shadow-md">Pts</th>

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
                    className={`
                      border-t border-white/10 text-center
                      transition duration-200
                      hover:bg-[#00ffff]/10                      
                    `}
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

                    {/* EQUIPO (AHORA REALMENTE COMPACTO) */}
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
  );
}
