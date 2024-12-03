// Featured component
'use client';
import {
  FaBuilding,
  FaMoneyBillWave,
  FaMapPin,
  FaBed,
  FaBath,
} from 'react-icons/fa';

export default function FeaturedApartments({ homes }) {
  return (
    <div>
      <a className="card-link" href={`/homes/${homes._id}`}>
        <div className="card " style={{ maxWidth: '306px' }}>
          <img
            className="img"
            src={homes.image || '/fallback-image.jpg'}
            alt="homes"
            layout="responsive"
          />
          <div className="card-body postion-relative">
            <h5 className="dark-text mb-1 fs-xs text-uppercase fw-bold pb-2">
              {homes.rentOrBuy}
            </h5>
            <h6 className=" fw-semi-bold mt-1">
              <FaBuilding className="card-icon mt-n1 me-2 mt-1" />{' '}
              {homes.propertyType} | {homes.sqft} {''}
              sqft
            </h6>
            <h6 className="fw-semi-bold">
              <FaMoneyBillWave className="card-icon mt-n1 me-2 mt-1" /> $
              {homes.price}
            </h6>

            <h6 className="mb-2 fs-sm fw-semi-bold">
              <FaMapPin className="card-icon mt-n1 me-2 mt-1" />
              {homes.location}
            </h6>

            <div className="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap">
              <span className="d-inline-block me-2">
                <FaBed className="card-icon m-1 me-2" />
                {homes.rooms}
              </span>
              |
              <span className="d-inline-block ">
                <FaBath className="card-icon m-1 me-2" />
                {homes.bathrooms} bath
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
