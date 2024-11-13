import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditApartments({ setActiveComponent, apartments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [apartment, setApartment] = useState(apartments);

  useEffect(() => {
    if (apartments) {
      setApartment(apartments);
    }
  }, [apartments]);

  if (!apartment || Object.keys(apartment).length === 0) {
    return <p>No apartment data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = apartment._id;
      await axios.put(`http://localhost:3001/apartments/${id}`, apartment);
      console.log('Apartment data updated successfully');

      const updatedApartment = await axios.get(
        `http://localhost:3001/apartments/${id}`
      );
      setApartment(updatedApartment.data);
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
        'Failed to save employee data. Check the console for more details.'
      );
    }
  };
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card" style={{ minWidth: '350px' }}>
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Edit Apartment</h4>
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
                      value={apartment.name || ''}
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
                      value={apartment.title || ''}
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
                      value={apartment.phone || ''}
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
                      value={apartment.email || ''}
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
                      value={apartment.realtor || ''}
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
                      value={apartment.propertyType || ''}
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
                      value={apartment.rentOrBuy || ''}
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
                          value={apartment.image || ''}
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
                        value={apartment.description || ''}
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
                    Bed
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <select
                      id="bed"
                      className="form-select"
                      name="rooms"
                      value={apartment.rooms || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      //required
                    >
                      <option value="">{apartment.rooms}</option>
                      <option value="apartment">1 Bed</option>
                      <option value="apartment">2 Bed</option>
                      <option value="">3 Bed</option>
                      <option value="">4 Bed</option>
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
                      id="bed"
                      className="form-select"
                      name="bathrooms"
                      value={apartment.bathrooms || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      //required
                    >
                      <option value="">{apartment.bathrooms || ''}</option>
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
                    Central Air
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="centralAir"
                      value={apartment.centralAir || ''}
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
                    Washer/dryer
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="washerAndDryer"
                      value={apartment.washerAndDryer || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Washer & Dryer"
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
                      value={apartment.flooring || ''}
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
                    Sqft
                  </label>
                  {/*
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="sqft"
                      value={apartment.sqft || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="0000"
                    />
                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit '}
                    </button>
                    {isEditing && (
                      <button type="submit" className="btn btn-sm btn-success">
                        Save
                      </button>
                    )}

                  </div>
                  */}
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="sqft"
                      value={apartment.sqft || ''}
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
                      value={apartment.address || ''}
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
                      value={apartment.security || ''}
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
                      value={apartment.handicap || ''}
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
                    Year Built
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="yearBuilt"
                      value={apartment.yearBuilt || ''}
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
                    Garage Cap
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="garageCapacity"
                      value={apartment.garageCapacity || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Ex. Single Garage"
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
                    Pet Friendly
                  </label>
                  <div className="col-sm-9 d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="petFriendly"
                      value={apartment.petFriendly || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Dogs or Cats"
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
