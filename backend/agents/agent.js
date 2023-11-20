// agents model
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
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
