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
// Import statements...

function Toolbar({ apartments }) {
  return (
    <ul className="nav list-unstyled d-flex py-2 overflow-hidden">
      <li className="nav-item ms-3">
        <h6 className="mb-2 fs-sm fw-normal">
          <FaMapPin className="fs-5 card-icon " />
          {apartments.location}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBed className="fs-5 card-icon me-1 " />
          {apartments.rooms}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBath className="fs-6 card-icon me-1 " />
          {apartments.bathrooms}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaCar className="fs-5 card-icon me-1" />
          {apartments.garageCapacity}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBuilding className="fs-5 card-icon me-1" />
          sqft {apartments.sqft}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal">
          <FaMoneyBill className="fs-6 card-icon me-1 " />
          {apartments.price}
        </h6>
      </li>
    </ul>
  );
}

export default Toolbar;

{
  /*
function Toolbar({ apartments }) {
  return (
    <ul className="nav list-unstyled d-flex py-2 overflow-hidden">
      <li className="nav-item ms-3">
        <h6 className="mb-2 fs-sm fw-normal">
          <FaMapPin className="card-icon mt-n1 " />
          {apartments.location}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBed className="card-icon m-1 " />

          {apartments.rooms}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBath className="card-icon " />
          {apartments.bathrooms}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaCar className="card-icon me-1" />
          {apartments.garageCapacity}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal mb-2">
          <FaBuilding className="card-icon mt-n1" />
          {apartments.apartments.sqft}
        </h6>
      </li>
      <li className="nav-item ms-3">
        <h6 className="fw-normal">
          <FaMoneyBill className="card-icon mt-n1 me-1 " />
          {apartments.price}
        </h6>
      </li>
    </ul>
  );
}

export default Toolbar;

*/
}
