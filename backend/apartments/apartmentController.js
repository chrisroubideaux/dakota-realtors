//apartmentsController.js
const Apartment = require('./apartment'); // Correct import

// Create a new apartment
const createApartment = async (req, res) => {
  // Create a new apartment based on the request body
  try {
    const newApartment = new Apartment(req.body);
    const savedApartment = await newApartment.save();
    res.status(201).json(savedApartment);
    // Error handling response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all apartments
const getAllApartments = async (req, res) => {
  // Get all apartments from the database
  try {
    const apartments = await Apartment.find();
    // Return the apartments
    res.status(200).json(apartments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single apartment by ID
const getApartmentById = async (req, res) => {
  // Check if the apartment ID is valid
  try {
    const apartmentId = req.params.id;
    // Check if the apartment ID is valid
    if (!apartmentId) {
      return res.status(400).json({ error: 'Invalid apartment ID' });
    }
    // Find the apartment by ID
    const apartment = await Apartment.findById(apartmentId);
    // Return the apartment
    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    // Return the apartment
    res.status(200).json(apartment);
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
// Update an apartment by ID
const updateApartmentById = async (req, res) => {
  // Check if the apartment ID is valid
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    // Check if the apartment was found and updated
    if (!updatedApartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    // Return the updated apartment
    res.status(200).json(updatedApartment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an apartment by ID
const deleteApartmentById = async (req, res) => {
  // Check if the apartment ID is valid then delete
  try {
    const deletedApartment = await Apartment.findByIdAndRemove(req.params.id);
    if (!deletedApartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    // Return the deleted apartment
    res.status(200).json({ message: 'Apartment deleted' });
    // Error handling response
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
