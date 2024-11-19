const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
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
    date: {
      type: Date,
      required: true,
    },
    agent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt`
  }
);

// Virtual for calculating the day of the week
appointmentSchema.virtual('dayOfWeek').get(function () {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[this.date.getDay()]; // Calculate the day of the week
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

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
