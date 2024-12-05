// agents model
// agents model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const timeOffRequestSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  reason: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
});
const agentSchema = new mongoose.Schema(
  {
    realtor: String,
    name: String,
    image: String,
    photo: String,
    title: String,
    phone: String,
    email: String,
    password: String,
    facebookId: String,
    facebookDisplayName: String,
    facebookEmail: String,
    bio: String,
    role: String,
    experience: String,
    address: String,
    city: String,
    state: String,
    agentId: String,
    socialSec: String,
    bankName: String,
    accNumber: String,
    directDeposit: String,
    hours: String,
    breaks: String,
    overtime: String,
    hireDate: String,
    endDate: String,
    lastShift: String,
    nextShift: String,
    wage: String,
    emergencyContact1: String,
    emergencyName: String,
    emergencyContact2: String,
    emergencyName2: String,
    times: String,
    appointments: String,
    slot: String,
    slot2: String,
    slot3: String,
    slot4: String,
    slot5: String,
    slot6: String,
    slot7: String,
    days: String,
    timeOffRequests: [timeOffRequestSchema],
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
{
  /*
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const timeOffRequestSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  reason: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
});
const agentSchema = new mongoose.Schema(
  {
    realtor: String,
    name: String,
    image: String,
    photo: String,
    title: String,
    phone: String,
    email: String,
    password: String,
    facebookId: String,
    facebookDisplayName: String,
    facebookEmail: String,
    bio: String,
    role: String,
    experience: String,
    address: String,
    city: String,
    state: String,
    socialSec: String,
    bankName: String,
    accNumber: String,
    directDeposit: String,
    hours: String,
    breaks: String,
    overtime: String,
    hireDate: String,
    endDate: String,
    lastShift: String,
    nextShift: String,
    wage: String,
    emergencyContact1: String,
    emergencyName: String,
    emergencyContact2: String,
    emergencyName2: String,
    times: String,
    appointments: String,
    slot: String,
    slot2: String,
    slot3: String,
    slot4: String,
    slot5: String,
    slot6: String,
    slot7: String,
    days: String,
    timeOffRequests: [timeOffRequestSchema],
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
*/
}
