// Edit component for homes
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

export const Homes = ({ homes, setActiveComponent }) => {
  return (
    <div>
      <div className="card overflow-hidden m-2 ">
        <div className="row g-0">
          <div
            className="col-sm-4 bg-repeat-0 bg-size-cover"
            style={{
              backgroundImage: `url(${homes?.image1 || '/fallback-image.jpg'})`,
              minHeight: '12rem',
              backgroundSize: 'cover',
            }}
          ></div>
          <div className="col-sm-8">
            <div className="card-body">
              <h5 className="mb-2 fs-xs text-uppercase fw-bold">
                {homes.propertyType}
              </h5>
              <h6 className="dark-text mb-1 fs-xs text-uppercase fw-bold pb-2">
                {homes.rentOrBuy}
              </h6>
              <Link
                className="btn btn-sm badge"
                href={`/editHomes/${homes._id}`}
                //  onClick={() => setActiveComponent('editApartment')}
              >
                Edit Property
              </Link>
              <div
                className="card-footer d-flex text-nowrap m-auto mt-3"
                style={{ maxWidth: '55rem' }}
              >
                <span className=" d-inline-block me-1">
                  <h6 className="fw-normal">
                    <FaBuilding className="card-icon" /> {homes.propertyType} |{' '}
                    {homes.sqft} {''}
                    sqft
                  </h6>
                </span>
                <span className="d-inline-block me-2">
                  <h6 className=" fs-sm fw-normal">
                    <FaMoneyBillWave className="card-icon " /> ${homes.price}
                  </h6>
                </span>
                <span className="d-inline-block me-2">
                  <h6 className="fs-sm fw-normal">
                    <FaBed className="card-icon me-1 " />
                    {homes.rooms}
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
