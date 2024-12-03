// commercial routes
const express = require('express');
const commercialRoutes = express.Router();

const {
  getAllCommercials,
  getCommercialById,
  createCommercial,
  updateCommercialById,
  deleteCommercialById,
} = require('./commercialController');

// Create a new commercial property
commercialRoutes.post('/', createCommercial);

// Get all commercial properties
commercialRoutes.get('/', getAllCommercials);

// Get commercial property by id
commercialRoutes.get('/:id', getCommercialById);

// Update an existing commercial by ID
commercialRoutes.put('/:id', updateCommercialById);

// Delete an existing commercial property by ID
commercialRoutes.delete('/:id', deleteCommercialById);

module.exports = commercialRoutes;
