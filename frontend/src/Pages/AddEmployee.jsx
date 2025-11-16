// src/pages/AddEmployee.jsx

import { useState } from "react";
import { useEmployees } from "../Context/EmployeeProvider";
import { checkUniqueEmail } from "../Services/EmployeeServices";
import "../Style/form.css"

export default function AddEmployee() {
  const { addEmployee } = useEmployees();

  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
    dateJoined: "",
    status: "Active",
  });

  const [error, setError] = useState("");
  const [emailChecking, setEmailChecking] = useState(false);
  const [customPosition, setCustomPosition] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validate email uniqueness
    setEmailChecking(true);
    const emailExists = await checkUniqueEmail(form.email);
    setEmailChecking(false);

    if (emailExists) {
      setError("Email already exists");
      return;
    }
    let finalForm = { ...form };

    // If user added custom position
    if (form.position === "Other") {
      finalForm.position = customPosition.trim();
    }

    // Create new employee
    addEmployee(finalForm);

    alert("Employee added");
    window.location.href = "/employees";
  }

  return (
    <div className="p-5">
      <h2>Add Employee</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" required />
        {emailChecking && <small>Checking email...</small>}

        <label>Position</label>
          <select
            name="position"
            value={form.position}
            onChange={(e) => {
              handleChange(e);
          
              // Show input when "Other" is selected
              if (e.target.value === "Other") {
                setCustomPosition("");
              }
            }}
            required
          >
            <option value="">Select Position</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>Manager</option>
            <option value="Other"> Add New Position</option>
          </select>
          
          {form.position === "Other" && (
            <input
              type="text"
              placeholder="Enter new position"
              value={customPosition}
              onChange={(e) => setCustomPosition(e.target.value)}
              required
              className="mt-2"
            />
          )}


        <label>Salary</label>
        <input name="salary" value={form.salary} onChange={handleChange} type="number" required />

        <label>Join Date</label>
        <input name="dateJoined" value={form.dateJoined} onChange={handleChange} type="date" required />

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button className="btn-primary mt-3" type="submit">Add Employee</button>
      </form>
    </div>
  );
}
