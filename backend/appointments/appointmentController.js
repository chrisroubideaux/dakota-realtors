const Appointment = require('./appointment');
const jwt = require('jsonwebtoken'); // Ensure you have the jwt library
{
  /*
const createAppointment = async (req, res) => {
  try {
    const { agent, date, slot, apartmentId, userId } = req.body;

    // Validate required fields
    if (!agent || !date || !slot || !apartmentId || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the new appointment
    const newAppointment = new Appointment({
      agent,
      date,
      slot,
      apartmentId,
      userId,
    });

    // Save the appointment to the database
    const savedAppointment = await newAppointment.save();

    // Populate related fields
    const populatedAppointment = await savedAppointment.populate([
      { path: 'apartmentId', select: 'name photo location' },
      { path: 'userId', select: 'name phone location' },
    ]);

    // Return the populated appointment in the response
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: populatedAppointment,
    });
  } catch (err) {
    console.error('Error in createAppointment:', err);
    res.status(500).json({ error: err.message });
  }
};
*/
}
///
const createAppointment = async (req, res) => {
  try {
    const { agent, date, slot, apartmentId, userId } = req.body;

    if (!agent || !date || !slot || !apartmentId || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (typeof agent !== 'string') {
      return res.status(400).json({ message: 'Agent must be a string' });
    }
    if (isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const newAppointment = new Appointment({
      agent,
      date,
      slot,
      apartmentId,
      userId,
    });

    const savedAppointment = await newAppointment.save();

    // Populate related fields
    const populatedAppointment = await Appointment.findById(
      savedAppointment._id
    )
      .populate('apartmentId', 'name photo location')
      .populate('userId', 'name phone');

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: populatedAppointment,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('Validation Error:', err.errors);
      return res
        .status(400)
        .json({ error: 'Validation error', details: err.errors });
    }
    console.error('Error in createAppointment:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

///

const getAllAppointments = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token Verified, User ID:', decoded._id);

    const appointments = await Appointment.find()
      .populate('apartmentId', 'name location photo')
      .populate('userId', 'name phone address');

    const formattedAppointments = appointments.map((appointment) => {
      const date = new Date(appointment.date);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      return {
        _id: appointment._id,
        name: appointment.agent,
        date: formattedDate,
        time: formattedTime,
        apartment: appointment.apartmentId,
        user: appointment.userId,
        slot: appointment.slot,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
        dayOfWeek: appointment.dayOfWeek,
      };
    });

    res.status(200).json({
      message: 'Appointments fetched successfully',
      appointments: formattedAppointments,
    });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
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
