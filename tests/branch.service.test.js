const mongoose = require('mongoose');
const Branch = require('../src/models/branch.model');
const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch
} = require('../src/services/branch.service');

describe('Branch Service', () => {

  let branchId;

  it('should create a new branch', async () => {
    const branch = await createBranch({
      name: 'Sucursal Test',
      address: 'Calle Falsa 123',
      city: 'La Paz',
      phones: ['+59170000000'],
      openingHours: [{ day: 'Monday', from: '08:00', to: '17:00' }],
      mapUrl: 'https://maps.google.com/?q=-16.5,-68.15'
    });

    branchId = branch._id;
    expect(branch.name).toBe('Sucursal Test');
  });

  it('should retrieve all branches', async () => {
    const branches = await getAllBranches();
    expect(branches.length).toBeGreaterThan(0);
  });

  it('should retrieve a branch by ID', async () => {
    const branch = await getBranchById(branchId);
    expect(branch).toBeTruthy();
    expect(branch._id.toString()).toBe(branchId.toString());
  });

  it('should update a branch', async () => {
    const updated = await updateBranch(branchId, {
      name: 'Sucursal Actualizada'
    });
    expect(updated.name).toBe('Sucursal Actualizada');
  });

  it('should delete a branch', async () => {
    const deleted = await deleteBranch(branchId);
    expect(deleted).toBeTruthy();

    const findDeleted = await getBranchById(branchId);
    expect(findDeleted).toBeNull();
  });
});