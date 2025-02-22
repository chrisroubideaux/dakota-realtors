// commercial model
const mongoose = require('mongoose');

const commercialSchema = {
  id: Number,
  mlsId: String,
  name: String,
  photo: String,
  title: String,
  phone: String,
  email: String,
  bio: String,
  experience: String,
  realtor: String,
  propertyType: String,
  rentOrBuy: String,
  verified: String,
  image: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  description: String,
  bathrooms: String,
  office: String,
  breakroom: String,
  conferenceRoom: String,
  lobby: String,
  lobbyCapacity: String,
  centralAir: String,
  flooring: String,
  price: String,
  mortgage: String,
  sqft: String,
  location: String,
  address: String,
  security: String,
  handicap: String,
  availableUnits: Number,
  yearBuilt: Number,
  parking: String,
  rating: Number,
  numReviews: Number,
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
};

// Create the Commercial Properties model
const Commercial = mongoose.model('Commercial', commercialSchema);

module.exports = Commercial;
