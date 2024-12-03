// Featured properties component
'use client';
import {
  FaBuilding,
  FaMoneyBillWave,
  FaMapPin,
  FaBed,
  FaBath,
  FaChalkboardTeacher,
} from 'react-icons/fa';

export default function CommercialProperties({ commercials }) {
  return (
    <div>
      <a className="card-link" href={`/commercials/${commercials._id}`}>
        <div className="card " style={{ maxWidth: '306px' }}>
          <img
            className="img"
            src={commercials.image || '/fallback-image.jpg'}
            alt="commercial"
          />
          <div className="card-body postion-relative">
            <h5 className="dark-text mb-1 fs-xs text-uppercase fw-bold pb-2">
              {commercials.rentOrBuy}
            </h5>
            <h6 className=" fw-semi-bold mt-1">
              <FaBuilding className="card-icon mt-n1 me-2 mt-1" />{' '}
              {commercials.propertyType} | {commercials.sqft} {''}
              sqft
            </h6>
            <h6 className="fw-semi-bold">
              <FaMoneyBillWave className="card-icon mt-n1 me-2 mt-1" /> $
              {commercials.price}
            </h6>
            <h6 className="mb-2 fs-sm fw-semi-bold">
              <FaMapPin className="card-icon mt-n1 me-2 mt-1" />
              {commercials.location}
            </h6>
            <div className="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap">
              <span className="d-inline-block me-1">
                <FaChalkboardTeacher className="card-icon m-1 me-2" />
                {commercials.morgage}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
