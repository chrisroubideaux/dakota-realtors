const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: false },
    fullName: { type: String },
    facebookId: { type: String },
    facebookDisplayName: { type: String },
    facebookEmail: { type: String },
  },
  {
    timestamps: true,
  }
);

{
  /*
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const saltRounds = 10; // Number of salt rounds
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Add a method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Add the method to generate a JWT token for the user with expiration
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
  });
  return token;
};

*/
}

const User = mongoose.model('User', userSchema);

module.exports = User;
