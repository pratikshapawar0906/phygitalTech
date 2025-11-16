// src/hooks/useEmployees.js

import { useEffect, useMemo, useState } from "react";
import { useEmployees as useEmployeeContext } from "../Context/EmployeeProvider";

export default function useEmployeeS() {
  const { employees } = useEmployeeContext();

  // Search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | inactive
  const [positionFilter, setPositionFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all"); // <50k | 50–100k | >100k

  // Sorting
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const pageSize = 5;
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Main filtering + sorting + pagination logic
  const processedEmployees = useMemo(() => {
    let data = [...employees];

    // Filter: status
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      data = data.filter((emp) => emp.status === (isActive ? "Active" : "Inactive"));
    }

    // Filter: position
    if (positionFilter !== "all") {
      data = data.filter((emp) => emp.position === positionFilter);
    }

    // Filter: salary range
    if (salaryFilter !== "all") {
      data = data.filter((emp) => {
        if (salaryFilter === "lt50") return emp.salary < 50000;
        if (salaryFilter === "50to100") return emp.salary >= 50000 && emp.salary <= 100000;
        if (salaryFilter === "gt100") return emp.salary > 100000;
        return true;
      });
    }

    // Search
    if (debouncedSearch.trim() !== "") {
      const term = debouncedSearch.toLowerCase();
      data = data.filter(
        (emp) =>
          emp.name.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term) ||
          emp.position.toLowerCase().includes(term)
      );
    }

    // Sorting
    data.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Sort by date
      if (sortField === "dateJoined") {
        valA = new Date(a.dateJoined);
        valB = new Date(b.dateJoined);
      }

      // Numeric sort
      if (sortField === "salary") {
        valA = Number(a.salary);
        valB = Number(b.salary);
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [
    employees,
    debouncedSearch,
    statusFilter,
    positionFilter,
    salaryFilter,
    sortField,
    sortOrder,
  ]);

  // Pagination result
  const paginatedEmployees = useMemo(() => {
    const start = (page - 1) * pageSize;
    return processedEmployees.slice(start, start + pageSize);
  }, [processedEmployees, page]);

  const totalPages = Math.ceil(processedEmployees.length / pageSize);

  return {
    employees: paginatedEmployees,
    totalEmployees: processedEmployees.length,

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
  };
}
