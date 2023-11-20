// apartment routes
const express = require('express');
const apartmentRoutes = express.Router();
const Apartment = require('./apartment'); //

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
    // Create a new apartment based on the request body
    const newApartment = new Apartment(req.body);

    // Save the new apartment to the database
    const savedApartment = await newApartment.save();

    res.status(201).json(savedApartment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all apartments

apartmentRoutes.get('/', async (req, res) => {
  // Get all apartments from the database
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

    // Use Mongoose to find the apartment by its ID
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
    const { id } = req.params; // Get the apartment ID from the route parameters
    const updateFields = req.body; // Get the fields to update from the request body

    // Find the apartment by ID and update the specified fields
    const updatedApartment = await Apartment.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true, // Return the updated apartment after the update
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
    const { id } = req.params; // Get the apartment ID from the route parameters

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
