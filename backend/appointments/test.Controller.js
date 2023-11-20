// test controller
// appointment controller
const Apartments = require('../apartments/apartment');

// appointment Management

// Create an appointment for an apartment
const createAppointment = async (req, res) => {
  try {
    const { apartmentId, selectedSlot } = req.body; // Assuming you send these in the request body

    // Find the apartment by its ID
    const apartment = await Apartments.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    // Check if the selected slot is available
    const slots = [
      'slot',
      'slot2',
      'slot3',
      'slot4',
      'slot5',
      'slot6',
      'slot7',
    ];
    const selectedSlotIndex = slots.findIndex(
      (slotName) => apartment[slotName] === selectedSlot
    );

    if (selectedSlotIndex === -1) {
      return res
        .status(400)
        .json({ message: 'Selected slot is not available' });
    }

    // Check if the selected slot is already booked
    if (apartment.appointments.includes(selectedSlot)) {
      return res
        .status(400)
        .json({ message: 'Selected slot is already booked' });
    }

    // Create the appointment
    apartment.appointments.push(selectedSlot);
    apartment.save();

    return res
      .status(201)
      .json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reschedule an appointment for an apartment
const rescheduleAppointment = async (req, res) => {
  try {
    const { apartmentId, selectedSlot, newSlot } = req.body; // Assuming you send these in the request body

    // Find the apartment by its ID
    const apartment = await Apartments.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    // Check if the selected slot is available
    const slots = [
      'slot',
      'slot2',
      'slot3',
      'slot4',
      'slot5',
      'slot6',
      'slot7',
    ];
    const selectedSlotIndex = slots.findIndex(
      (slotName) => apartment[slotName] === selectedSlot
    );

    if (selectedSlotIndex === -1) {
      return res
        .status(400)
        .json({ message: 'Selected slot is not available' });
    }

    // Check if the new slot is available
    const newSlotIndex = slots.findIndex(
      (slotName) => apartment[slotName] === newSlot
    );

    if (newSlotIndex === -1) {
      return res.status(400).json({ message: 'New slot is not available' });
    }

    // Check if the selected slot is already booked
    if (!apartment.appointments.includes(selectedSlot)) {
      return res.status(400).json({ message: 'Selected slot is not booked' });
    }

    // Check if the new slot is already booked
    if (apartment.appointments.includes(newSlot)) {
      return res.status(400).json({ message: 'New slot is already booked' });
    }

    // Remove the selected slot from appointments and add the new slot
    apartment.appointments = apartment.appointments.filter(
      (slot) => slot !== selectedSlot
    );
    apartment.appointments.push(newSlot);
    apartment.save();

    return res
      .status(200)
      .json({ message: 'Appointment rescheduled successfully' });
  } catch (error) {
    console.error('Error rescheduling appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancel an appointment for an apartment
const cancelAppointment = async (req, res) => {
  try {
    const { apartmentId, slotToCancel } = req.body; // Assuming you send these in the request body

    // Find the apartment by its ID
    const apartment = await Apartments.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    // Check if the slot to cancel exists in the appointments
    const slots = [
      'slot',
      'slot2',
      'slot3',
      'slot4',
      'slot5',
      'slot6',
      'slot7',
    ];
    const slotIndex = slots.findIndex(
      (slotName) => apartment[slotName] === slotToCancel
    );

    if (slotIndex === -1) {
      return res.status(400).json({ message: 'Slot to cancel does not exist' });
    }

    // Check if the slot is already booked
    if (!apartment.appointments.includes(slotToCancel)) {
      return res.status(400).json({ message: 'Slot to cancel is not booked' });
    }

    // Remove the slot to cancel from appointments
    apartment.appointments = apartment.appointments.filter(
      (slot) => slot !== slotToCancel
    );
    apartment.save();

    return res
      .status(200)
      .json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all appointments for an apartment
const getAllAppointments = async (req, res) => {
  try {
    const { apartmentId } = req.params; // Get the apartment ID from the route parameters

    // Find the apartment by ID
    const apartment = await Apartments.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    // Retrieve the list of appointments for the apartment
    const appointments = apartment.appointments;

    return res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAppointment,
  rescheduleAppointment,
  cancelAppointment,
  getAllAppointments,
};
