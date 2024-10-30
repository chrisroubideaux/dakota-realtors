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

function Amenities({ apartments }) {
  return (
    <ul className="list-group pt-2 pb-4 m-4 ">
      <h6 className="mb-0 p-3 pb-1  fw-normal">
        <FaTemperatureHigh className="card-icon me-2 fs-5" />
        {apartments.centralAir}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaPumpSoap className="card-icon me-2 fs-5" />
        {apartments.dishwasher}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal">
        <FaPizzaSlice className="card-icon me-2 fs-5" />
        {apartments.microwave}
      </h6>
      <h6 className="mb-0 p-3 pb-1  fw-normal">
        <FaDumbbell className="card-icon me-2 fs-5" />
        {apartments.fitnessCenter}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaTshirt className="card-icon me-2 fs-5" />
        {apartments.washerAndDryer}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaKey className="card-icon me-2 fs-5" />
        {apartments.security}
      </h6>
      <h6 className="mb-0 p-3 pb-1  fw-normal">
        <FaWheelchair className="card-icon me-2 fs-5" />
        {apartments.handicap}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-normal  ">
        <FaPaw className="card-icon me-2 fs-5" />
        Pet Friendly: {apartments && apartments.petFriendly}
      </h6>
    </ul>
  );
}

export default Amenities;
