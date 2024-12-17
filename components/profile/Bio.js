// Bio component
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Bio({ users }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(users);

  useEffect(() => {
    if (users) {
      setUser(users);
    }
  }, [users]);

  if (!user || Object.keys(user).length === 0) {
    return <p>No user data available.</p>;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const id = user._id;
      await axios.put(`https://dakota-realtors.onrender.com/users/${id}`, user);
      console.log('User data updated successfully');

      const updatedUser = await axios.get(
        `https://dakota-realtors.onrender.com/users/${id}`
      );
      setUser(updatedUser.data);
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
      alert('Failed to save changes to profile.');
    }
  };

  return (
    <div className="mt-3">
      <div className="col-lg-9">
        <div className="d-grid gap-3 gap-lg-5">
          <div className="card">
            <div className="card-header border-bottom">
              <h4 className="card-header-title">Profile</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSaveChanges}>
                <div className="row mb-4">
                  <label
                    htmlFor="firstNameLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Full name
                  </label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="firstNameLabel"
                        placeholder="Full Name"
                        aria-label="Full Name"
                        value={user.name}
                        readOnly={!isEditing}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <label
                    htmlFor="emailLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="emailLabel"
                      placeholder="email@example.com"
                      aria-label="Email"
                      value={user.email}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="phoneLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Phone
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      id="phoneLabel"
                      placeholder="xxx-xxx-xxxx"
                      aria-label="Phone"
                      value={user.phone || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="addressLabel"
                    className="col-sm-3 col-form-label form-label"
                  >
                    Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      id="addressLabel"
                      placeholder="1234 Main St"
                      aria-label="Address"
                      value={user.address}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="input-group">
                    <label
                      htmlFor="cityLabel"
                      className="col-sm-3 col-form-label form-label"
                    >
                      City/State/Zip
                    </label>
                    <input
                      type="type"
                      className="form-control"
                      name="city"
                      id="cityLabel"
                      placeholder="1234 Main St"
                      value={user.city || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                    <select
                      id="inputState"
                      className="form-select "
                      value={user.state}
                      disabled={!isEditing}
                    >
                      <option selected>State</option>
                      <option
                        value={user.state}
                        readOnly={!isEditing}
                        onChange={handleChange}
                      ></option>
                    </select>
                    <input
                      type="text"
                      className="form-control"
                      name="Zip"
                      id="zipCodeLabel"
                      placeholder="Zip #"
                      value={user.zip || ''}
                      readOnly={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="card-footer pt-0">
                  <div className="d-flex justify-content-end gap-3 mt-2">
                    <button
                      type="button"
                      className="btn btn-sm badge "
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
