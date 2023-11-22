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
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <i className="card-icons fa-solid fa-temperature-high me-2"></i>
        <FaTemperatureHigh className="card-icon me-2" />
        {apartments.centralAir}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <i className="card-icons fa-solid fa-pump-soap me-2"></i>
        <FaPumpSoap className="card-icon me-2" />
        {apartments.dishwasher}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <i className="card-icons fa-solid fa-pizza-slice me-2"></i>
        <FaPizzaSlice className="card-icon me-2" />
        {apartments.microwave}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <i className="card-icons fa-solid fa-dumbbell me-2"></i>
        <FaDumbbell className="card-icon me-2" />
        {apartments.fitnessCenter}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <i className="card-icons fa-solid fa-tshirt me-2"></i>
        <FaTshirt className="card-icon me-2" />
        {apartments.washerAndDryer}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <i className="card-icons fa-solid fa-key me-2"></i>
        <FaKey className="card-icon me-2" />
        {apartments.security}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <i className="card-icons fa-solid fa-wheelchair me-2"></i>
        <FaWheelchair className="card-icon me-2" />
        {apartments.handicap}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <i className="card-icons fa-solid fa-paw me-2"></i>
        Pet Friendly: {apartments && apartments.petFriendly}
      </h6>
    </ul>
  );
}

export default Amenities;


