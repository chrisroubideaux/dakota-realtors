// agents component
'use client';
import Link from 'next/link';
import {
  FaEnvelope,
  FaMobile,
  FaBriefcase,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa';

function Realtors({ homes }) {
  return (
    <>
      <Link className="card-link" href={`/homes/${homes.id}`}>
        <div class="card mb-2" style={{ maxWidth: '540px' }}>
          <div class="row g-0">
            <div class="col-sm-4">
              <img src={homes.photo} className="avatar mx-3 my-3" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 className="mb-2 fs-xs text-uppercase fw-bold">
                  {homes.name}
                </h5>
                <span className="d-inline-block ">
                  <h6 className=" fs-sm fw-normal">
                    <FaEnvelope className="card-icon me-2" />
                    {homes.email}
                  </h6>
                </span>
                <div
                  className="card-footer d-flex text-nowrap m-auto"
                  style={{ maxWidth: '55rem' }}
                >
                  <span className=" d-inline-block me-1">
                    <h6 className="fw-normal">
                      <FaMobile className="card-icon " />
                      {homes.phone}
                    </h6>
                  </span>

                  <span className="d-inline-block me-2">
                    <h6 className=" fs-sm fw-normal">
                      <FaBriefcase className="card-icon me-2 " />
                      exp: {homes.experience}
                    </h6>
                  </span>
                  <span className="d-inline-block">
                    <h6 className="fs-sm fw-normal">
                      <FaFacebook className="card-icon me-2" />
                      <FaInstagram className="card-icon  me-2" />
                      <FaTiktok className="card-icon me-2" />
                    </h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Realtors;
