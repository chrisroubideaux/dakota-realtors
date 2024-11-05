const Appointment = require('./appointment'); // Adjust path as needed
const Agent = require('../agents/agent'); // Assuming you have an Agent model
const User = require('../users/userModel'); // Assuming you have a User model

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const {
      googleId,
      sender,
      recipient,
      senderModel,
      recipientModel,
      propertyType,
      description,
      times,
      slot,
      slot2,
      slot3,
      slot4,
      slot5,
      slot6,
      slot7,
      days,
    } = req.body;

    // Ensure all required fields are provided
    if (!sender || !recipient || !senderModel || !recipientModel || !days) {
      return res
        .status(400)
        .json({
          error:
            'Sender, recipient, sender model, recipient model, and days are required.',
        });
    }

    const newAppointment = new Appointment({
      googleId,
      sender,
      recipient,
      senderModel,
      recipientModel,
      propertyType,
      description,
      times,
      slot,
      slot2,
      slot3,
      slot4,
      slot5,
      slot6,
      slot7,
      days,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: savedAppointment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments with populated sender and recipient data
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: 'sender',
        select: 'name email phone',
        model: (doc) => (doc.senderModel === 'User' ? 'User' : 'Agent'),
      })
      .populate({
        path: 'recipient',
        select: 'name email phone',
        model: (doc) => (doc.recipientModel === 'User' ? 'User' : 'Agent'),
      });

    res.status(200).json({
      message: 'All appointments retrieved successfully',
      appointments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get an appointment by ID with populated sender and recipient data
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'sender',
        select: 'name email phone',
        model: (doc) => (doc.senderModel === 'User' ? 'User' : 'Agent'),
      })
      .populate({
        path: 'recipient',
        select: 'name email phone',
        model: (doc) => (doc.recipientModel === 'User' ? 'User' : 'Agent'),
      });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an appointment by ID
const updateAppointmentById = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate({
        path: 'sender',
        select: 'name email phone',
        model: (doc) => (doc.senderModel === 'User' ? 'User' : 'Agent'),
      })
      .populate({
        path: 'recipient',
        select: 'name email phone',
        model: (doc) => (doc.recipientModel === 'User' ? 'User' : 'Agent'),
      });

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
};

// Delete an appointment by ID
const deleteAppointmentById = async (req, res) => {
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
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
};

{
  /*
const Appointment = require('./appointment');

// Create a new appointment
const createAppointment = async (req, res) => {
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
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({
      message: 'All appointments retrieved successfully',
      appointments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get an appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an appointment by ID
const updateAppointmentById = async (req, res) => {
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
};

// Delete an appointment by ID
const deleteAppointmentById = async (req, res) => {
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
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
};
*/
}
