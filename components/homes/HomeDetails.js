// Details Component
'use client';
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCarSide,
  FaComment,
  FaDollarSign,
  FaDoorOpen,
  FaMapPin,
} from 'react-icons/fa';

export default function ApartmentDetails({ homes }) {
  return (
    <div>
      <ul className="list-group w-100 pt-2 pb-4 m-4 bg-transparent">
        <h6 className="mb-0  p-3 pb-1 fw-bold">
          <FaBuilding className="card-icon me-2" />
          {homes.propertyType}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <FaDollarSign className="card-icon me-2" />
          {homes.price}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <FaMapPin className="card-icon me-2" />
          Location: {homes.location}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <FaBed className="card-icon me-2" />
          {homes.rooms}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <FaBath className="card-icon me-2" />
          {homes.bathrooms} bath
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
          <FaCarSide className="card-icon me-2" />
          {homes.garageCapacity} Garage
        </h6>
      </ul>
    </div>
  );
}
