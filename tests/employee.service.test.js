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
      employeeType: 'tecnico',
      imagePath: 'https://example.com/employees/luis.jpg'
    });

    employeeId = employee._id;
    expect(employee.firstName).toBe('Luis');
    expect(employee.employeeType).toBe('tecnico');
    expect(employee.imagePath).toMatch(/^https:\/\//);
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
      firstName: 'Luis Eduardo',
      imagePath: 'https://example.com/employees/luis_updated.jpg'
    });
    expect(updated.firstName).toBe('Luis Eduardo');
    expect(updated.imagePath).toContain('luis_updated');
  });

  it('should get employees by type', async () => {
    const technicians = await getEmployeesByType('tecnico');
    expect(technicians.every(e => e.employeeType === 'tecnico')).toBe(true);
  });

  it('should delete an employee', async () => {
    const deleted = await deleteEmployee(employeeId);
    expect(deleted).toBeTruthy();

    const findDeleted = await getEmployeeById(employeeId);
    expect(findDeleted).toBeNull();
  });
});