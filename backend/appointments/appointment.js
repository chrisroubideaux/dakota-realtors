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
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment',
      required: false,
    },
    homeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
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
  return days[this.date.getDay()];
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

{
  /*
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
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment',
      required: true,
    },
    homeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
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
  return days[this.date.getDay()];
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
*/
}
