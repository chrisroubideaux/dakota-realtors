// Edit apartment component

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditApartment({ apartments }) {
  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Edit Apartment</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={apartments.name}
                      readOnly={!isEditing}
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
                      value={apartments.title}
                      readOnly={!isEditing}
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
                      value={apartments.phone}
                      readOnly={!isEditing}
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
                      value={apartments.email}
                      readOnly={!isEditing}
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
                      value={apartments.realtor}
                      readOnly={!isEditing}
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
                      value={apartments.propertyType}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Property Type</option>
                      <option value="apartments">Apartments</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Rent
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="rentOrBuy"
                      value={apartments.rentOrBuy}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="0,000/Monthly"
                      required
                    />
                  </div>
                </div>

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
                          value={apartments.image}
                          readOnly={!isEditing}
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
                      value={apartments.description}
                      readOnly={!isEditing}
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
                      id="bed"
                      className="form-select"
                      name="bed"
                      value={apartments.rooms}
                      readOnly={!isEditing}
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

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Bath
                  </label>
                  <div className="col-sm-9">
                    <select
                      id="bed"
                      className="form-select"
                      name="bed"
                      value={apartments.bathrooms}
                      readOnly={!isEditing}
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

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Central Air
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="central air"
                      value={apartments.centralAir}
                      readOnly={!isEditing}
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
                      value={apartments.washerAndDryer}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Washer & Dryer"
                      required
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
                      value={apartments.flooring}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Ex. Carpet, Vinyl, Tile, Hardwood"
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
                      value={apartments.sqft}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="0000"
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
                      value={apartments.address}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Ex. 1234 anywhere st, 00000"
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
                      value={apartments.security}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Secure Building"
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
                      value={apartments.handicap}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Handicap accsessible"
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
                      value={apartments.yearBuilt}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Year Built"
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
                      value={apartments.garageCapacity}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Ex. Single Garage"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label form-label">
                    Pet Friendly
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="pet friendly"
                      value={apartments.petFriendly}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      placeholder="Dogs or Cats"
                    />
                  </div>
                </div>

                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button
                      type="button"
                      className="btn btn-sm badge"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
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
