// Tab component
import Link from 'next/link';
import { FaCalendarAlt, FaBell, FaBuilding } from 'react-icons/fa';

export default function Tab({ setActiveComponent }) {
  return (
    <div className="mt-2">
      <div className="container content-space-1 content-space-b-lg-3">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h1 className="h2">Personal info</h1>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light mb-0">
                <li className="breadcrumb-item">Account</li>
                <li className="breadcrumb-item active" aria-current="page">
                  Personal Info
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-auto">
            <div className="d-none d-lg-block">
              <a
                className="btn btn-sm m-1 badge"
                href="#"
                onClick={() => setActiveComponent('Notifications')}
              >
                Notifications
                <FaBell className="m-1" />
                <span className="badge bg-soft-dark text-grey rounded-pill nav-link-badge">
                  1
                </span>
              </a>
              <a className="nav-link badge bg-transparent fs-6">
                <div className="dropdown">
                  <button
                    className=" btn btn-lg p-2 badge dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Add Property
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setActiveComponent('Form')}
                      >
                        Apartments
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setActiveComponent('HomeForm')}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setActiveComponent('CommercialForm')}
                      >
                        Commercial
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setActiveComponent('MonthlyChart')}
                      >
                        Recently Added
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
              <Link className="btn btn-sm  badge" href="/calendars">
                Calendar
                <FaCalendarAlt className="m-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
