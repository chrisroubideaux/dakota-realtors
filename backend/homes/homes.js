// homes routes
const express = require('express');
const homeRoutes = express.Router();

const {
  getAllHomes,
  getHomeById,
  createHome,
  updateHomeById,
  deleteHomeById,
} = require('./homeController');

// Create a new home
homeRoutes.post('/', createHome);

// Fetch all homes
homeRoutes.get('/', getAllHomes);

// Fetch home by id
homeRoutes.get('/:id', getHomeById);

// Update an existing home by id
homeRoutes.put('/:id', updateHomeById);

// Delete an existing home by id
homeRoutes.delete('/:id', deleteHomeById);

module.exports = homeRoutes;
{
  /*
const express = require('express');
const homeRoutes = express.Router();

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
    const newHome = new Home(req.body);

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
    const { id } = req.params;
    const updateFields = req.body;

    const updatedHome = await Home.findByIdAndUpdate(id, updateFields, {
      new: true,
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
    const { id } = req.params;

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
*/
}
