//homes routes
const express = require('express');
const homeRoutes = express.Router();
const Home = require('./home'); //

const {
  getAllHomes,
  getHomeById,
  createHome,
  updateHomeById,
  deleteHomeById,
} = require('./homeController');

// CREATE a new home

homeRoutes.post('/', async (req, res) => {
  try {
    // Create a new home based on the request body
    const newHome = new Home(req.body);

    // Save the new home to the database
    const savedHome = await newHome.save();

    res.status(201).json(savedHome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all homes

homeRoutes.get('/', async (req, res) => {
  try {
    const homes = await Home.find();
    res.status(200).json(homes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single home by ID

homeRoutes.get('/:id', async (req, res) => {
  try {
    const homeId = req.params.id;

    // Use Mongoose to find the home by its ID
    const home = await Home.findById(homeId);

    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }

    res.status(200).json(home);
  } catch (error) {
    console.error('Error fetching home by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing home by ID
homeRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the home ID from the route parameters
    const updateFields = req.body; // Get the fields to update from the request body

    // Find the home by ID and update the specified fields
    const updatedHome = await Home.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated home after the update
    });

    if (!updatedHome) {
      return res.status(404).json({ message: 'Home not found' });
    }

    return res.status(200).json(updatedHome);
  } catch (error) {
    console.error('Error updating home:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE an existing homet by ID

homeRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the home ID from the route parameters

    // Find the home by ID and remove it
    const deletedHome = await Home.findByIdAndRemove(id);

    if (!deletedHome) {
      return res.status(404).json({ message: 'Home not found' });
    }

    return res.status(200).json({ message: 'Home deleted successfully' });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = homeRoutes;
