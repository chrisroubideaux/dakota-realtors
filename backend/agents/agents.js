//agents routes
const express = require('express');
const agentRoutes = express.Router();
const Agent = require('./agent'); //

const {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgentById,
  deleteAgentById,
} = require('./agentController');

// CREATE a new agent

agentRoutes.post('/', async (req, res) => {
  try {
    // Create a new apartment based on the request body
    const newAgent = new Agent(req.body);

    // Save the new apartment to the database
    const savedAgent = await newAgent.save();

    res.status(201).json(savedAgent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all agents

agentRoutes.get('/', async (req, res) => {
  // Get all apartments from the database
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
    // Error handling response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single agent by ID

agentRoutes.get('/:id', async (req, res) => {
  // Check if the agent ID is valid
  try {
    const agentId = req.params.id;

    // Use Mongoose to find the agent by its ID
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    // Update an agent by ID
    res.status(200).json(agent);
  } catch (error) {
    console.error('Error fetching apartment by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing agent by ID
agentRoutes.put('/:id', async (req, res) => {
  // Check if the agent ID is valid
  try {
    const { id } = req.params;
    // Get the ID of the agent to be updated from the request parameters
    const updateFields = req.body;

    // Find the agent by ID and update the specified fields
    const updatedAgent = await Agent.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated agent data after the update
    });
    // Check if the agent was found and updated
    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    // Return the updated agent
    return res.status(200).json(updatedAgent);
  } catch (error) {
    console.error('Error updating agent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE an existing agent by ID

agentRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the agent ID from the route parameters

    // Find the agent by ID and remove it
    const deletedAgent = await Agent.findByIdAndRemove(id);
    // Check if the agent was found and deleted
    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    // Return a success message if the deletion succeeded
    return res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Error deleting agent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = agentRoutes;
