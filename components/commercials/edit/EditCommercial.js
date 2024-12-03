// Edit commercial form component
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditCommercial({ commercials }) {
  const [isEditing, setIsEditing] = useState(false);
  const [commercial, setCommercial] = useState(commercials);

  useEffect(() => {
    if (commercials) {
      setCommercial(commercials);
    }
  }, [commercials]);

  if (!commercial || Object.keys(commercial).length === 0) {
    return <p>No commercial data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommercial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = commercial._id;
      await axios.put(`http://localhost:3001/commercials/${id}`, commercial);
      console.log('Commercial data updated successfully');

      const updatedCommercial = await axios.get(
        `http://localhost:3001/commercials/${id}`
      );
      setCommercial(updatedCommercial.data);
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
              <h4 className="card-header-title">Edit Commercial Property</h4>
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
                      value={
                        isEditing
                          ? commercial.name || ''
                          : commercial.name || ''
                      }
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
                      value={
                        isEditing
                          ? commercial.title || ''
                          : commercial.title || ''
                      }
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
                      value={
                        isEditing
                          ? commercial.phone || ''
                          : commercial.phone || ''
                      }
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
                      value={
                        isEditing
                          ? commercial.email || ''
                          : commercial.email || ''
                      }
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
                        isEditing
                          ? commercial.realtor || ''
                          : commercial.realtor || ''
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
                          ? commercial.propertyType || ''
                          : commercial.propertyType || ''
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
                        isEditing
                          ? commercial.rentOrBuy || ''
                          : commercial.rentOrBuy || ''
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
                            ? commercial.description || ''
                            : commercial.description || ''
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
                    Restrooms
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="bathrooms"
                      className="form-select"
                      name="bathrooms"
                      value={
                        isEditing
                          ? commercial.bathrooms || ''
                          : commercial.bathrooms || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">{commercial.bathrooms || ''}</option>
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
                    Office
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="office"
                      className="form-select"
                      name="office"
                      value={
                        isEditing
                          ? commercial.office || ''
                          : commercial.office || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">{commercial.office || ''}</option>
                      <option value="1">1 Office</option>
                      <option value="2">2 Offices</option>
                      <option value="3">3 Offices</option>
                      <option value="4">4 Offices</option>
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
                    Breakroom
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="Breakroom"
                      className="form-select"
                      name="breakroom"
                      value={
                        isEditing
                          ? commercial.breakroom || ''
                          : commercial.breakroom || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">{commercial.breakroom || ''}</option>
                      <option value="1">1 Breakroom</option>
                      <option value="2">2 Breakrooms</option>
                      <option value="3">3 Breakrooms</option>
                      <option value="4">4 Breakrooms</option>
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
                    Conf Room
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="conferenceRoom"
                      className="form-select"
                      name="conferenceRoom"
                      value={
                        isEditing
                          ? commercial.conferenceRoom || ''
                          : commercial.conferenceRoom || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">
                        {commercial.conferenceRoom || ''}
                      </option>
                      <option value="1">1 Conference Room</option>
                      <option value="2">2 Conference Rooms</option>
                      <option value="3">3 Conference Rooms</option>
                      <option value="4">4 Conference Rooms</option>
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
                    Lobby
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="lobby"
                      value={
                        isEditing
                          ? commercial.lobby || ''
                          : commercial.lobby || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Lobby"
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
                    Lobby Cap
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="lobbyCapacity"
                      value={
                        isEditing
                          ? commercial.lobbyCapacity || ''
                          : commercial.lobbyCapacity || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Lobby Capacity"
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
                    Central Air
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="centralAir"
                      value={commercial.centralAir || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Central Air"
                      //re                    quired
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
                    Flooring
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="flooring"
                      value={
                        isEditing
                          ? commercial.flooring || ''
                          : commercial.flooring || ''
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
                      value={
                        isEditing
                          ? commercial.price || ''
                          : commercial.price || ''
                      }
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
                        isEditing
                          ? commercial.mortgage || ''
                          : commercial.mortgage || ''
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
                      value={
                        isEditing
                          ? commercial.sqft || ''
                          : commercial.sqft || ''
                      }
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
                        isEditing
                          ? commercial.address || ''
                          : commercial.address || ''
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
                    Security
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="security"
                      value={
                        isEditing
                          ? commercial.security || ''
                          : commercial.security || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Secure Building"
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
                    Handicap
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="handicap"
                      value={
                        isEditing
                          ? commercial.handicap || ''
                          : commercial.handicap || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Handicap accessible"
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
                    Aval Units
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="availableUnits"
                      value={
                        isEditing
                          ? commercial.availableUnits || ''
                          : commercial.availableUnits || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Available Units"
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
                        isEditing
                          ? commercial.yearBuilt || ''
                          : commercial.yearBuilt || ''
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
                    Parking
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="parking"
                      value={
                        isEditing
                          ? commercial.parking || ''
                          : commercial.parking || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Ex. Parking Capacity"
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

export default EditCommercial;
{
  /*
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditCommercial({ commercials }) {
  const [isEditing, setIsEditing] = useState(false);
  const [commercial, setCommercial] = useState(commercials);

  useEffect(() => {
    if (commercials) {
      setCommercial(commercials);
    }
  }, [commercials]);

  if (!commercial || Object.keys(commercial).length === 0) {
    return <p>No commercial data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommercial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = commercial._id;
      await axios.put(`http://localhost:3001/commercials/${id}`, commercial);
      console.log('Commercial data updated successfully');

      const updatedCommercial = await axios.get(
        `http://localhost:3001/commercials/${id}`
      );
      setCommercial(updatedCommercial.data);
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
          <div className="card" style={{ minWidth: '350px' }}>
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Edit Commercial</h4>
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
                      value={
                        isEditing
                          ? commercial.name || ''
                          : commercial.name || ''
                      }
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
                      value={
                        isEditing
                          ? commercial.title || ''
                          : commercial.title || ''
                      }
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
                      value={
                        isEditing
                          ? commercial.phone || ''
                          : commercial.phone || ''
                      }
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
                      value={
                        isEditing
                          ? commercial.email || ''
                          : commercial.email || ''
                      }
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
                        isEditing
                          ? commercial.realtor || ''
                          : commercial.realtor || ''
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
                          ? commercial.propertyType || ''
                          : commercial.propertyType || ''
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
                    Sale
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="rentOrBuy"
                      value={
                        isEditing
                          ? commercial.rentOrBuy || ''
                          : commercial.rentOrBuy || ''
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
                          name="image"
                          value={commercial.image || ''}
                          readOnly={!isEditing}
                          onChange={handleChange}
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
                            ? commercial.description || ''
                            : commercial.description || ''
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
                    Restrooms
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="bathrooms"
                      className="form-select"
                      name="bathrooms"
                      value={
                        isEditing
                          ? commercial.bathrooms || ''
                          : commercial.bathrooms || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">{commercial.bathrooms || ''}</option>
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
                    Office
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="office"
                      className="form-select"
                      name="office"
                      value={
                        isEditing
                          ? commercial.office || ''
                          : commercial.office || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">{commercial.office || ''}</option>
                      <option value="1">1 Office</option>
                      <option value="2">2 Offices</option>
                      <option value="3">3 Offices</option>
                      <option value="4">4 Offices</option>
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
                    Breakroom
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="Breakroom"
                      className="form-select"
                      name="breakroom"
                      value={
                        isEditing
                          ? commercial.breakroom || ''
                          : commercial.breakroom || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">{commercial.breakroom || ''}</option>
                      <option value="1">1 Breakroom</option>
                      <option value="2">2 Breakrooms</option>
                      <option value="3">3 Breakrooms</option>
                      <option value="4">4 Breakrooms</option>
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
                    Conf Room
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="conferenceRoom"
                      className="form-select"
                      name="conferenceRoom"
                      value={
                        isEditing
                          ? commercial.conferenceRoom || ''
                          : commercial.conferenceRoom || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                    >
                      <option value="">
                        {commercial.conferenceRoom || ''}
                      </option>
                      <option value="1">1 Conference Room</option>
                      <option value="2">2 Conference Rooms</option>
                      <option value="3">3 Conference Rooms</option>
                      <option value="4">4 Conference Rooms</option>
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
                    Lobby
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="lobby"
                      value={
                        isEditing
                          ? commercial.lobby || ''
                          : commercial.lobby || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Lobby"
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
                    Lobby Cap
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="lobbyCapacity"
                      value={
                        isEditing
                          ? commercial.lobbyCapacity || ''
                          : commercial.lobbyCapacity || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Lobby Capacity"
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
                    Central Air
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="centralAir"
                      value={commercial.centralAir || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Central Air"
                      //re                    quired
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
                    Flooring
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="flooring"
                      value={
                        isEditing
                          ? commercial.flooring || ''
                          : commercial.flooring || ''
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
                      value={
                        isEditing
                          ? commercial.price || ''
                          : commercial.price || ''
                      }
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
                        isEditing
                          ? commercial.mortgage || ''
                          : commercial.mortgage || ''
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
                      value={
                        isEditing
                          ? commercial.sqft || ''
                          : commercial.sqft || ''
                      }
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
                        isEditing
                          ? commercial.address || ''
                          : commercial.address || ''
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
                    Security
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="security"
                      value={
                        isEditing
                          ? commercial.security || ''
                          : commercial.security || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Secure Building"
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
                    Handicap
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="handicap"
                      value={
                        isEditing
                          ? commercial.handicap || ''
                          : commercial.handicap || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Handicap accessible"
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
                    Aval Units
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="availableUnits"
                      value={
                        isEditing
                          ? commercial.availableUnits || ''
                          : commercial.availableUnits || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Available Units"
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
                        isEditing
                          ? commercial.yearBuilt || ''
                          : commercial.yearBuilt || ''
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
                    Parking
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="parking"
                      value={
                        isEditing
                          ? commercial.parking || ''
                          : commercial.parking || ''
                      }
                      readOnly={!isEditing}
                      onChange={isEditing ? handleChange : undefined}
                      placeholder="Ex. Parking Capacity"
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

export default EditCommercial;
*/
}
