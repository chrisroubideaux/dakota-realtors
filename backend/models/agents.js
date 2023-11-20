// models/AgentAuth.js (Agent Authentication Model)

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const agentsSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
});

// Hash the password before saving the agent authentication data
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

// Add a method to compare passwords for agent authentication
agentsSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Add the method to generate a JWT token for agent authentication with expiration
agentsSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
  });
  return token;
};

const Agents = mongoose.model('Agents', agentsSchema);

module.exports = Agents;

// models/AgentInfo.js (Agent General Information Model)
{
  /*
const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  realtor: String,
  name: String,
  image: String,
  photo: String,
  title: String,
  phone: String,
  email: String,
  bio: String,
  experience: String,
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
  // Other agent fields here
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;

*/
}
