// src/pages/EmployeeDetails.jsx

import { useParams, Link } from "react-router-dom";
import { useEmployees } from "../Context/EmployeeProvider";

export default function EmployeeDetails() {
  const { id } = useParams();
  const { employees, deleteEmployee } = useEmployees();

  const emp = employees.find(e => e.id === id);

  if (!emp) return <p className="p-5">Employee not found.</p>;

  return (
    <div className="p-5">
      <h2>{emp.name}</h2>
      <p><b>Email:</b> {emp.email}</p>
      <p><b>Position:</b> {emp.position}</p>
      <p><b>Salary:</b> ₹{emp.salary}</p>
      <p><b>Status:</b> {emp.status}</p>
      <p><b>Date Joined:</b> {new Date(emp.dateJoined).toLocaleDateString()}</p>

      <h3 className="mt-4">Status Timeline</h3>
      <ul>
        {emp.statusHistory?.map((h, index) => (
          <li key={index}>
            {new Date(h.date).toLocaleDateString()} — <b>{h.oldStatus}</b> → <b>{h.newStatus}</b>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Link className="btn" to="/employees">Back</Link>
        <button
          className="delete-btn"
          onClick={() => {
            deleteEmployee(emp.id);
            window.location.href = "/employees";
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
