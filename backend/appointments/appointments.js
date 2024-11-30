const express = require('express');
const appointmentRoutes = express.Router();
const {
  getAllAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
  fetchAvailableSlots,
} = require('./appointmentController');
const authenticateUser = require('../routes/authenticateUser');
appointmentRoutes.get(
  '/available-slots',
  authenticateUser,
  fetchAvailableSlots
);

appointmentRoutes.post('/', authenticateUser, createAppointment);
appointmentRoutes.get('/', authenticateUser, getAllAppointments);
appointmentRoutes.get('/:id', authenticateUser, getAppointmentById);
appointmentRoutes.put('/:id', authenticateUser, updateAppointmentById);
appointmentRoutes.delete('/:id', authenticateUser, deleteAppointmentById);

module.exports = appointmentRoutes;

{
  /*
// appointment routes
const express = require('express');
const appointmentRoutes = express.Router();
const Appointment = require('./appointment');

const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
} = require('./appointmentController');

// Create a new agent
appointmentRoutes.post('/', createAppointment);

// Get all agent
appointmentRoutes.get('/', getAllAppointments);

// Get a single agent by ID
appointmentRoutes.get('/:id', getAppointmentById);

// Update an existing agent by ID
appointmentRoutes.put('/:id', updateAppointmentById);

// Delete an existing agent by ID
appointmentRoutes.delete('/:id', deleteAppointmentById);

module.exports = appointmentRoutes;
*/
}
