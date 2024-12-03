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

function Toolbar({ homes }) {
  return (
    <ul className="nav list-unstyled d-flex py-2 overflow-hidden">
      <li className="nav-item ms-3">
        <h6 className="mb-2 fs-sm fw-normal">
          <FaMapPin className="card-icon mt-n1 " />
          {homes.location}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className=" fw-normal mb-2">
          <FaBed className="card-icon m-1 me-1" />
          {homes.rooms}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className=" fw-normal mb-2">
          <FaBath className="card-icon me-1" />
          {homes.bathrooms} bath
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className=" fw-nomral mb-2">
          <FaCar className="card-icon me-1" />
          {homes.garageCapacity}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className=" fw-normal mb-2">
          <FaBuilding className="card-icon mt-n1 me-1" /> {homes.sqft}
          sqft
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-nomral">
          <FaMoneyBill className="card-icon mt-n1 me-1 " />
          {homes.price}
        </h6>
      </li>
    </ul>
  );
}

export default Toolbar;
