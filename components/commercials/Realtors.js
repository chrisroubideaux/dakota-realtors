// Agents component
'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaEnvelope,
  FaMobile,
  FaBriefcase,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa';

function Realtors({ commercials }) {
  return (
    <>
      <Link className="card-link" href={`/commercials/${commercials._id}`}>
        <div className="card mb-2" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-sm-4">
              <Image
                src={commercials.photo || '/fallback-image.jpg'}
                className="avatar mx-3 my-3"
                alt="photo"
                width={150}
                height={100}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="mb-2 fs-xs text-uppercase fw-bold">
                  {commercials.name}
                </h5>
                <span className="d-inline-block ">
                  <h6 className=" fs-sm fw-normal">
                    <FaEnvelope className="card-icon me-2" />
                    {commercials.email}
                  </h6>
                </span>
                <div
                  className="card-footer d-flex text-nowrap m-auto"
                  style={{ maxWidth: '55rem' }}
                >
                  <span className=" d-inline-block me-1">
                    <h6 className="fw-normal">
                      <FaMobile className="card-icon " />
                      {commercials.phone}
                    </h6>
                  </span>
                  <span className="d-inline-block me-2">
                    <h6 className=" fs-sm fw-normal">
                      <FaBriefcase className="card-icon me-2 " />
                      exp: {commercials.experience}
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
