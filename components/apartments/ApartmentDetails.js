// Apartment details Component
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
      <ul className="list-group w-100 pt-2 pb-4 m-4 bg-transparent">
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaBuilding className="card-icon me-2 fs-5" />
          {apartments.propertyType}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaDollarSign className="card-icon me-2 fs-5" />
          {apartments.price}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaMapPin className="card-icon me-2 fs-5" />
          Location: {apartments.location}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaBed className="card-icon me-2 fs-5" />
          {apartments.rooms}
        </h6>
        <h6 className="mb-0 p-3 pb-1 fw-normal">
          <FaBath className="card-icon me-2 fs-5" />
          {apartments.bathrooms}
        </h6>
        <h6 className="mb-0 p-3 pb-1  fw-normal">
          <FaCarSide className="card-icon me-2 fs-5" />
          {apartments.garageCapacity}
        </h6>
      </ul>
    </div>
  );
}
