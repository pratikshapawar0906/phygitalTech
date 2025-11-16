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
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "200px"
  },
  title: {
    margin: 0,
    color: "#666",
    fontSize: "14px"
  },
  value: {
    marginTop: "8px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#222"
  }
};
