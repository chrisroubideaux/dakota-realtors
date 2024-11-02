// Sidebar component
import Link from 'next/link';

export default function Sidebar({ setActiveComponent, admins }) {
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3001/auth/logout', {
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
            <div className="avatar avatar-xxl avatar-circle mb-3">
              <img
                className="avatar"
                src="./assets/img/160x160/img9.jpg"
                alt=""
              />
              <img
                className="avatar-status avatar-lg-status"
                src="./assets/svg/illustrations/top-vendor.svg"
                alt=""
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Verified user"
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
                  <i className=" me-1 fs-6 fa-solid fa-person"></i>Bio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/sales/sales">
                  <i className="fs-6 fa-solid fa-money-bill"></i> Sales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/calendar/calendar">
                  <i className="fs-6 fa-solid fa-list-check"></i> Open House
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/team/Team">
                  <i className="fs-6 fa-solid fa-users"></i> Team
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>
                  <i className="fs-6 fa-solid fa-person-walking"></i> Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
