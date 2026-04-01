import { Link } from "react-router-dom";
import { FaTrophy, FaFutbol, FaCalendarAlt, FaSquare } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Home() {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 👇 Detecta cambio de tamaño (responsive real)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    {
      title: "Tabla de Posiciones",
      subtitle: "Equipos ordenados por puntaje",
      icon: <FaTrophy size={36} />,
      path: "/posiciones",
      color: "#00ffff",
    },
    {
      title: "Tabla de Goleadores",
      subtitle: "Ranking de máximos anotadores",
      icon: <FaFutbol size={36} />,
      path: "/goleadores",
      color: "#00ffff",
    },
    {
      title: "Fixture",
      subtitle: "Calendario de partidos",
      icon: <FaCalendarAlt size={36} />,
      path: "/fixture",
      color: "#00ffff",
    },
    {
      title: "Tarjetas",
      subtitle: "Tarjetas amarillas y rojas",
      icon: <FaSquare size={36} />,
      path: "/tarjetas",
      color: "#00ffff",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Superliga MFC 2026</h1>
        <p style={styles.subtitle}>Estadísticas oficiales</p>
      </div>

      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", // 👈 2 en compu y 1 en celu
        }}
      >
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
                  transform: isHover
                    ? "translateY(-2px) scale(1.02)" // 👈 movimiento en efecto mouse
                    : "translateY(0) scale(1)",
                  boxShadow: isHover
                    ? `0 0 10px ${item.color}, 0 8px 20px rgba(0,0,0,0.7)` // 👈 sombra en efecto mouse
                    : "0 10px 25px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  style={{
                    ...styles.icon,
                    color: item.color,
                    transform: isHover ? "scale(1.25)" : "scale(1)",
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    ...styles.cardTitle,
                    color: item.color,
                    transform: isHover ? "scale(1.08)" : "scale(1)",
                    textShadow: isHover
                      ? `0 0 2px ${item.color}, 0 0 6px ${item.color}` // 👈 sombra en efecto mouse
                      : "none",
                  }}
                >
                  {item.title}
                </h3>

                <p style={styles.cardSubtitle}>{item.subtitle}</p>
              </div>
            </Link>
          );
        })}
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

  width: "100%", // 🔑 IMPORTANTE
},
header: {
  textAlign: "center",
  marginBottom: "50px",
  width: "100%", // 🔑 clave
  maxWidth: "900px",
},
  title: {
    fontSize: "32px",
    fontWeight: "700",
  },
  subtitle: {
    opacity: 0.7,
    marginTop: "8px",
  },
  grid: {
  display: "grid",
  gap: "25px",
  maxWidth: "900px",
  width: "100%", // 🔑 CLAVE
  },
  link: {
  textDecoration: "none",
  display: "block",
  width: "100%", // 🔑 ESTA LÍNEA ARREGLA TODO
  },
card: {
  background: "#0e2061",
  borderRadius: "16px",
  padding: "30px",
  textAlign: "center",
  transition: "all 0.35s ease",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  cursor: "pointer",

  display: "flex",            // 🔥 NUEVO
  flexDirection: "column",    // 🔥 NUEVO
  alignItems: "center",       // 🔥 CENTRADO TOTAL
},
icon: {
  marginBottom: "15px",
  transition: "all 0.3s ease",

  display: "flex",
  justifyContent: "center", // 🔑 CENTRA EL ICONO
},
  cardTitle: {
    fontSize: "19px",
    fontWeight: "600",
    marginBottom: "4px", // 👈 espacio entre textos
    transition: "all 0.3s ease", 
  },
  cardSubtitle: {
    fontSize: "13px",
    opacity: 0.8,
    lineHeight: "1.3",
    fontStyle: "italic", // 👈 cursiva
    color: "#ffffff", 
  },
};
