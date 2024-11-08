// Form
import { useState } from 'react';
import axios from 'axios';

export default function PropertyForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    mlsId: '',
    name: '',
    photo: '',
    title: '',
    phone: '',
    email: '',
    bio: '',
    experience: '',
    realtor: '',
    propertyType: '',
    rentOrBuy: '',
    verified: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    description: '',
    rooms: '',
    bathrooms: '',
    centralAir: '',
    washerAndDryer: '',
    dishwasher: '',
    microwave: '',
    fitnessCenter: '',
    flooring: '',
    price: '',
    sqft: '',
    location: '',
    address: '',
    security: '',
    handicap: '',
    availableUnits: '',
  });

  // State for feedback messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/apartments',
        formData
      );
      setMessage('Property added successfully!');
      setError('');
      // Optionally reset the form
      setFormData({
        mlsId: '',
        name: '',
        photo: '',
        title: '',
        phone: '',
        email: '',
        bio: '',
        experience: '',
        realtor: '',
        propertyType: '',
        rentOrBuy: '',
        verified: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        description: '',
        rooms: '',
        bathrooms: '',
        centralAir: '',
        washerAndDryer: '',
        dishwasher: '',
        microwave: '',
        fitnessCenter: '',
        flooring: '',
        price: '',
        sqft: '',
        location: '',
        address: '',
        security: '',
        handicap: '',
        availableUnits: '',
      });
    } catch (err) {
      setError('Failed to add property. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Add Apartment</h4>
            </div>
            <div className="card-body">
              <form className="" onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Agents Name"
                      required
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Title"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                {/* */}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Realtor
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="realtor"
                      value={formData.realtor}
                      onChange={handleChange}
                      placeholder="Company Name"
                      required
                    />
                  </div>
                </div>
                {/* Property Type */}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Property
                  </label>
                  <div className="col-sm-9">
                    <select
                      id="propertyType"
                      className="form-select"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Property Type</option>
                      <option value="apartments">Apartments</option>
                    </select>
                  </div>
                </div>
                {/* Rent or Buy */}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Rent
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="rentOrBuy"
                      value={formData.rentOrBuy}
                      onChange={handleChange}
                      placeholder="0,000/Monthly"
                      required
                    />
                  </div>
                </div>
                {/* Image Uploads */}
                {['image1', 'image2', 'image3', 'image4'].map(
                  (imageField, index) => (
                    <div className="row mb-4" key={imageField}>
                      <label className="col-sm-3 col-form-label form-label">
                        Image {index + 1}
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="file"
                          className="form-control"
                          name={imageField}
                          onChange={handleChange}
                          accept="image/*"
                        />
                      </div>
                    </div>
                  )
                )}
                {/* Additional Property Fields */}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Description
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                      required
                    />
                  </div>
                </div>
                {/*rooms*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bed
                  </label>
                  <div className="col-sm-9">
                    <select
                      id="bed"
                      className="form-select"
                      name="bed"
                      value={formData.rooms}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Bedrooms</option>
                      <option value="apartments">1 Bed</option>
                      <option value="apartments">2 Bed</option>
                      <option value="apartments">3 Bed</option>
                      <option value="apartments">4 Bed</option>
                    </select>
                  </div>
                </div>
                {/*bathrooms*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bath
                  </label>
                  <div className="col-sm-9">
                    <select
                      id="bed"
                      className="form-select"
                      name="bed"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Bathrooms</option>
                      <option value="apartments">1 Bath</option>
                      <option value="apartments">2 Bath</option>
                      <option value="apartments">3 Bath</option>
                      <option value="apartments">4 Bath</option>
                      <option value="apartments">5 Bath</option>
                      <option value="apartments">6 Bath</option>
                    </select>
                  </div>
                </div>
                {/*central air*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Central Air
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="central air"
                      value={formData.centralAir}
                      onChange={handleChange}
                      placeholder="Central Air"
                      required
                    />
                  </div>
                </div>
                {/*washer/dryer*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Washer/dryer
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="washer dryer"
                      value={formData.washerAndDryer}
                      onChange={handleChange}
                      placeholder="Washer & Dryer"
                      required
                    />
                  </div>
                </div>
                {/*price*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Flooring
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Ex. Carpet, Vinyl, Tile, Hardwood"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Sqft
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleChange}
                      placeholder="0000"
                      required
                    />
                  </div>
                </div>

                {/*address*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Ex. 1234 anywhere st, 00000"
                      required
                    />
                  </div>
                </div>
                {/*security*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Security
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="security"
                      value={formData.security}
                      onChange={handleChange}
                      placeholder="Secure Building"
                      required
                    />
                  </div>
                </div>
                {/*handicap*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Handicap
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="handicap"
                      value={formData.handicap}
                      onChange={handleChange}
                      placeholder="Handicap accsessible"
                      required
                    />
                  </div>
                </div>
                {/*Year Built*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Year Built
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="year built"
                      value={formData.yearBuilt}
                      onChange={handleChange}
                      placeholder="Year Built"
                      required
                    />
                  </div>
                </div>
                {/*Year Built*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Garage Cap
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="garage"
                      value={formData.garageCompacity}
                      onChange={handleChange}
                      placeholder="Ex. Single Garage"
                      required
                    />
                  </div>
                </div>
                {/*Pet Friendly*/}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Pet Friendly
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="pet friendly"
                      value={formData.petFriendly}
                      onChange={handleChange}
                      placeholder="Dogs or Cats"
                      required
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button type="submit" className="btn btn-sm badge">
                      Add Property
                    </button>
                  </div>
                  {message && <p className="text-success">{message}</p>}
                  {error && <p className="text-danger">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /*
import { useState } from 'react';
import axios from 'axios';

export default function PropertyForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    mlsId: '',
    name: '',
    photo: '',
    title: '',
    phone: '',
    email: '',
    bio: '',
    experience: '',
    realtor: '',
    propertyType: '',
    rentOrBuy: '',
    verified: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    description: '',
    rooms: '',
    bathrooms: '',
    centralAir: '',
    washerAndDryer: '',
    dishwasher: '',
    microwave: '',
    fitnessCenter: '',
    flooring: '',
    price: '',
    sqft: '',
    location: '',
    address: '',
    security: '',
    handicap: '',
    availableUnits: '',
  });

  // State for feedback messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/apartmtents',
        formData
      );
      setMessage('Employee added successfully!');
      setError('');
      // Optionally reset the form
      setFormData({
        mlsId: '',
        name: '',
        photo: '',
        title: '',
        phone: '',
        email: '',
        bio: '',
        experience: '',
        realtor: '',
        propertyType: '',
        rentOrBuy: '',
        verified: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        description: '',
        rooms: '',
        bathrooms: '',
        centralAir: '',
        washerAndDryer: '',
        dishwasher: '',
        microwave: '',
        fitnessCenter: '',
        flooring: '',
        price: '',
        sqft: '',
        location: '',
        address: '',
        security: '',
        handicap: '',
        availableUnits: '',
      });
    } catch (err) {
      setError('Failed to add property. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card w-100">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Add Property</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Full Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Title
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="xxx-xxx-xxxx"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bio
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Bio"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Experience
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Experience"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Realtor
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="realtor"
                      value={formData.realtor}
                      onChange={handleChange}
                      placeholder="Realtor"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="input-group">
                    <label
                      htmlFor="propertyLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      Property Type
                    </label>
                    <select id="inputId" className="form-select">
                      <option selected>Property type</option>
                      <option></option>
                      <option value="2">Apartments</option>
                      <option value="3">Homes</option>
                      <option value="3">Commercial Properties</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Rent or Buy
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="rent or buy"
                      value={formData.rentOrBuy}
                      onChange={handleChange}
                      placeholder="Rent or Buy"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Verified
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="verified"
                      value={formData.verified}
                      onChange={handleChange}
                      placeholder="Verified"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Image 1
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleChange}
                      value={formData.image1}
                      accept={formData.image1}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Image 2
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleChange}
                      value={formData.image1}
                      accept={formData.image1}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Image 3
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleChange}
                      value={formData.image3}
                      accept={formData.image3}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Image 4
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleChange}
                      value={formData.image4}
                      accept={formData.image4}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Description
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="verified"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Rooms
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      placeholder="Rooms"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Bathrooms
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="bathrooms"
                      value={formData.verified}
                      onChange={handleChange}
                      placeholder="Rooms"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Central
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="central"
                      value={formData.centralAir}
                      onChange={handleChange}
                      placeholder="Central Air"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Washer & Dryer
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="washer"
                      value={formData.washerAndDryer}
                      onChange={handleChange}
                      placeholder="Washer & Dryer"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Dishwasher
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="dishwaher"
                      value={formData.verified}
                      onChange={handleChange}
                      placeholder="Dishwasher"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Microwave
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="microwave"
                      value={formData.verified}
                      onChange={handleChange}
                      placeholder="Amenities"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Fitness Center
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="fitness center"
                      value={formData.fitnessCenter}
                      onChange={handleChange}
                      placeholder="Fitness"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Flooring
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="flooring"
                      value={formData.flooring}
                      onChange={handleChange}
                      placeholder="flooring"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Price
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Price"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Sqft
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleChange}
                      placeholder="sqft"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Address
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Location
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Location"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Security
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="security"
                      value={formData.security}
                      onChange={handleChange}
                      placeholder="Security"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Handicap
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="handicap"
                      value={formData.handicap}
                      onChange={handleChange}
                      placeholder="Handicap"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Year Built
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="year built"
                      value={formData.verified}
                      onChange={handleChange}
                      placeholder="Year Built"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Garage Capacity
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="garage component"
                      value={formData.garageCompacity}
                      onChange={handleChange}
                      placeholder="Garage Capacity"
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-2 col-form-label form-label">
                    Pet Friendly
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      name="verified"
                      value={formData.petFriendly}
                      onChange={handleChange}
                      placeholder="Pet Friendly"
                      required
                    />
                  </div>
                </div>
                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button type="submit" className="btn btn-sm badge">
                      Add Property
                    </button>
                  </div>
                  {message && <p className="text-success">{message}</p>}
                  {error && <p className="text-danger">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
}
