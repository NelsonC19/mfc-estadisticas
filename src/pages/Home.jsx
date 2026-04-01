import { Link } from "react-router-dom";
import { FaTrophy, FaFutbol, FaCalendarAlt, FaSquare } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Home() {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [matches, setMatches] = useState([]);

  // 👇 Detecta cambio de tamaño (responsive real)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 👇 Cargar datos desde OpenSheet
  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(
          "https://opensheet.elk.sh/1BnXAjeTz-Qhdg11ALhUrfhruAQGgs33LEtzFalz29Os/Resultados"
        );
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("Error al cargar los partidos:", err);
      }
    }
    fetchMatches();
  }, []);

  // Filtrar partidos según fecha
  const today = new Date();
  const pastMatches = matches.filter(
    (m) => new Date(m.B) < today
  );
  const upcomingMatches = matches.filter(
    (m) => new Date(m.B) >= today
  );

  const items = [
    { title: "Tabla de Posiciones", subtitle: "Equipos ordenados por puntaje", icon: <FaTrophy size={36} />, path: "/posiciones", color: "#00ffff" },
    { title: "Tabla de Goleadores", subtitle: "Ranking de máximos anotadores", icon: <FaFutbol size={36} />, path: "/goleadores", color: "#00ffff" },
    { title: "Fixture", subtitle: "Calendario de partidos", icon: <FaCalendarAlt size={36} />, path: "/fixture", color: "#00ffff" },
    { title: "Tarjetas", subtitle: "Tarjetas amarillas y rojas", icon: <FaSquare size={36} />, path: "/tarjetas", color: "#00ffff" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Superliga MFC 2026</h1>
        <p style={styles.subtitle}>Estadísticas oficiales</p>
      </div>

      <div style={{ ...styles.grid, gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)" }}>
        {items.map((item, index) => {
          const isHover = hovered === index;
          return (
            <Link to={item.path} key={index} style={styles.link}>
              <div
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  ...styles.card,
                  borderTop: `4px solid ${item.color}`,
                  transform: isHover ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
                  boxShadow: isHover ? `0 0 10px ${item.color}, 0 8px 20px rgba(0,0,0,0.7)` : "0 10px 25px rgba(0,0,0,0.4)",
                }}
              >
                <div style={{ ...styles.icon, color: item.color, transform: isHover ? "scale(1.25)" : "scale(1)" }}>
                  {item.icon}
                </div>
                <h3 style={{ ...styles.cardTitle, color: item.color, transform: isHover ? "scale(1.08)" : "scale(1)", textShadow: isHover ? `0 0 2px ${item.color}, 0 0 6px ${item.color}` : "none" }}>
                  {item.title}
                </h3>
                <p style={styles.cardSubtitle}>{item.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Últimos Partidos */}
      <div style={{ ...styles.section, marginTop: "50px" }}>
        <h2 style={styles.sectionTitle}>Últimos Partidos</h2>
        {pastMatches.length === 0 ? (
          <p>No hay partidos pasados</p>
        ) : (
          pastMatches.map((m, i) => (
            <div key={i} style={styles.matchCard}>
              <span style={styles.matchDate}>{m.B}</span>
              <div style={styles.matchTeams}>
                <div style={styles.team}>
                  <img src={m.D} alt={m.C} style={styles.logo} />
                  <span>{m.C}</span>
                  <span>{m.F}</span>
                </div>
                <span style={{ margin: "0 10px" }}>-</span>
                <div style={styles.team}>
                  <span>{m.H}</span>
                  <span>{m.K}</span>
                  <img src={m.J} alt={m.K} style={styles.logo} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Próximos Partidos */}
      <div style={{ ...styles.section, marginTop: "30px" }}>
        <h2 style={styles.sectionTitle}>Próximos Partidos</h2>
        {upcomingMatches.length === 0 ? (
          <p>No hay próximos partidos</p>
        ) : (
          upcomingMatches.map((m, i) => (
            <div key={i} style={styles.matchCard}>
              <span style={styles.matchDate}>{m.B}</span>
              <div style={styles.matchTeams}>
                <div style={styles.team}>
                  <img src={m.D} alt={m.C} style={styles.logo} />
                  <span>{m.C}</span>
                </div>
                <span style={{ margin: "0 10px" }}>vs</span>
                <div style={styles.team}>
                  <span>{m.K}</span>
                  <img src={m.J} alt={m.K} style={styles.logo} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #182a69, #020617)",
    color: "#fff",
    padding: "40px 20px",
    fontFamily: "system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  header: { textAlign: "center", marginBottom: "50px", width: "100%", maxWidth: "900px" },
  title: { fontSize: "32px", fontWeight: "700" },
  subtitle: { opacity: 0.7, marginTop: "8px" },
  grid: { display: "grid", gap: "25px", maxWidth: "900px", width: "100%" },
  link: { textDecoration: "none", display: "block", width: "100%" },
  card: { background: "#0e2061", borderRadius: "16px", padding: "30px", textAlign: "center", transition: "all 0.35s ease", boxShadow: "0 10px 25px rgba(0,0,0,0.4)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" },
  icon: { marginBottom: "15px", transition: "all 0.3s ease", display: "flex", justifyContent: "center" },
  cardTitle: { fontSize: "19px", fontWeight: "600", marginBottom: "4px", transition: "all 0.3s ease" },
  cardSubtitle: { fontSize: "13px", opacity: 0.8, lineHeight: "1.3", fontStyle: "italic", color: "#ffffff" },
  section: { maxWidth: "900px", width: "100%" },
  sectionTitle: { fontSize: "24px", fontWeight: "600", marginBottom: "20px" },
  matchCard: { background: "#0e2061", borderRadius: "12px", padding: "15px", marginBottom: "15px" },
  matchTeams: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  team: { display: "flex", alignItems: "center", gap: "5px" },
  logo: { width: "30px", height: "30px", objectFit: "contain", borderRadius: "50%" },
  matchDate: { display: "block", fontSize: "14px", opacity: 0.7, marginBottom: "8px" },
};
