// detials component for commercials
'use client';
import {
  FaBuilding,
  FaMoneyBillWave,
  FaMapPin,
  FaComputer,
  FaTable,
  FaRuler,
  FaScrewdriver,
  FaCarSide,
  FaComment,
} from 'react-icons/fa';

export default function Details({ commercials }) {
  return (
    <div>
      <ul className="list-group w-100 pt-2 pb-4 m-4">
        <h6 className="mb-0  p-3 pb-1 fw-bold">
          <FaBuilding className="card-icons me-2" />
          {commercials.propertyType}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaMoneyBillWave className="card-icons me-2" />
          {commercials.price}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-nomral">
          <FaMapPin className="card-icon me-2" />
          Location: {commercials.location}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-nomral">
          <FaTable className="card-icon me-2" />
          Floor plan: {commercials.flooring}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-nomral">
          <FaRuler className="card-icon me-2" />
          {commercials.sqft} sqft
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaRuler className="card-icon me-2" />
          {commercials.avalibleUnits} Units
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaScrewdriver className="card-icon me-2" />
          Year Built: {commercials.yearBuilt}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaCarSide className="card-icons me-2" />
          {commercials.garageCapacity} Parking Lot
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaComment className="card-icons me-2" />
          {commercials.numReviews} Reviews
        </h6>
      </ul>
    </div>
  );
}
