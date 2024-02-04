// models/AgentAuth.js (Agent Authentication Model)
{
  /*
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Agent authentication model
const agentsSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true }, // Make fullName required
});

// Hashing the password before saving the agent authentication data
agentsSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method for comparing passwords for agent authentication
agentsSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method for generating a JWT token for agent authentication with expiration
agentsSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
  });
  return token;
};

const Agents = mongoose.model('Agents', agentsSchema);

module.exports = Agents;
*/
}
