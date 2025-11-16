// src/pages/Dashboard.jsx

import { useEmployees } from "../Context/EmployeeProvider";
import  StatsCard  from "../Component/StatsCard";


export default function Dashboard() {
  const { employees } = useEmployees();

  const total = employees.length;
  const active = employees.filter(e => e.status === "Active").length;
  const inactive = employees.filter(e => e.status === "Inactive").length;

  const avgSalary = total
    ? Math.round(employees.reduce((a, b) => a + Number(b.salary), 0) / total)
    : 0;

  const recent = employees.filter(e => {
    const days = (Date.now() - new Date(e.dateJoined)) / (1000 * 3600 * 24);
    return days <= 30;
  }).length;

  const positionMap = {};
  employees.forEach(emp => {
    positionMap[emp.position] = (positionMap[emp.position] || 0) + 1;
  });

  return (
    <div className="p-5">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <StatsCard title="Total Employees" value={total} />
        <StatsCard title="Active" value={active} />
        <StatsCard title="Inactive" value={inactive} />
        <StatsCard title="Avg Salary" value={`₹${avgSalary}`} />
        <StatsCard title="Joined (30 days)" value={recent} />
      </div>

      <h3 className="mt-4">Employees by Position</h3>
      <ul>
        {Object.keys(positionMap).map(pos => (
          <li key={pos}>
            {pos}: <b>{positionMap[pos]}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
