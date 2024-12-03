// Commercial card component
import {
  FaEnvelope,
  FaMobile,
  FaBuilding,
  FaMoneyBillWave,
  FaMapPin,
  FaBed,
  FaBath,
} from 'react-icons/fa';
import Link from 'next/link';

export const Commercials = ({ commercials, setActiveComponent }) => {
  return (
    <div>
      <div className="card overflow-hidden m-2 ">
        <div className="row g-0">
          <div
            className="col-sm-4 bg-repeat-0 bg-size-cover"
            style={{
              backgroundImage: `url(${
                commercials?.image1 || '/fallback-image.jpg'
              })`,
              minHeight: '12rem',
              backgroundSize: 'cover',
            }}
          ></div>
          <div className="col-sm-8">
            <div className="card-body">
              <h5 className="mb-2 fs-xs text-uppercase fw-bold">
                {commercials.propertyType}
              </h5>
              <h6 className="dark-text mb-1 fs-xs text-uppercase fw-bold pb-2">
                {commercials.rentOrBuy}
              </h6>
              <Link
                className="btn btn-sm badge"
                href={`/editCommercial/${commercials._id}`}
              >
                Edit Property
              </Link>
              <div
                className="card-footer d-flex text-nowrap m-auto mt-3"
                style={{ maxWidth: '55rem' }}
              >
                <span className=" d-inline-block me-1">
                  <h6 className="fw-normal">
                    <FaBuilding className="card-icon" />{' '}
                    {commercials.propertyType} | {commercials.sqft} {''}
                    sqft
                  </h6>
                </span>
                <span className="d-inline-block me-2">
                  <h6 className=" fs-sm fw-normal">
                    <FaMoneyBillWave className="card-icon " /> $
                    {commercials.price}
                  </h6>
                </span>
                <span className="d-inline-block me-2">
                  <h6 className="fs-sm fw-normal">
                    <FaBed className="card-icon me-1 " />
                    {commercials.rooms}
                  </h6>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
