// Amenties component
'use client';
import {
  FaTemperatureHigh,
  FaFire,
  FaPumpSoap,
  FaLayerGroup,
  FaPersonSwimming,
  FaBook,
  FaKeyboard,
  FaCampground,
  FaSwimmer,
  FaRuler,
  FaRulerHorizontal,
  FaSwimmingPool,
} from 'react-icons/fa';

function Amenities({ homes }) {
  return (
    <ul className="list-group w-100 pt-2 pb-4 m-4 bg-transparent ">
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaTemperatureHigh className="card-icon me-2" />
        {homes.centralAir}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaPumpSoap className="card-icon me-2" />
        {homes.dishwasher}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaFire className="card-icon me-2" />
        {homes.fireplace}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaLayerGroup className="card-icon me-2" />
        {homes.basement}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaSwimmingPool className="card-icon me-2" />
        {homes.swimmingPool}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaRulerHorizontal className="card-icon me-2" />
        {homes.swimmingPoolSize}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaBook className="card-icon me-2" />
        {homes.school}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaKeyboard className="card-icon me-2" />
        {homes.college}
      </h6>
      <h6 className="mb-0 p-3 pb-1 fw-semi-bold">
        <FaCampground className="card-icon me-2" />
        {homes.communityCenter}
      </h6>
    </ul>
  );
}

export default Amenities;
