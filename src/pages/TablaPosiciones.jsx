import { useEffect, useState } from "react";

export default function TablaPosiciones() {
  const [data, setData] = useState([]);

  const URL =
    "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/Tabla";

  const clipHex =
    "[clip-path:polygon(35px_0,calc(100%-35px)_0,100%_35px,100%_calc(100%-35px),calc(100%-35px)_100%,35px_100%,0_calc(100%-35px),0_35px)]";

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

      {/* CONTENEDOR */}
      <div className="w-full max-w-5xl relative p-[2px]">

        {/* 🔥 BORDE HEXAGONAL REAL */}
        <div className={`absolute inset-0 border-2 border-cyan-400 ${clipHex}
          shadow-[0_0_25px_rgba(0,255,255,0.6)] pointer-events-none`} />

        {/* ESQUINAS GRUESAS */}
        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-0 left-0 w-[90px] h-[6px] bg-cyan-400" />
          <div className="absolute top-0 left-0 w-[6px] h-[90px] bg-cyan-400" />

          <div className="absolute top-0 right-0 w-[90px] h-[6px] bg-cyan-400" />
          <div className="absolute top-0 right-0 w-[6px] h-[90px] bg-cyan-400" />

          <div className="absolute bottom-0 left-0 w-[90px] h-[6px] bg-cyan-400" />
          <div className="absolute bottom-0 left-0 w-[6px] h-[90px] bg-cyan-400" />

          <div className="absolute bottom-0 right-0 w-[90px] h-[6px] bg-cyan-400" />
          <div className="absolute bottom-0 right-0 w-[6px] h-[90px] bg-cyan-400" />

        </div>

        {/* 🔥 AQUÍ ESTABA EL ERROR → ahora también tiene clip-path */}
        <div className={`bg-[#0f1f4b]/80 backdrop-blur-md overflow-hidden ${clipHex}`}>

          <div className={`overflow-x-auto ${clipHex}`}>
            <table className="w-full text-xs sm:text-sm min-w-[650px] table-fixed">

              {/* HEADER */}
              <thead className="uppercase text-[10px] sm:text-xs tracking-wider">
                <tr className="text-center">

                  <th className="p-2 w-[35px] sticky left-0 bg-[#1e3a8a] z-20">Pos</th>
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

              {/* BODY igual que el tuyo */}
              <tbody>
                {data.map((team, i) => {
                  const logo = team[" "] || "";
                  const pos = team["Pos."] || team["Pos"];

                  return (
                    <tr key={i}
                      className="border-t border-white/10 text-center hover:bg-[#00ffff]/10">

                      <td className="p-2 font-bold sticky left-0 bg-[#0f1f4b] z-10">{pos}</td>

                      <td className="p-2 sticky left-[35px] bg-[#0f1f4b] z-10">
                        {logo && (
                          <div className="w-5 h-5 mx-auto">
                            <img src={logo} className="w-full h-full object-contain" />
                          </div>
                        )}
                      </td>

                      <td className="p-2 text-left font-medium truncate sticky left-[70px] bg-[#0f1f4b] z-10 w-[100px] sm:w-[140px]">
                        {team["Club"]}
                      </td>

                      <td>{team["PJ"]}</td>
                      <td>{team["G"]}</td>
                      <td>{team["E"]}</td>
                      <td>{team["P"]}</td>
                      <td>{team["GF"]}</td>
                      <td>{team["GC"]}</td>

                      <td className={`
                        ${Number(team["DF"]) > 0 ? "text-green-400" : ""}
                        ${Number(team["DF"]) < 0 ? "text-red-400" : ""}
                      `}>
                        {team["DF"]}
                      </td>

                      <td className="font-bold text-[#00ffff] text-sm sticky right-0 bg-[#0f1f4b] z-10">
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
