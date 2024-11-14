// Edit form for commercial component
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditCommercial(setActiveComponent, commercials) {
  const [isEditing, setIsEditing] = useState(false);
  const [commercial, setCommercial] = useState(commercials);

  useEffect(() => {
    if (commercial) {
      setCommercial(commercial);
    }
  }, [commercial]);

  if (!commercial || Object.keys(commercial).length === 0) {
    return <p>No apartment data available.</p>;
  }

  return (
    <div>
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
    </div>
  );
}

export default EditCommercial;
