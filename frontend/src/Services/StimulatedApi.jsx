// src/services/simulatedApi.js

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "./EmployeeServices";

/**
 * Simulate API response delay for realism.
 */
function simulate(delay = 700) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

/** Simulated API to fetch all employees */
export async function apiFetchEmployees() {
  await simulate();
  return getEmployees();
}

/** Simulated API to add a new employee */
export async function apiAddEmployee(employee) {
  await simulate();
  return addEmployee(employee);
}

/** Simulated API to update employee */
export async function apiUpdateEmployee(id, updatedEmployeeData) {
  await simulate();
  return updateEmployee(id, updatedEmployeeData);
}

/** Simulated API to delete employee */
export async function apiDeleteEmployee(id) {
  await simulate();
  return deleteEmployee(id);
}

/** Simulated API to fetch employee by ID */
export async function apiGetEmployeeById(id) {
  await simulate();
  return getEmployeeById(id);
}
