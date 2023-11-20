// amenties compnents
'use client';
import {
  FaTemperatureHigh,
  FaLandmark,
  FaUsers,
  FaClipboard,
  FaChair,
  FaKey,
  FaWheelchair,
  FaSink,
} from 'react-icons/fa';

function Amenities({ commercials }) {
  return (
    <ul className="list-group w-100 pt-2 pb-4 m-4 ">
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaTemperatureHigh className="card-icon me-2" />
        {commercials.centralAir}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaLandmark className="card-icon me-2" />
        {commercials.office}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaSink className="card-icon me-2" />
        {commercials.bathrooms}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaClipboard className="card-icon me-2" />
        {commercials.conferenceRoom}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaChair className="card-icon me-2" />
        {commercials.breakRoom}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaChair className="card-icon me-2" />
        {commercials.lobby}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaUsers className="card-icon me-2" />
        {commercials.lobbyCapacity}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaKey className="card-icon me-2" />
        {commercials.security}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaWheelchair className="card-icon me-2" />
        {commercials.handicap}
      </h6>
    </ul>
  );
}

export default Amenities;
