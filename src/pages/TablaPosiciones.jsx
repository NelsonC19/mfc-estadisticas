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
    <div className="min-h-screen flex flex-col items-center py-10 px-4
      bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white">

      {/* TÍTULO */}
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
        Tabla de Posiciones
      </h1>

      {/* CARD */}
      <div className="w-full max-w-5xl bg-[#0f1f4b]/80 backdrop-blur-md
        rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">

            {/* HEADER */}
            <thead className="bg-[#1e3a8a] uppercase text-xs tracking-wider">
              <tr className="text-center">
                <th className="p-3 sticky left-0 bg-[#1e3a8a] z-30">Pos</th>
                <th className="p-3 sticky left-[45px] bg-[#1e3a8a] z-30"></th>
                <th className="p-3 text-left sticky left-[70px] bg-[#1e3a8a] z-30">
                  Equipo
                </th>
                <th className="p-3">PJ</th>
                <th className="p-3">G</th>
                <th className="p-3">E</th>
                <th className="p-3">P</th>
                <th className="p-3">GF</th>
                <th className="p-3">GC</th>
                <th className="p-3">DF</th>
                <th className="p-3">Pts</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data.map((team, i) => {
                const logo = team[" "] || "";
                const pos = team["Pos."] || team["Pos"];

                const baseBg = i < 4 ? "bg-[#00ffff]/5" : "bg-transparent";

                return (
                  <tr
                    key={i}
                    className={`
                      group border-t border-white/10 text-center
                      transition duration-200
                      ${baseBg}
                      hover:bg-[#00ffff]/10
                    `}
                  >
                    {/* POS */}
                    <td
                      className={`
                        p-3 font-bold sticky left-0 z-20
                        ${i < 4 ? "bg-[#00ffff]/5" : "bg-[#0f1f4b]"}
                        group-hover:bg-[#00ffff]/10
                      `}
                    >
                      {pos}
                    </td>

                    {/* LOGO */}
                    <td
                      className={`
                        p-3 sticky left-[45px] z-20
                        ${i < 4 ? "bg-[#00ffff]/5" : "bg-[#0f1f4b]"}
                        group-hover:bg-[#00ffff]/10
                      `}
                    >
                      {logo && (
                        <div className="w-6 h-6 mx-auto overflow-hidden">
                          <img
                            src={logo}
                            alt=""
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      )}
                    </td>

                    {/* EQUIPO */}
                    <td
                      className={`
                        p-3 text-left whitespace-nowrap font-medium
                        sticky left-[70px] z-20
                        max-w-[120px] truncate
                        ${i < 4 ? "bg-[#00ffff]/5" : "bg-[#0f1f4b]"}
                        group-hover:bg-[#00ffff]/10
                      `}
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
                    <td
                      className={`
                        ${Number(team["DF"]) > 0 ? "text-green-400" : ""}
                        ${Number(team["DF"]) < 0 ? "text-red-400" : ""}
                      `}
                    >
                      {team["DF"]}
                    </td>

                    {/* PTS */}
                    <td className="font-bold text-[#00ffff] text-base">
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
