// Add apartment component

import { useState } from 'react';
import axios from 'axios';

export default function PropertyForm() {
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

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/apartments',
        formData
      );
      setMessage('Property added successfully!');
      setError('');

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
