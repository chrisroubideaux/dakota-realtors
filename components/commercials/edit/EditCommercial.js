// Edit form for commercial component
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditCommercial({ commercials }) {
  const [isEditing, setIsEditing] = useState(false);
  const [commercial, setCommercial] = useState(commercials);

  useEffect(() => {
    if (commercial) {
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
  <div className="mt-3">
    <form onSubmit={handleSaveChanges}>
      <div className="col-sm-9 d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control"
          name="name"
          value={commercial.name || ''}
          readOnly={!isEditing}
          onChange={handleChange}
          placeholder="Agents Name"
          //required
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
    </form>
  </div>;
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
                      value={commercial.name || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Agents Name"
                      //required
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
                      value={commercial.title || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Title"
                      //required
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
                      value={commercial.phone || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      //required
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
                      value={commercial.email || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Email"
                      //required
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
                      value={commercial.realtor || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Company Name"
                      //required
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
                      value={commercial.propertyType || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="PropertyType"
                      //required
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
                    Rent
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="rentOrBuy"
                      value={commercial.rentOrBuy || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="0,000/Monthly"
                      //required
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
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="description"
                        value={commercial.description || ''}
                        readOnly={!isEditing}
                        onChange={handleChange}
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
                      id="bed"
                      className="form-select"
                      name="bathrooms"
                      value={commercial.bathrooms || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      //required
                    >
                      <option value="">{commercial.bathrooms || ''}</option>
                      <option value="apartments">1 Bath</option>
                      <option value="apartments">2 Bath</option>
                      <option value="apartments">3 Bath</option>
                      <option value="apartments">4 Bath</option>
                      <option value="apartments">5 Bath</option>
                      <option value="apartments">6 Bath</option>
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
                      value={commercial.office || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      //required
                    >
                      <option value="">{commercial.office || ''}</option>
                      <option value="commercials">1 Office</option>
                      <option value="commercials">2 Office</option>
                      <option value="commercials">3 Office</option>
                      <option value="commercials">3 Office</option>
                      <option value="commercials">4 Office</option>
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
                      value={commercial.breakroom || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      //required
                    >
                      <option value="">{commercial.breakroom || ''}</option>
                      <option value="commercials">1 Breakroom</option>
                      <option value="commercials">2 Breakroom</option>
                      <option value="commercials">3 Breakroom</option>
                      <option value="commercials">4 Breakroom</option>
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
                      value={commercial.conferenceRoom || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      //required
                    >
                      <option value="">
                        {commercial.conferenceRoom || ''}
                      </option>
                      <option value="commercials">1 Breakroom</option>
                      <option value="commercials">2 Breakroom</option>
                      <option value="commercials">3 Breakroom</option>
                      <option value="commercials">4 Breakroom</option>
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
                      value={commercial.lobby || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Lobby"
                      //required
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
                      value={commercial.capacity || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Lobby Capacity"
                      //required
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
                      //required
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
                      value={commercial.flooring || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      value={commercial.price || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      value={commercial.mortgage || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      value={commercial.sqft || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      value={commercial.address || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      value={commercial.security || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      value={commercial.handicap || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Handicap accsessible"
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
                      value={commercial.availableUnits || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      value={commercial.yearBuilt || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
                      value={commercial.parking || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
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
