// appointmets model
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  mlsId: String,
  name: String,
  photo: String,
  title: String,
  phone: String,
  email: String,
  location: String,
  times: String,
  slot: String,
  slot2: String,
  slot3: String,
  slot4: String,
  slot5: String,
  slot6: String,
  slot7: String,
  days: String,
});

const Appointment = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointment;
