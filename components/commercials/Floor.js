// floor plan component
'use client';
import {
  FaCarSide,
  FaComment,
  FaDoorOpen,
  FaRuler,
  FaScrewdriver,
  FaTable,
} from 'react-icons/fa';

export default function Floor({ commercials }) {
  return (
    <div>
      <div>
        <ul className="list-group w-100 pt-2 pb-4 m-4">
          <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
            <i className=" card-icons fa-solid fa-ruler me-2"></i>
            <FaTable className="card-icon me-2" />
            Floor plan: {commercials.flooring}
          </h6>
          <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
            <i className=" card-icons fa-solid fa-toolbox me-2"></i>
            <FaRuler className="card-icon me-2" />
            {commercials.sqft} sqft
          </h6>
          <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
            <i className="card-icons fa-solid fa-door-open me-2"></i>
            <FaDoorOpen className="card-icon me-2" />
            {commercials.avalibleUnits} Units
          </h6>
          <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
            <i className=" card-icons fa-solid fa-trowel-bricks me-2"></i>
            <FaScrewdriver className="card-icon me-2" />
            Year Built: {commercials.yearBuilt}
          </h6>
          <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
            <i className=" card-icons fa-solid fa-car-side me-2"></i>
            <FaCarSide className="card-icon me-2" />
            {commercials.garageCapacity} Garage
          </h6>
          <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
            <i className=" card-icons fa-solid fa-comments me-2"></i>
            <FaComment className="card-icon me-2" />
            {commercials.numReviews} Reviews
          </h6>
        </ul>
      </div>
    </div>
  );
}
