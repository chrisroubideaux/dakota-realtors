// admin controller
const Admin = require('./adminModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const allowedUpdateFields = [
  'name',
  'phone',
  'address',
  'city',
  'state',
  'image',
  'hireDate',
  'endDate',
  'wage',
];

// Function to check if a string contains at least one digit and one special character
function isPasswordValid(password) {
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*]/;

  return (
    password.length >= 10 &&
    digitRegex.test(password) &&
    specialCharRegex.test(password)
  );
}
// Validate updated fields
const validateUpdateFields = (updateFields) => {
  return Object.keys(updateFields).every((field) =>
    allowedUpdateFields.includes(field)
  );
};
// Create new admin
const createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Fetch all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get admin by id
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid admin ID' });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const admin = await Admin.findById(objectId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch admin', error: error.message });
  }
};
// Update admin by id
const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Update Request Body:', req.body);

    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    console.log('Updated Admin:', updatedAdmin);
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Update Error:', error);
    res
      .status(500)
      .json({ message: 'Failed to update admin', error: error.message });
  }
};
// Delete admin by id
const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete admin', error: error.message });
  }
};

// Get all pending time-off requests
const getPendingRequests = async (req, res) => {
  try {
    // Fetch pending requests for admins
    const admins = await Admin.find(
      { 'timeOffRequests.status': 'pending' },
      'name timeOffRequests'
    );
    const pendingRequests = admins.flatMap((admin) =>
      admin.timeOffRequests
        .filter((request) => request.status === 'pending')
        .map((request) => ({
          adminId: admin._id,
          adminName: admin.name,
          ...request.toObject(),
        }))
    );

    // Fetch pending requests for employees
    const agents = await Agent.find(
      { 'timeOffRequests.status': 'pending' },
      'name timeOffRequests'
    );
    const pendingAgentRequests = agents.flatMap((agent) =>
      agent.timeOffRequests
        .filter((request) => request.status === 'pending')
        .map((request) => ({
          agentId: agent._id,
          agentName: agent.name,
          ...request.toObject(),
        }))
    );

    const allPendingRequests = [...pendingRequests, ...pendingAgentRequests];

    res.status(200).json(allPendingRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update resquest status
const updateRequestStatus = async (req, res) => {
  const { adminId, requestId } = req.params;
  const { status } = req.body;

  if (!['approved', 'denied'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const admin = await Admin.findOneAndUpdate(
      { _id: adminId, 'timeOffRequests._id': requestId },
      { $set: { 'timeOffRequests.$.status': status } },
      { new: true }
    );

    if (!admin) {
      return res
        .status(404)
        .json({ error: 'Admin or time-off request not found' });
    }

    // Update request status in Employee (assuming employeeId is stored in the request)
    const agent = await agent.findOneAndUpdate(
      { _id: admin.timeOffRequests.id, 'timeOffRequests._id': requestId },
      { $set: { 'timeOffRequests.$.status': status } },
      { new: true }
    );

    if (!agent) {
      return res.status(404).json({
        error: 'Employee or time-off request not found in Employee model',
      });
    }

    res.status(200).json({ message: 'Request status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Register new admin

const register = async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one number and one special character.',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password and password confirmation do not match.',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = new Admin({ email, password: hashedPassword, fullName });
    await newAdmin.save();

    const token = jwt.sign({ _id: newAdmin._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: 'Admin user registered successfully',
      admin: newAdmin,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login admin

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    res.status(200).json({ token, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  updateRequestStatus,
  getPendingRequests,
  register,
  login,
};
