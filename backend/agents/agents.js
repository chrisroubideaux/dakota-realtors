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
    const newAgent = new Agent(req.body);

    const savedAgent = await newAgent.save();

    res.status(201).json(savedAgent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all agents

agentRoutes.get('/', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single agent by ID

agentRoutes.get('/:id', async (req, res) => {
  try {
    const agentId = req.params.id;

    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.status(200).json(agent);
  } catch (error) {
    console.error('Error fetching apartment by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing agent by ID
agentRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updateFields = req.body;

    const updatedAgent = await Agent.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    return res.status(200).json(updatedAgent);
  } catch (error) {
    console.error('Error updating agent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE an existing agent by ID

agentRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAgent = await Agent.findByIdAndRemove(id);

    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    return res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Error deleting agent:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = agentRoutes;
