const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  mlsId: { type: String },
  name: { type: String, required: true },
  photo: { type: String },
  title: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  location: { type: String },
  times: { type: String },
  slot: { type: String },
  slot2: { type: String },
  slot3: { type: String },
  slot4: { type: String },
  slot5: { type: String },
  slot6: { type: String },
  slot7: { type: String },
  days: { type: [String] },
});

const Appointment = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointment;

{
  /*
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
*/
}
