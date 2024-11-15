// Edit form for commercial component
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
    <form onSubmit={handleSaveChanges}>
      <div className="row mb-4">
        <label className="col-sm-3 col-form-label form-label">Name</label>
        <div className="col-sm-9 d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            name="name"
            value={isEditing ? commercial.name || '' : commercial.name || ''}
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
    </form>
  );
}

export default EditCommercial;
