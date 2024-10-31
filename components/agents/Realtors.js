// agents component
'use client';
import Image from 'next/image';

import Link from 'next/link';
import {
  FaEnvelope,
  FaMobile,
  FaBriefcase,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa';

function Realtors({ agents }) {
  return (
    <>
      <Link className="card-link" href={`/agents/${agents._id}`}>
        <div className="card mb-2" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-sm-4">
              <Image
                src={agents.image || '/fallback-image.jpg'}
                width={120}
                height={120}
                className="avatar mx-3 my-3"
                alt="mls"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="mb-2 fs-xs text-uppercase fw-bold">
                  {agents.name}
                </h5>
                <span className="d-inline-block ">
                  <h6 className=" fs-sm fw-normal">
                    <FaEnvelope className="card-icon me-2" />
                    {agents.email}
                  </h6>
                </span>
                <div
                  className="card-footer d-flex text-nowrap m-auto"
                  style={{ maxWidth: '55rem' }}
                >
                  <span className=" d-inline-block me-1">
                    <h6 className="fw-normal">
                      <FaMobile className="card-icon " />
                      {agents.phone}
                    </h6>
                  </span>

                  <span className="d-inline-block me-2">
                    <h6 className=" fs-sm fw-normal">
                      <FaBriefcase className="card-icon me-2 " />
                      exp: {agents.experience}
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
