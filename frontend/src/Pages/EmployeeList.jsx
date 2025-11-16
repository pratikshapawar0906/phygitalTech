// src/pages/EmployeeList.jsx

import { Link } from "react-router-dom";
import useEmployeeS from "../Hooks/useEmployeeS";
import { useEmployees as useContextEmployees } from "../Context/EmployeeProvider";
import "../Style/form.css"

export default function EmployeeList() {
  const {
    employees,
    totalEmployees,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    positionFilter,
    setPositionFilter,

    salaryFilter,
    setSalaryFilter,

    sortField,
    sortOrder,
    setSortField,
    setSortOrder,

    page,
    setPage,
    totalPages,
  } = useEmployeeS();

  const { deleteEmployee } = useContextEmployees();

  return (
    <div className="p-5">
      <h2>Employees</h2>

      {/* Search & Filters */}
      <div className="filters">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Status: All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
          <option value="all">Position: All</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>

        <select value={salaryFilter} onChange={(e) => setSalaryFilter(e.target.value)}>
          <option value="all">Salary: All</option>
          <option value="lt50">Below 50k</option>
          <option value="50to100">50k - 100k</option>
          <option value="gt100">Above 100k</option>
        </select>

        {/* Sorting */}
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="name">Sort by: Name</option>
          <option value="salary">Salary</option>
          <option value="dateJoined">Join Date</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Table */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Date Joined</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>₹{emp.salary}</td>
              <td>{emp.status}</td>
              <td>{new Date(emp.dateJoined).toLocaleDateString()}</td>
              <td>
                <Link to={`/employees/${emp.id}`}>View</Link>
                <button
                  className="delete-btn"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page} of {totalPages}</span>

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      <div className="mt-4">
        <Link to="/add-employee" className="btn-primary">Add Employee</Link>
      </div>
    </div>
  );
}
