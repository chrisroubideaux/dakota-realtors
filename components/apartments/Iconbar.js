// Iconbar component

import { FaBriefcase, FaEnvelope, FaMobile } from 'react-icons/fa';

export default function Iconbar({ apartments }) {
  return (
    <ul className="iconbar nav list-inline d-flex justify-content-center gap-4 flex-wrap mt-4">
      <li className="nav-item iconbar-item">
        <h6 className="mb-2 fs-sm fw-bold">
          <FaMobile className="icon mt-n1 me-2" />
          {apartments?.phone || 'N/A'}
        </h6>
      </li>
      <li className="nav-item iconbar-item">
        <h6 className="mb-2 fs-sm fw-bold">
          <FaEnvelope className="icon mt-n1 me-2" />
          {apartments?.email || 'N/A'}
        </h6>
      </li>
      <li className="nav-item iconbar-item">
        <h6 className="fs-sm fw-bold">
          <FaBriefcase className="icon mt-n1 me-2" />
          Exp: {apartments?.experience || 'N/A'}
        </h6>
      </li>
    </ul>
  );
}

{
  /*
import { FaBriefcase, FaEnvelope, FaMobile } from 'react-icons/fa';
export default function Iconbar({ apartments }) {
  return (
    <ul className="nav list-inline h-stack gap-4 flex-wrap  mt-4">
      <li className="nav-item">
        <h6 className=" mb-2 fs-sm fw-bold">
          <FaMobile className="card-icon mt-n1 me-2" />
          {apartments.phone}
        </h6>
      </li>
      <li className="nav-item">
        <h6 className=" mb-2 fs-sm fw-bold">
          <FaEnvelope className="card-icon mt-n1 me-2" />
          {apartments.email}
        </h6>
      </li>
      <li className="nav-item">
        <h6 className="fs-sm fw-bold">
          <FaBriefcase className="card-icon mt-n1 me-2" />
          Exp:{apartments.experience}
        </h6>
      </li>
    </ul>
  );
}
*/
}
