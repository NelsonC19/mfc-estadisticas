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
    <div className="min-h-screen flex flex-col items-center py-10 px-4
      bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white">

      {/* TÍTULO */}
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
        Tabla de Goleadores
      </h1>

       {/* CONTENEDOR FUTURISTA */}
      <div className="w-full max-w-5xl relative p-[2px] rounded-2xl overflow-hidden">

      {/* CARD */}
      <div className="w-full max-w-3xl bg-[#0f1f4b]/80 backdrop-blur-md
        rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="bg-[#1e3a8a] uppercase text-xs tracking-wider">
              <tr className="text-center">
                <th className="p-3">Pos</th>
                <th className="p-3"></th>
                <th className="p-3 text-left">Jugador</th>
                <th className="p-3">Goles</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data
               .filter((player) => player["Jugador"] && player["Jugador"].trim() !== "")
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
                      hover:bg-[#00ffff]/10 hover:scale-[1.01]
                      ${i < 3 ? "bg-[#00ffff]/5" : ""}
                    `}
                  >
                    {/* POS */}
                    <td className="p-3 font-bold">{pos}</td>

                    {/* LOGO */}
                    <td className="p-3">
                      {logo && (
                        <div className="w-6 h-6 mx-auto overflow-hidden">
                          <img
                            src={logo}
                            alt=""
                            style={{
                              width: "24px",
                              height: "24px",
                              objectFit: "contain"
                            }}
                          />
                        </div>
                      )}
                    </td>

                    {/* NOMBRE */}
                    <td className="p-3 text-left whitespace-nowrap font-medium">
                      {nombre}
                    </td>

                    {/* GOLES */}
                    <td className="font-bold text-[#00ffff] text-base">
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
  );
}
