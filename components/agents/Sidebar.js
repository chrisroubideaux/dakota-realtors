// Sidebar component
import Link from 'next/link';
import Image from 'next/image';

import {
  FaUser,
  FaHouseUser,
  FaUsers,
  FaProjectDiagram,
  FaRegHandPeace,
} from 'react-icons/fa';

export default function Sidebar({ setActiveComponent, agents }) {
  const handleLogout = async () => {
    try {
      await fetch('https://dakota-realtors.onrender.com/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="d-flex flex-column p-4 gap-4 py-md-3">
      <div className="card mb-5">
        <div className="card-body" style={{ minWidth: '350px' }}>
          <div className="d-none d-lg-block mb-5">
            <div className="">
              <Image
                src={agents.image || '/fallback-image.jpg'}
                width={120}
                height={120}
                className="avatar mx-3 my-3"
                alt="mls"
              />
            </div>
            <h4 className="card-title mb-0">{agents.name}</h4>
            <p className="card-text small">{agents.email}</p>
            <span className="text-cap">
              <h4>Account</h4>
            </span>
            <ul className=" nav d-flex flex-column text-start mb-4 fw-bold">
              <li className="nav-item">
                <Link className="nav-link" href={`/agents/${agents._id}`}>
                  <FaUser className="me-1 fs-6 " />
                  Bio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/sales/sales">
                  <FaProjectDiagram className="fs-6 fa-solid" /> Sales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/calendar/calendar">
                  <FaHouseUser className="fs-6 me-1" /> Open House
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/team">
                  <FaUsers className="fs-6 fa-solid" /> Team
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>
                  <FaRegHandPeace className="fs-6 me-1" /> Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
