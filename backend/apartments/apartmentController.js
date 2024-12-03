//apartmentsController.js
const Apartment = require('./apartment');

// Create a new apartment
const createApartment = async (req, res) => {
  try {
    const newApartment = new Apartment(req.body);
    const savedApartment = await newApartment.save();
    res.status(201).json(savedApartment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all apartments
const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();

    res.status(200).json(apartments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single apartment by ID
const getApartmentById = async (req, res) => {
  try {
    const apartmentId = req.params.id;

    if (!apartmentId) {
      return res.status(400).json({ error: 'Invalid apartment ID' });
    }

    const apartment = await Apartment.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    res.status(200).json(apartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an apartment by ID
const updateApartmentById = async (req, res) => {
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedApartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    res.status(200).json(updatedApartment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an apartment by ID
const deleteApartmentById = async (req, res) => {
  try {
    const deletedApartment = await Apartment.findByIdAndRemove(req.params.id);
    if (!deletedApartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    res.status(200).json({ message: 'Apartment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createApartment,
  getAllApartments,
  getApartmentById,
  updateApartmentById,
  deleteApartmentById,
};
