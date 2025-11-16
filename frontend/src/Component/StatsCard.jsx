import React from "react";

export default function StatsCard({ title, value }) {
  return (
    <div style={styles.card}>
      <h4 style={styles.title}>{title}</h4>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "linear-gradient(135deg, #ffffff, #eef2ff)",
    padding: "22px",
    borderRadius: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "220px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    display: "flex",
    gap: "20px",
    marginTop: "10px",
    
  },
  title: {
    margin: 0,
    color: "#4a5568",
    fontSize: "15px",
    fontWeight: "500",
  },
  value: {
    marginTop: "10px",
    fontSize: "30px",
    fontWeight: "700",
    color: "#1a202c",
  }
};
