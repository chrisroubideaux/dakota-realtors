// admin models
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
// time off request
const timeOffRequestSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  startDate: Date,
  endDate: Date,
  reason: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
  requestDate: { type: Date, default: Date.now },
});

const adminSchema = new mongoose.Schema(
  {
    googleId: String,
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
    experience: String,
    address: String,
    city: String,
    state: String,
    empId: String,
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

// Hash the password before saving the admin data
adminSchema.pre('save', async function (next) {
  // Only hash the password if it exists and has been modified
  if (this.password && this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Method to compare passwords for agent authentication
adminSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Generate a JWT token for agent authentication with expiration
adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
