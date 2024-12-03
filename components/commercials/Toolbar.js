// Toolbar component
'use client';
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCar,
  FaMapPin,
  FaMoneyBill,
} from 'react-icons/fa';

function Toolbar({ commercials }) {
  return (
    <ul className="nav list-unstyled d-flex py-2 overflow-hidden">
      <li className="nav-item ms-3">
        <h6 className="mb-2 fs-sm fw-normal">
          <FaMapPin className="card-icon mt-n1 " />
          {commercials.location}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBed className="card-icon m-1 " />
          {commercials.rooms}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBath className="card-icon " />
          {commercials.bathrooms}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaCar className="card-icon me-1" />
          {commercials.garageCapacity}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBuilding className="card-icon mt-n1" /> {commercials.sqft}
          sqft
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal">
          <FaMoneyBill className="card-icon mt-n1 me-1 " />
          {commercials.price}
        </h6>
      </li>
    </ul>
  );
}

export default Toolbar;
