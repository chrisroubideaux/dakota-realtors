// appointment routes for apartments
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

// CREATE a new appointment

appointmentRoutes.post('/', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: savedAppointment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all appointments
appointmentRoutes.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({
      message: 'All appointments retrieved successfully',
      appointments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get an appointment by ID

appointmentRoutes.get('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE an appointment by ID
appointmentRoutes.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE an appointment by ID
appointmentRoutes.delete('/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndRemove(
      req.params.id
    );
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(204).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = appointmentRoutes;
