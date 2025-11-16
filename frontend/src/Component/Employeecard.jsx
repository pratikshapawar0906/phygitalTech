import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeCard({ employee }) {
  return (
    <div style={styles.card}>
      <h3>{employee.name}</h3>
      <p><b>Role:</b> {employee.role}</p>
      <p><b>Department:</b> {employee.department}</p>

      <Link to={`/employees/${employee.id}`} style={styles.button}>
        View Details
      </Link>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "16px"
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    background: "#2196F3",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px"
  }
};
