// Avatar component
import { FaBriefcase, FaEnvelope, FaMobile } from 'react-icons/fa';

function Avatar({ agents }) {
  return (
    <div className="">
      <h3 className=" mb-2 fs-sm fw-bold">{agents.title}</h3>
      <h3 className=" text-muted fw-bold">{agents.name}</h3>
      <img
        src={agents.image || '/fallback-image.jpg'}
        alt="mls"
        className="image"
        style={{ maxWidth: '540px' }}
      />
      <div className="container-fluid py-3">
        <h4 className=" mb-2 fs-sm fw-bold">
          <FaMobile className="card-icon mt-n1 me-2 mt-1" />
          {agents.phone}
        </h4>
        <h5 className=" mb-2 fs-sm fw-bold">
          <FaEnvelope className="card-icon mt-n1 me-2 mt-1" />
          {agents.email}
        </h5>
        <h5 className=" mb-2 fs-sm fw-bold">
          <FaBriefcase className="card-icon mt-n1 me-2 mt-1" />
          Years Active: {agents.expereince}
        </h5>
      </div>
    </div>
  );
}

export default Avatar;
