const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true }, // Make it optional
    password: { type: String, required: false }, // Make it optional
    fullName: { type: String }, // Make it optional
    facebookId: { type: String }, // Store Facebook user ID
    facebookDisplayName: { type: String }, // Store Facebook display name
    facebookEmail: { type: String }, // Store Facebook email
    // Other user fields here
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Add a pre-save hook to hash the password before saving it to the database
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
