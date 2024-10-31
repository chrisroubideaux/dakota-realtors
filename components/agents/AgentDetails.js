// agent details component
'use client';
import { FaBriefcase, FaEnvelope, FaMobile } from 'react-icons/fa';

function AgentDetails({ agents }) {
  return (
    <div className="media" style={{ maxWidth: '540px' }}>
      <img
        src={agents.image || '/fallback-image.jpg'}
        alt="mls"
        className="profile"
      />
      <div className="container py-2">
        <h5 className=" mb-2 fs-sm fw-bold">{agents.title}</h5>
        <h6 className=" fw-bold">{agents.name}</h6>
        <h6 className=" mb-2 fs-sm fw-bold">
          <FaMobile className="card-icon mt-n1 me-2 mt-1" />
          {agents.phone}
        </h6>
        <h6 className=" mb-2 fs-sm fw-bold">
          <FaEnvelope className="card-icon mt-n1 me-2 mt-1" />
          {agents.email}
        </h6>
        <h6 className=" mb-2 fs-sm fw-bold">
          <FaBriefcase className="card-icon mt-n1 me-2 mt-1" />
          Years Active: {agents.expereince}
        </h6>
      </div>
    </div>
  );
}

export default AgentDetails;
