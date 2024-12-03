// agent controller
const Agent = require('./agent');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Define allowed fields for update
const allowedUpdateFields = [
  'name',
  'phone',
  'address',
  'city',
  'state',
  'profileImage',
  'endDate',
  'isEmployed',
  'wage',
  'emergencyContacts',
];

// Function to validate update fields
const validateUpdateFields = (updateFields) => {
  return Object.keys(updateFields).every((field) =>
    allowedUpdateFields.includes(field)
  );
};
// Create new agent
const createAgent = async (req, res) => {
  try {
    const newAgent = new Employee(req.body);
    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Fetch all agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Fetch agent by id
const getAgentById = async (req, res) => {
  try {
    const agentId = req.params.id;
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(agent);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update agent by id
const updateAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Update Request Body:', req.body);
    const updatedAgent = await Agent.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAgent) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    console.log('Updated Agent:', updatedAgent);
    res.status(200).json(updatedAgent);
  } catch (error) {
    console.error('Update Error:', error);
    res
      .status(500)
      .json({ message: 'Failed to update employee', error: error.message });
  }
};
// Delete agent
const deleteAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAgent = await Agent.findByIdAndDelete(id);

    if (!deletedAgent) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete admin', error: error.message });
  }
};

// Time off request functions
const requestTimeOff = async (req, res) => {
  try {
    const agentId = req.params.id;
    const { startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const timeOffRequest = { startDate, endDate, reason };
    agent.timeOffRequests.push(timeOffRequest);
    const updatedAgent = await agent.save();
    res.status(201).json(updatedAgent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update timeoff request
const updateTimeOffRequest = async (req, res) => {
  try {
    const agentId = req.params.id;
    const requestId = req.params.requestId;
    const updatedRequest = req.body;

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const requestIndex = agent.timeOffRequests.findIndex(
      (request) => request._id.toString() === requestId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ error: 'Time off request not found' });
    }

    agent.timeOffRequests[requestIndex] = {
      ...agent.timeOffRequests[requestIndex],
      ...updatedRequest,
    };

    const updatedAgent = await agent.save();
    res.status(200).json(updatedAgent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Delete timeoff request
const deleteTimeOffRequest = async (req, res) => {
  try {
    const agentId = req.params.id;
    const requestId = req.params.requestId;

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const requestIndex = agent.timeOffRequests.findIndex(
      (request) => request._id.toString() === requestId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ error: 'Time off request not found' });
    }

    agent.timeOffRequests.splice(requestIndex, 1);

    const updatedEmployee = await agent.save();
    res.status(200).json(updatedEmployee);
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
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgentById,
  deleteAgentById,
  requestTimeOff,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  register,
  login,
};
