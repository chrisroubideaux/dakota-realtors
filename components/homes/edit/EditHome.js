// Edit home form
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditHomes({ homes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [home, setHome] = useState(homes);

  useEffect(() => {
    if (homes) {
      setHome(homes);
    }
  }, [homes]);

  if (!home || Object.keys(home).length === 0) {
    return <p>No home data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = home._id;
      await axios.put(`http://localhost:3001/homes/${id}`, home);
      console.log('Home data updated successfully');

      const updatedHome = await axios.get(`http://localhost:3001/homes/${id}`);
      setHome(updatedHome.data);
      setIsEditing(false);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert(
        'Failed to save commercial data. Check the console for more details.'
      );
    }
  };
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card" style={{ maxWidth: '600px' }}>
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Edit Home</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSaveChanges}>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Name
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={isEditing ? home.name || '' : home.name || ''}
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Agent's Name"
                    />
                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Title
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={isEditing ? home.title || '' : home.title || ''}
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Title"
                    />
                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Phone
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={isEditing ? home.phone || '' : home.phone || ''}
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Phone Number"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Email
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={isEditing ? home.email || '' : home.email || ''}
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Email"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Realtor
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="realtor"
                      value={
                        isEditing ? home.realtor || '' : home.realtor || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Company Name"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    <h6>Property Type</h6>
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="propertyType"
                      value={
                        isEditing
                          ? home.propertyType || ''
                          : home.propertyType || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Property Type"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Status
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="rentOrBuy"
                      value={
                        isEditing ? home.rentOrBuy || '' : home.rentOrBuy || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="0,000/Monthly"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                {['image1', 'image2', 'image3', 'image4'].map(
                  (image, index) => (
                    <div className="row mb-4" key={image}>
                      <label className="col-sm-3 col-form-label form-label">
                        Image {index + 1}
                      </label>
                      <div className="col-sm-9 d-flex align-items-center gap-2">
                        <input
                          type="file"
                          className="form-control"
                          name={image} // Dynamically assign name based on image key
                          readOnly={!isEditing}
                          onChange={isEditing ? handleChange : undefined} // Only enable change when editing
                          accept="image/*"
                        />
                        <button
                          type="button"
                          className="btn btn-sm badge"
                          onClick={handleEditClick}
                        >
                          {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                        {isEditing && (
                          <button
                            type="submit"
                            className="btn btn-sm btn-success"
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  )
                )}
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Description
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <div class="">
                      <label
                        for="exampleFormControlTextarea1"
                        className="form-label"
                      ></label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="description"
                        value={
                          isEditing
                            ? home.description || ''
                            : home.description || ''
                        }
                        readOnly={!isEditing}
                        onChange={isEditing ? handleChange : undefined}
                        placeholder="Description"
                        style={{ minWidth: '300px' }}
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bed
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="bedroom"
                      className="form-select"
                      name="rooms"
                      value={isEditing ? home.rooms || '' : home.rooms || ''}
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="1">1 Bed</option>
                      <option value="2">2 Bed</option>
                      <option value="3">3 Bed</option>
                      <option value="4">4 Bed</option>
                      <option value="5">5 Bed</option>
                      <option value="6">6 Bed</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bath
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="bathrooms"
                      className="form-select"
                      name="bathrooms"
                      value={
                        isEditing ? home.bathrooms || '' : home.bathrooms || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="1">1 Bath</option>
                      <option value="2">2 Bath</option>
                      <option value="3">3 Bath</option>
                      <option value="4">4 Bath</option>
                      <option value="5">5 Bath</option>
                      <option value="6">6 Bath</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Washer/Dryer
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="washerAndDryer"
                      className="form-select"
                      name="washerAndDryer"
                      value={
                        isEditing
                          ? home.washerAndDryer || ''
                          : home.washerAndDryer || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="1">Washer & Dryer</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Dishwasher
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="dishwasher"
                      className="form-select"
                      name="dishwasher"
                      value={
                        isEditing
                          ? home.dishwasher || ''
                          : home.dishwasher || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="1">Dishwasher/Disposal</option>
                      <option value="1">Yes</option>
                      <option value="2">No</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Flooring
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="flooring"
                      value={
                        isEditing ? home.flooring || '' : home.flooring || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Ex. Carpet, Vinyl, Tile, Hardwood"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Price
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={isEditing ? home.price || '' : home.price || ''}
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Price"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Mortgage
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="mortgage"
                      value={
                        isEditing ? home.mortgage || '' : home.mortgage || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Mortgage"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Sqft
                  </label>

                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="sqft"
                      value={isEditing ? home.sqft || '' : home.sqft || ''}
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="0000"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Address
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={
                        isEditing ? home.address || '' : home.address || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Ex. 1234 anywhere st, 00000"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Year Built
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="yearBuilt"
                      value={
                        isEditing ? home.yearBuilt || '' : home.yearBuilt || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Year Built"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Garage Cap
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="garageCapacity"
                      className="form-select"
                      name="garageCapacity"
                      value={
                        isEditing
                          ? home.garageCapacity || ''
                          : home.garageCapacity || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="single">Single</option>
                      <option value="double">double</option>
                      <option value="triple">Triple</option>
                      <option value="4"> 4 Car</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Swimming Pool
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="swimmingPool"
                      className="form-select"
                      name="swimmingPool"
                      value={
                        isEditing
                          ? home.swimmingPool || ''
                          : home.swimmingPool || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">{home.swimmingPool || ''}</option>

                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Pool Size
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="poolSize"
                      value={
                        isEditing ? home.poolSize || '' : home.poolSize || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Sqft"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Basement Size
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="basement"
                      value={
                        isEditing ? home.basement || '' : home.basement || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Sqft"
                    />

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    School
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="school"
                      value={isEditing ? home.school || '' : home.school || ''}
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Description"
                      style={{ minWidth: '300px' }}
                    ></textarea>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    College
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="college"
                      value={
                        isEditing ? home.college || '' : home.college || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Description"
                      style={{ minWidth: '300px' }}
                    ></textarea>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Community Center
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="communityCenter"
                      value={
                        isEditing
                          ? home.communityCenter || ''
                          : home.communityCenter || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Description"
                      style={{ minWidth: '300px' }}
                    ></textarea>

                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit Property'}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditHomes;
