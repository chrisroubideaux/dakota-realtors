//agents routes
const express = require('express');
const agentRoutes = express.Router();

const {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgentById,
  deleteAgentById,
  register,
  login,
} = require('./agentController');

const { requestTimeOff } = require('./agentController');

// Create a new agent
agentRoutes.post('/', createAgent);

// Get all agent
agentRoutes.get('/', getAllAgents);

// Get a single agent by ID
agentRoutes.get('/:id', getAgentById);

// Update an existing agent by ID
agentRoutes.put('/:id', updateAgentById);

// Delete an existing agent by ID
agentRoutes.delete('/:id', deleteAgentById);

// Register a new agent
agentRoutes.post('/register', register);

// Login an agent
agentRoutes.post('/login', login);

module.exports = agentRoutes;
