const mongoose = require('mongoose');
const Employee = require('../src/models/employee.model');
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByType
} = require('../src/services/employee.service');

describe('Employee Service', () => {

  let employeeId;

  it('should create a new employee', async () => {
    const employee = await createEmployee({
      firstName: 'Luis',
      lastName: 'Ramírez',
      middleName: 'González',
      employeeType: 'technician'
    });

    employeeId = employee._id;
    expect(employee.firstName).toBe('Luis');
    expect(employee.employeeType).toBe('technician');
  });

  it('should retrieve all employees', async () => {
    const employees = await getAllEmployees();
    expect(Array.isArray(employees)).toBe(true);
    expect(employees.length).toBeGreaterThan(0);
  });

  it('should retrieve a single employee by ID', async () => {
    const employee = await getEmployeeById(employeeId);
    expect(employee).toBeTruthy();
    expect(employee._id.toString()).toBe(employeeId.toString());
  });

  it('should update an employee', async () => {
    const updated = await updateEmployee(employeeId, {
      firstName: 'Luis Eduardo'
    });
    expect(updated.firstName).toBe('Luis Eduardo');
  });

  it('should get employees by type', async () => {
    const technicians = await getEmployeesByType('technician');
    expect(technicians.every(e => e.employeeType === 'technician')).toBe(true);
  });

  it('should delete an employee', async () => {
    const deleted = await deleteEmployee(employeeId);
    expect(deleted).toBeTruthy();

    const findDeleted = await getEmployeeById(employeeId);
    expect(findDeleted).toBeNull();
  });
});