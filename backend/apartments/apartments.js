// apartment routes
const express = require('express');
const apartmentRoutes = express.Router();

const {
  createApartment,
  getAllApartments,
  getApartmentById,
  updateApartmentById,
  deleteApartmentById,
} = require('./apartmentController');

// Create a new apartment
apartmentRoutes.post('/', createApartment);

// Get all apartments
apartmentRoutes.get('/', getAllApartments);

// Get a single apartment by ID
apartmentRoutes.get('/:id', getApartmentById);

// Update an existing apartment by ID
apartmentRoutes.put('/:id', updateApartmentById);

// Delete an existing apartment by ID
apartmentRoutes.delete('/:id', deleteApartmentById);

module.exports = apartmentRoutes;

{
  /*
const express = require('express');
const apartmentRoutes = express.Router();
const Apartment = require('./apartment');

const {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartmentById,
  deleteApartmentById,
} = require('./apartmentController');

// CREATE a new apartment

apartmentRoutes.post('/', async (req, res) => {
  try {
    const newApartment = new Apartment(req.body);

    const savedApartment = await newApartment.save();

    res.status(201).json(savedApartment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all apartments

apartmentRoutes.get('/', async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single apartment by ID

apartmentRoutes.get('/:id', async (req, res) => {
  try {
    const apartmentId = req.params.id;

    const apartment = await Apartment.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    res.status(200).json(apartment);
  } catch (error) {
    console.error('Error fetching apartment by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing apartment by ID
apartmentRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Find the apartment by ID and update the specified fields
    const updatedApartment = await Apartment.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
      }
    );

    if (!updatedApartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    return res.status(200).json(updatedApartment);
  } catch (error) {
    console.error('Error updating apartment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE an existing apartment by ID

apartmentRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the apartment by ID and remove it
    const deletedApartment = await Apartment.findByIdAndRemove(id);

    if (!deletedApartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    return res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = apartmentRoutes;
*/
}
