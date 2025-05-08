const Branch = require('../models/branch.model');

async function createBranch(data) {
  return await Branch.create(data);
}

async function getAllBranches() {
  return await Branch.find();
}

async function getBranchById(id) {
  return await Branch.findById(id);
}

async function updateBranch(id, data) {
  return await Branch.findByIdAndUpdate(id, data, { new: true });
}

async function deleteBranch(id) {
  return await Branch.findByIdAndDelete(id);
}

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch
};
