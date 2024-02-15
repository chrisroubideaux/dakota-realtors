// agent controller

const Agent = require('./agent');

// Create a new agent
const createAgent = async (req, res) => {
  try {
    const newAgent = new Apartment(req.body);
    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single agent by ID
const getAgentById = async (req, res) => {
  try {
    const agentId = req.params.id;
    // Check if the agent ID is valid
    if (!agentId) {
      return res.status(400).json({ error: 'Invalid agent ID' });
    }
    // Find the agent by ID
    const agents = await Agent.findById(agentId);

    if (!agents) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    // Return the agent
    res.status(200).json(agents);
    // Error handling response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an agent by ID
const updateAgentById = async (req, res) => {
  // Check if the agent ID is valid
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    // Check if the agent was found and updated
    if (!updatedAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    // Return the updated agent
    res.status(200).json(updatedAgent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an agent by ID
const deleteAgentById = async (req, res) => {
  // Check if the agent ID is valid
  try {
    const deletedAgent = await Agent.findByIdAndRemove(req.params.id);
    // Check if the agent was found and deleted
    if (!deletedAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    // Return the deleted agent
    res.status(200).json({ message: 'Agent deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgentById,
  deleteAgentById,
};
