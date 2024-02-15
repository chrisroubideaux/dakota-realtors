// commercial routes
const express = require('express');
const commercialRoutes = express.Router();
const Commercial = require('./commercial');

const {
  getAllCommercials,
  getCommercialById,
  createCommercial,
  updateCommercialById,
  deleteCommercialById,
} = require('./commercialController');

// CREATE a new commercial property

commercialRoutes.post('/', async (req, res) => {
  try {
    const newCommercial = new Commercial(req.body);

    const savedCommercial = await newCommercial.save();

    res.status(201).json(savedCommercial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all commercial properties

commercialRoutes.get('/', async (req, res) => {
  try {
    const commercials = await Commercial.find();
    res.status(200).json(commercials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single commercial property by ID

commercialRoutes.get('/:id', async (req, res) => {
  try {
    const commercialId = req.params.id;

    const commercail = await Commercial.findById(commercialId);

    if (!commercail) {
      return res.status(404).json({ error: 'Commercial property not found' });
    }

    res.status(200).json(commercail);
  } catch (error) {
    console.error('Error fetching commercial property by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing commercialby ID
commercialRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Find the commercial property by ID and update the specified fields
    const updatedCommercial = await Commercial.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
      }
    );

    if (!updatedCommercial) {
      return res.status(404).json({ message: 'Commercial not found' });
    }

    return res.status(200).json(updatedCommercial);
  } catch (error) {
    console.error('Error updating commercial:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE an existing commercial by ID

commercialRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the commercial by ID and remove it
    const deletedCommercial = await Commercial.findByIdAndRemove(id);

    if (!deletedCommercial) {
      return res.status(404).json({ message: 'Commercial property not found' });
    }

    return res
      .status(200)
      .json({ message: 'Commercial property deleted successfully' });
  } catch (error) {
    console.error('Error deleting commercial property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = commercialRoutes;
