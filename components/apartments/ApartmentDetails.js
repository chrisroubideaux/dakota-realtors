// apartment details Component
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCarSide,
  FaComment,
  FaDollarSign,
  FaMapPin,
} from 'react-icons/fa';

export default function ApartmentDetails({ apartments }) {
  return (
    <div>
      <ul className="list-group w-100 pt-2 pb-4 m-4">
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-building me-2"></i>
          <FaBuilding className="card-icon me-2" />
          {apartments.propertyType}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-dollar-sign me-2"></i>
          <FaDollarSign className="card-icon me-2" />
          {apartments.price}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-location-dot me-2"></i>
          <FaMapPin className="card-icon me-2" />
          Location: {apartments.location}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-bed me-2"></i>
          <FaBed className="card-icon me-2" />
          Bed:
          {apartments.rooms}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="card-icons fa-solid fa-shower me-2"></i>
          <FaBath className="card-icon me-2" />
          {apartments.bathrooms} bath
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-car-side me-2"></i>
          <FaCarSide className="card-icon me-2" />
          {apartments.garageCapacity} Garage
        </h6>
      </ul>
    </div>
  );
}

{
  /*
'use client';
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCarSide,
  FaComment,
  FaDollarSign,
  FaMapPin,
} from 'react-icons/fa';

export default function ApartmentDetails({ apartments }) {
  return (
    <div>
      <ul className="list-group w-100 pt-2 pb-4 m-4">
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-building me-2"></i>
          <FaBuilding className="card-icon me-2" />
          {apartments.propertyType}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-dollar-sign me-2"></i>
          <FaDollarSign className="card-icon me-2" />
          {apartments.price}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-location-dot me-2"></i>
          <FaMapPin className="card-icon me-2" />
          Location: {apartments.location}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-bed me-2"></i>
          <FaBed className="card-icon me-2" />
          {apartments.rooms}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="card-icons fa-solid fa-shower me-2"></i>
          <FaBath className="card-icon me-2" />
          {apartments.bathrooms} bath
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-car-side me-2"></i>
          <FaCarSide className="card-icon me-2" />
          {apartments.garageCapacity} Garage
        </h6>
      </ul>
    </div>
  );
}

*/
}
