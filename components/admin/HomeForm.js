// Form for adding homes component
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
    flooring: '',
    price: '',
    morgage: '',
    sqft: '',
    address: '',
    swimmingPool: '',
    basement: '',
    college: '',
    communityCenter: '',
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
        'https://dakota-realtors.onrender.com/homes',
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
        flooring: '',
        price: '',
        morgage: '',
        sqft: '',
        address: '',
        swimmingPool: '',
        basement: '',
        college: '',
        communityCenter: '',
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
              <h4 className="card-header-title">Add Home</h4>
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
                      <option value="apartments">Homes</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Rent or Buy
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="rentOrBuy"
                      value={formData.rentOrBuy}
                      onChange={handleChange}
                      placeholder="Ex. For Sale or Rent"
                      required
                    />
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
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bed
                  </label>

                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      required
                    >
                      <option>Bedrooms</option>
                      <option>1 bed</option>
                      <option>2 bed</option>
                      <option>3 bed</option>
                      <option>4 bed</option>
                      <option>5 bed</option>
                      <option>6 bed</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bath
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      required
                    >
                      <option>Bath</option>
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
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Washer/dryer
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="washerAndDryer"
                      value={formData.washerAndDryer}
                      onChange={handleChange}
                      placeholder="Washer & Dryer"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Dishwasher
                  </label>
                  <div className="col-sm-9">
                    <input
                      id="diswasher"
                      type="text"
                      className="form-control"
                      name="dishwasher"
                      value={formData.dishwasher}
                      onChange={handleChange}
                      placeholder="Ex. Dishwasher / Garbage disposal"
                      required
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
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Rent/Morgage
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="morgage"
                      value={formData.morgage}
                      onChange={handleChange}
                      placeholder="0,000/Monthly"
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
                      required
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
                      required
                    />
                  </div>
                </div>

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

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Pool
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="swimmingPool"
                      value={formData.swimmingPool}
                      onChange={handleChange}
                      placeholder="Yes/No, Sqft 0000"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Basement
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="basement"
                      value={formData.basement}
                      onChange={handleChange}
                      placeholder="Sqft 0000"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Schools
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="Ex.Community College within 10 miles "
                      //required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label fs-6">
                    <h6>Community</h6>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="communityCenter"
                      value={formData.communityCenter}
                      onChange={handleChange}
                      placeholder="Ex. Community Center within 5 miles "
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
    flooring: '',
    price: '',
    morgage: '',
    sqft: '',
    address: '',
    swimmingPool: '',
    basement: '',
    college: '',
    communityCenter: '',
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
        flooring: '',
        price: '',
        morgage: '',
        sqft: '',
        address: '',
        swimmingPool: '',
        basement: '',
        college: '',
        communityCenter: '',
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
              <h4 className="card-header-title">Add Home</h4>
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
                      <option value="apartments">Homes</option>
                    </select>
                  </div>
                </div>
          
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Rent or Buy
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="rentOrBuy"
                      value={formData.rentOrBuy}
                      onChange={handleChange}
                      placeholder="Ex. For Sale or Rent"
                      required
                    />
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
                      required
                    />
                  </div>
                </div>
             
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bed
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="bedrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="1 Bed"
                      required
                    />
                  </div>
                </div>
               
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bath
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="bathrooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      placeholder=" 1 Bath"
                      required
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
                      name="central air"
                      value={formData.centralAir}
                      onChange={handleChange}
                      placeholder="Central Air"
                      required
                    />
                  </div>
                </div>
              
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
             
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Dishwasher
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="washer dryer"
                      value={formData.washerAndDryer}
                      onChange={handleChange}
                      placeholder="Ex. Dishwasher / Garbage disposal"
                      required
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
                      name="washer dryer"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="100,000"
                      required
                    />
                  </div>
                </div>
          
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Rent/Morgage
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0,000/Monthly"
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
                      required
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
                      required
                    />
                  </div>
                </div>
              
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
               
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Pool
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="swimming pool"
                      value={formData.swimmingPool}
                      onChange={handleChange}
                      placeholder="Yes/No, Sqft 0000"
                      required
                    />
                  </div>
                </div>
                
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Basement
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="pet friendly"
                      value={formData.basement}
                      onChange={handleChange}
                      placeholder="Sqft 0000"
                      required
                    />
                  </div>
                </div>

              
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Schools
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="school"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="Ex.Community College within 10 miles "
                      required
                    />
                  </div>
                </div>
            
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label fs-6">
                    <h6>Community</h6>
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="community"
                      value={formData.communityCenter}
                      onChange={handleChange}
                      placeholder="Ex. Community Center within 5 miles "
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
