const Employee = require('../models/employee.model');

async function createEmployee(data) {
  return await Employee.create(data);
}

async function getAllEmployees() {
  return await Employee.find();
}

async function getEmployeeById(id) {
  return await Employee.findById(id);
}

async function updateEmployee(id, data) {
  return await Employee.findByIdAndUpdate(id, data, { new: true });
}

async function deleteEmployee(id) {
  return await Employee.findByIdAndDelete(id);
}

async function getEmployeesByType(type) {
  return await Employee.find({ employeeType: type });
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByType
};
