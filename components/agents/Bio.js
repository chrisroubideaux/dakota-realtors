// bio component
import Image from 'next/image';
import { FaBriefcase, FaEnvelope, FaMobile } from 'react-icons/fa';

function Bio({ agents }) {
  return (
    <div className="">
      <Image
        src={agents.photo || '/fallback-image.jpg'}
        className="d-block mx-lg-auto img-fluid image"
        alt="img"
        width={600}
        height={500}
        loading="lazy"
      />
      <div className="container py-2 mt-2">
        <ul className="nav justify-content-center list-unstyled d-flex">
          <h6 className=" mb-2 fs-sm fw-bold">
            <i className="card-icon fa-solid fa-mobile-screen mt-n1 me-2"></i>
            <FaMobile className="card-icon mt-n1 me-2" />
            {agents.phone}
          </h6>
          <h6 className=" mb-2 fs-sm fw-bold">
            <i className=" card-icon fa-solid fa-envelope mt-n1 me-3"></i>
            <FaEnvelope className="card-icon mt-n1 me-2" />
            {agents.email}
          </h6>
          <h6 className=" mb-2 fs-sm fw-bold">
            <i className=" card-icon fa-solid fa-briefcase mt-n1 me-3"></i>
            <FaBriefcase className="card-icon mt-n1 me-2" />
            Years Active: {agents.experience}
          </h6>
        </ul>
      </div>
    </div>
  );
}

export default Bio;
