import { Routes, Route } from "react-router-dom";

import Dashboard from "../Pages/Dashboard";
import EmployeeList from "../Pages/EmployeeList";
import AddEmployee from "../Pages/AddEmployee";
import EmployeeDetails from "../Pages/EmployeeDetail";

function AppRouter() {
  return (
    <div className="container">
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Employees List */}
        <Route path="/employees" element={<EmployeeList />} />

        {/* Add Employee */}
        <Route path="/add-employee" element={<AddEmployee />} />

        {/* Employee Details */}
        <Route path="/employee/:id" element={<EmployeeDetails />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <h2 style={{ padding: "40px", color: "gray" }}>
              Page not found (404)
            </h2>
          }
        />
      </Routes>
    </div>
  );
}

export default AppRouter;
