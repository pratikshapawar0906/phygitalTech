import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Employee Portal</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/employees" style={styles.link}>Employees</Link>
        <Link to="/add-employee" style={styles.addBtn}>+ Add Employee</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#333",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white"
  },
  logo: { margin: 0 },
  links: { display: "flex", gap: "20px", alignItems: "center" },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px"
  },
  addBtn: {
    background: "#4CAF50",
    padding: "6px 14px",
    borderRadius: "6px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  }
};
