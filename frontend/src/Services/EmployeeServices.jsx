// src/services/employeeService.js

const STORAGE_KEY = "employees";

/** Get all employees from LocalStorage */
export function getEmployees() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/** Save full employee list to storage */
export function saveEmployees(employees) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

/** Add new employee */
export function addEmployee(employee) {
  const employees = getEmployees();
  const newEmployee = {
    id: Date.now().toString(),
    ...employee,
  };
  employees.push(newEmployee);
  saveEmployees(employees);
  return newEmployee;
}

/** Update employee by ID */
export function updateEmployee(id, updatedData) {
  let employees = getEmployees();
  employees = employees.map(emp =>
    emp.id === id ? { ...emp, ...updatedData } : emp
  );
  saveEmployees(employees);
}

/** Delete employee by ID */
export function deleteEmployee(id) {
  let employees = getEmployees();
  employees = employees.filter(emp => emp.id !== id);
  saveEmployees(employees);
}

/** Get single employee */
export function getEmployeeById(id) {
  const employees = getEmployees();
  return employees.find(emp => emp.id === id);
}

export function checkUniqueEmail(email) {
  const employees = getEmployees();
  return employees.some(emp => emp.email === email);
}

