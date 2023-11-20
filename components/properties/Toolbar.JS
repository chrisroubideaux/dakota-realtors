// toolbar component
'use client';
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCar,
  FaMapPin,
  FaMoneyBill,
} from 'react-icons/fa';
function Toolbar({ properties }) {
  return (
    <div className="">
      <ul className="nav list-unstyled d-flex py-2 overflow-hidden">
        <li className="nav-item ms-3">
          <h6 className=" fw-bold  mb-2">
            <FaBed className="card-icon m-1 me-2" />
            {properties.rooms}
          </h6>
        </li>
        <li className="nav-item ms-3">
          <h6 className=" fw-bold  mb-2">
            <FaBath className="card-icon me-2" />
            {properties.bathrooms} bath
          </h6>
        </li>
        <li className="nav-item ms-3">
          <h6 className=" fw-bold  mb-2">
            <FaCar className="card-icon me-2" />
            {properties.garageCapacity}
          </h6>
        </li>
        <li className="nav-item ms-3">
          <h6 className=" fw-bold  mb-2">
            <i className="card-icon fa-solid fa-building  mt-n1 me-2"></i>
            <FaBuilding className="card-icon mt-n1 me-2" /> {properties.sqft}
            sqft
          </h6>
        </li>
        <li className="nav-item ms-3">
          <h6 className="fw-bold">
            <FaMoneyBill className="card-icon mt-n1 me-2 " />
            {properties.price}
          </h6>
        </li>
      </ul>
    </div>
  );
}

export default Toolbar;
