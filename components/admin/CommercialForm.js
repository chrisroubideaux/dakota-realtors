// Commercial property form component
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
    bathrooms: '',
    office: '',
    breakroom: '',
    conferenceRoom: '',
    lobby: '',
    lobbyCapacity: '',
    centralAir: '',
    flooring: '',
    price: '',
    morgage: '',
    sqft: '',
    address: '',
    security: '',
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
        'https://dakota-realtors.onrender.com/commercials',
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
        bathrooms: '',
        office: '',
        breakroom: '',
        conferenceRoom: '',
        lobby: '',
        lobbyCapacity: '',
        centralAir: '',
        flooring: '',
        price: '',
        morgage: '',
        sqft: '',
        address: '',
        security: '',
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
              <h4 className="card-header-title">Add Commercial Property</h4>
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
                      <option value="commerical">Commercial</option>
                    </select>
                  </div>
                </div>

                {['image1', 'image2', 'image3', 'image4', 'image5'].map(
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
                      //required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bathrooms
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      required
                    >
                      <option>Bathrooms</option>
                      <option>1 bath</option>
                      <option>2 bath</option>
                      <option>3 bath</option>
                      <option>4 bath</option>
                      <option>5 bath</option>
                      <option>6 bath</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Office
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="office"
                      value={formData.office}
                      onChange={handleChange}
                      required
                    >
                      <option>Office</option>
                      <option>1 room</option>
                      <option>2 room</option>
                      <option>3 room</option>
                      <option>4 room</option>
                      <option>5 room</option>
                      <option>6 room</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Breakroom
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="breakroom"
                      value={formData.breakroom}
                      onChange={handleChange}
                      required
                    >
                      <option>Breakroom</option>
                      <option>1 room</option>
                      <option>2 room</option>
                      <option>3 room</option>
                      <option>4 room</option>
                      <option>5 room</option>
                      <option>6 room</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Conference room
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="conferenceRoom"
                      value={formData.conferenceRoom}
                      onChange={handleChange}
                    >
                      <option>Conference Room</option>
                      <option>1 room</option>
                      <option>2 room</option>
                      <option>3 room</option>
                      <option>4 room</option>
                      <option>5 room</option>
                      <option>6 room</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Lobby
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="lobby"
                      value={formData.lobby}
                      onChange={handleChange}
                      placeholder="Sqft"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Lobby cap
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="lobbyCapacity"
                      value={formData.lobbyCapacity}
                      onChange={handleChange}
                      placeholder="Ex. Capacity 20"
                      // required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Central Air
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="centralAir"
                      value={formData.centralAir}
                      onChange={handleChange}
                      placeholder="Central Air"
                      // required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Flooring
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="flooring"
                      value={formData.flooring}
                      onChange={handleChange}
                      placeholder="Ex. Carpet, Tile, Hardwood"
                      // required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Price
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="100,000"
                      //required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Morgage
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="morgage"
                      value={formData.morgage}
                      onChange={handleChange}
                      placeholder="0,000/Monthly"
                      //required
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
                      //required
                    />
                  </div>
                </div>

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
                      placeholder="1234 Anywhere ST, 00000"
                      //required
                    />
                  </div>
                </div>
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
                      placeholder="Ex. Secure building Yes/No"
                      //required
                    />
                  </div>
                </div>
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
                      placeholder="Ex. Is Handicap accessible"
                      //required
                    />
                  </div>
                </div>

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
                      //required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Parking Cap
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="parking"
                      value={formData.parking}
                      onChange={handleChange}
                      placeholder="Ex. Parking Cap: 20cars"
                      //required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Avl Units
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="availableUnits"
                      value={formData.availableUnits}
                      onChange={handleChange}
                      placeholder="# of units"
                      //required
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
