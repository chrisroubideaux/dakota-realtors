// featured properties component
'use client';
import {
  FaBuilding,
  FaMoneyBillWave,
  FaMapPin,
  FaBed,
  FaBath,
} from 'react-icons/fa';

export default function FeaturedApartments({ properties }) {
  return (
    <div>
      <a className="card-link" href={`/properties/${properties.id}`}>
        <div className="card " style={{ maxWidth: '306px' }}>
          <img className="img" src={properties.image} alt="apartment" />
          <div className="card-body postion-relative">
            <h5 className="dark-text mb-1 fs-xs text-uppercase fw-bold pb-2">
              {properties.rentOrBuy}
            </h5>
            <h6 className=" fw-semi-bold mt-1">
              <FaBuilding className="card-icon mt-n1 me-2 mt-1" />{' '}
              {properties.propertyType} | {properties.sqft} {''}
              sqft
            </h6>
            <h6 className="fw-semi-bold">
              <FaMoneyBillWave className="card-icon mt-n1 me-2 mt-1" /> $
              {properties.price}
            </h6>

            <h6 className="mb-2 fs-sm fw-semi-bold">
              <FaMapPin className="card-icon mt-n1 me-2 mt-1" />
              {properties.location}
            </h6>

            <div className="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap">
              <span className="d-inline-block me-2">
                <FaBed className="card-icon m-1 me-2" />
                {properties.rooms}
              </span>
              |
              <span className="d-inline-block ">
                <FaBath className="card-icon m-1 me-2" />
                {properties.bathrooms} bath
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
