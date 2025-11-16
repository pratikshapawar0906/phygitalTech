// utils/salaryUtils.js

// Calculate total salary of all employees
export const getTotalSalary = (employees) => {
  if (!employees || employees.length === 0) return 0;
  return employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
};

// Calculate average salary
export const getAverageSalary = (employees) => {
  if (!employees || employees.length === 0) return 0;
  return getTotalSalary(employees) / employees.length;
};

// Get highest salary
export const getHighestSalary = (employees) => {
  if (!employees || employees.length === 0) return 0;
  return Math.max(...employees.map((emp) => Number(emp.salary || 0)));
};

// Get lowest salary
export const getLowestSalary = (employees) => {
  if (!employees || employees.length === 0) return 0;
  return Math.min(...employees.map((emp) => Number(emp.salary || 0)));
};
