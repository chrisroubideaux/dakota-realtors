// aparmtnets model
const mongoose = require('mongoose');

// Define the Apartment Schema
const apartmentSchema = new mongoose.Schema({
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
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  description: String,
  rooms: String,
  bathrooms: String,
  centralAir: String,
  washerAndDryer: String,
  dishwasher: String,
  microwave: String,
  fitnessCenter: String,
  flooring: String,
  price: String,
  sqft: String,
  location: String,
  address: String,
  security: String,
  handicap: String,
  availableUnits: Number,
  yearBuilt: Number,
  garageCapacity: String,
  petFriendly: String,
  rating: Number,
  numReviews: Number,
  times: String,
  appointments: String,
  slot1: String,
  slot2: String,
  slot3: String,
  slot4: String,
  slot5: String,
  slot6: String,
  slot7: String,
  days: String,
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
{
  /*

rooms: {
    type: String,
    required: true,
    enum: ['studio', '1 Bed', '2 Bed', '3 Bed', '4 Bed'],
  },

  */
}
