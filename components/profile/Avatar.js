// Avatar component
import { FaEnvelope, FaMobile } from 'react-icons/fa';

export default function Avatar({ users }) {
  return (
    <div>
      <div className="">
        <h3 className=" text-muted fw-bold">{users.name}</h3>
        <img
          src={users.image}
          alt="mls"
          className="image"
          style={{ maxWidth: '540px' }}
        />
        <div className="container-fluid py-3">
          <h4 className=" mb-2 fs-sm fw-bold">
            <FaMobile className="card-icon mt-n1 me-2 mt-1" />
            {users.phone}
          </h4>
          <h5 className=" mb-2 fs-sm fw-bold">
            <FaEnvelope className="card-icon mt-n1 me-2 mt-1" />
            {users.email}
          </h5>
        </div>
      </div>
    </div>
  );
}
