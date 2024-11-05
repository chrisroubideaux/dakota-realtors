// appointmets model

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  googleId: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'recipientModel',
    required: true,
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Agent', 'User'],
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ['Agent', 'User'],
  },

  propertyType: {
    type: String,
    required: true,
    enum: ['Apartments', 'Homes', 'Commercial'],
  },

  description: String,
  times: {
    type: String,
  },
  slot: {
    type: String,
  },
  slot2: {
    type: String,
  },
  slot3: {
    type: String,
  },
  slot4: {
    type: String,
  },
  slot5: {
    type: String,
  },
  slot6: {
    type: String,
  },
  slot7: {
    type: String,
  },
  days: {
    type: [String],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
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
