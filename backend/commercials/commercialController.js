// commercialController

const Commercial = require('./commercial');

// Create a new commercial property
const createCommercial = async (req, res) => {
  try {
    const newCommercial = new Commercial(req.body);
    const savedCommercial = await newCommercial.save();
    res.status(201).json(savedCommercial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all commercial properties
const getAllCommercials = async (req, res) => {
  try {
    const commercials = await Commercial.find();
    res.status(200).json(commercials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single commercial property by ID
const getCommercialById = async (req, res) => {
  try {
    const commercialId = req.params.id;

    if (!commercialId) {
      return res.status(400).json({ error: 'Invalid commercial ID' });
    }

    const commercial = await Commercial.findById(commercialId);

    if (!commercial) {
      return res.status(404).json({ error: 'Commercial not found' });
    }

    res.status(200).json(commercial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an commercial property by ID
const updateCommercialById = async (req, res) => {
  try {
    const updatedCommercial = await Commercial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCommercial) {
      return res.status(404).json({ error: 'Commercial not found' });
    }
    res.status(200).json(updatedCommercial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an commercial property by ID
const deleteCommercialById = async (req, res) => {
  try {
    const deletedCommercial = await Commercial.findByIdAndRemove(req.params.id);
    if (!deletedCommercial) {
      return res.status(404).json({ error: 'Commercial not found' });
    }
    res.status(200).json({ message: 'Commercial deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCommercial,
  getAllCommercials,
  getCommercialById,
  updateCommercialById,
  deleteCommercialById,
};
