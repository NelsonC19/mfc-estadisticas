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
      <div className="min-h-screen flex items-center justify-center bg-[#0a1124]">
        <p className="text-white animate-pulse">Cargando tarjetas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4
      bg-gradient-to-br from-[#0a1124] via-[#182a69] to-[#0a1124] text-white">

      <h1 className="text-4xl font-bold mb-10 text-center tracking-wide">
        Tarjetas
      </h1>

      {/* 🟥 ROJAS */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-xl font-semibold mb-4 text-red-400">
          🟥 Tarjetas Rojas
        </h2>

        <div className="bg-[#0f1f4b]/80 backdrop-blur-md
          rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

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

      {/* 🟨 AMARILLAS */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">
          🟨 Tarjetas Amarillas
        </h2>

        <div className="bg-[#0f1f4b]/80 backdrop-blur-md
          rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

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
  );
}