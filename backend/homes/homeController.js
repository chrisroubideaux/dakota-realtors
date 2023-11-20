// home controller
const Home = require('./home');

// Create a new home
const createHome = async (req, res) => {
  try {
    const newHome = new Home(req.body);
    const savedHome = await newHome.save();
    res.status(201).json(savedHome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all homes
const getAllHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.status(200).json(homes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single home by ID
const getHomeById = async (req, res) => {
  try {
    const homeId = req.params.id;

    if (!homeId) {
      return res.status(400).json({ error: 'Invalid home ID' });
    }

    const home = await Home.findById(homeId);

    if (!home) {
      return res.status(404).json({ error: 'Home not found' });
    }

    res.status(200).json(home);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
{
  /*
const getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    res.status(200).json(apartment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
}
// Update an home by ID
const updateHomeById = async (req, res) => {
  try {
    const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedHome) {
      return res.status(404).json({ error: 'Home not found' });
    }
    res.status(200).json(updatedHome);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an home by ID
const deleteHomeById = async (req, res) => {
  try {
    const deletedHome = await Home.findByIdAndRemove(req.params.id);
    if (!deletedHome) {
      return res.status(404).json({ error: 'Home not found' });
    }
    res.status(200).json({ message: 'Home deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createHome,
  getAllHomes,
  getHomeById,
  updateHomeById,
  deleteHomeById,
};
