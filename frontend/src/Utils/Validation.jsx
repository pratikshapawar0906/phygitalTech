// utils/validation.js

// Validate required fields
export const validateEmployeeForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.role || data.role.trim() === "") {
    errors.role = "Role is required";
  }

  if (!data.department || data.department.trim() === "") {
    errors.department = "Department is required";
  }

  if (!data.salary) {
    errors.salary = "Salary is required";
  } else if (isNaN(data.salary)) {
    errors.salary = "Salary must be a number";
  } else if (Number(data.salary) < 0) {
    errors.salary = "Salary cannot be negative";
  }

  return errors;
};

// Check if form has any validation errors
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};
