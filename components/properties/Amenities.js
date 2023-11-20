// amenties component
'use client';
import {
  FaTemperatureHigh,
  FaPumpSoap,
  FaPizzaSlice,
  FaDumbbell,
  FaTshirt,
  FaKey,
  FaWheelchair,
  FaPaw,
} from 'react-icons/fa';

function Amenities({ properties }) {
  return (
    <ul className="list-group w-100 pt-2 pb-4 m-4 ">
      <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaTemperatureHigh className="card-icon me-2" />
        {properties.centralAir}
      </h5>
      <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaPumpSoap className="card-icon me-2" />
        {properties.dishwasher}
      </h5>
      <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaPizzaSlice className="card-icon me-2" />
        {properties.microwave}
      </h5>
      <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaDumbbell className="card-icon me-2" />
        {properties.fitnessCenter}
      </h5>
      <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaTshirt className="card-icon me-2" />
        {properties.washerAndDryer}
      </h5>
      <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaKey className="card-icon me-2" />
        {properties.security}
      </h5>
      <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaWheelchair className="card-icon me-2" />
        {properties.handicap}
      </h5>
      <h5 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaPaw className="card-icon me-2" />
        Pet Friendly: {properties.petFriendly}
      </h5>
    </ul>
  );
}

export default Amenities;
