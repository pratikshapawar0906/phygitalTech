// src/context/EmployeeContext.jsx

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  apiFetchEmployees,
  apiAddEmployee,
  apiDeleteEmployee,
  apiUpdateEmployee,
  apiGetEmployeeById,
} from "../Services/StimulatedApi";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees at initial load
  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiFetchEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Add Employee
  const addEmployee = async (employee) => {
    setLoading(true);
    try {
      const newEmp = await apiAddEmployee(employee);
      setEmployees((prev) => [...prev, newEmp]);
      return newEmp;
    } catch (err) {
      setError("Failed to add employee.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update Employee
  const updateEmployee = async (id, updated) => {
    setLoading(true);
    try {
      await apiUpdateEmployee(id, updated);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === id ? { ...emp, ...updated } : emp
        )
      );
    } catch (err) {
      setError("Failed to update employee.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Optimistic Delete
  const deleteEmployee = async (id) => {
    // Optimistic UI Update:
    const previousEmployees = [...employees];
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));

    try {
      await apiDeleteEmployee(id);
      // success -> permanent
    } catch (err) {
      // rollback UI
      setEmployees(previousEmployees);
      setError("Delete failed — restored employee.");
    }
  };

  // Get Single Employee
  const getEmployeeById = async (id) => {
    try {
      return await apiGetEmployeeById(id);
    } catch (err) {
      setError("Employee not found.");
      return null;
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
        reload: loadEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

// Custom Hook
export function useEmployees() {
  return useContext(EmployeeContext);
}
