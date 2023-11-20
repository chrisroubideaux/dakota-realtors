// property details component
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
  FaRubleSign,
  FaRuler,
  FaScrewdriver,
  FaTable,
} from 'react-icons/fa';
export default function PropertyDetails({ properties }) {
  return (
    <div>
      <ul className="list-group w-100 pt-2 pb-4 m-4">
        <h5 className="mb-0  p-3 pb-1 fw-bold">
          <i className=" card-icons fa-solid fa-building me-2"></i>
          <FaBuilding className="card-icon me-2" />
          {properties.propertyType}
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-dollar-sign me-2"></i>
          <FaDollarSign className="card-icon me-2" />
          {properties.price}
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-location-dot me-2"></i>
          <FaMapPin className="card-icon me-2" />
          Location: {properties.location}
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-bed me-2"></i>
          <FaBed className="card-icon me-2" />
          {properties.rooms}
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="card-icons fa-solid fa-shower me-2"></i>
          <FaBath className="card-icon me-2" />
          {properties.bathrooms} bath
        </h5>

        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-ruler me-2"></i>
          <FaTable className="card-icon me-2" />
          Floor plan: {properties.flooring}
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-toolbox me-2"></i>
          <FaRuler className="card-icon me-2" />
          {properties.sqft} sqft
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className="card-icons fa-solid fa-door-open me-2"></i>
          <FaDoorOpen className="card-icon me-2" />
          {properties.avalibleUnits} Units
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-trowel-bricks me-2"></i>
          <FaScrewdriver className="card-icon me-2" />
          Year Built: {properties.yearBuilt}
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-car-side me-2"></i>
          <FaCarSide className="card-icon me-2" />
          {properties.garageCapacity} Garage
        </h5>
        <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
          <i className=" card-icons fa-solid fa-comments me-2"></i>
          <FaComment className="card-icon me-2" />
          {properties.numReviews} Reviews
        </h5>
      </ul>
    </div>
  );
}
