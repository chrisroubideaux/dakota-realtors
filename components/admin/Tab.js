// Tab component
import Link from 'next/link';
import { FaCalendarAlt, FaBell, FaUser } from 'react-icons/fa';

export default function Tab({ setActiveComponent, admins }) {
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
              <button
                className="btn btn-sm m-1 badge"
                onClick={() => setActiveComponent('Notifications')}
              >
                Notifications
                <FaBell className="m-1" />
                <span className="badge bg-soft-dark text-grey rounded-pill nav-link-badge">
                  1
                </span>
              </button>

              <div className="dropdown d-inline">
                <button
                  className="btn btn-lg p-2 badge dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add Property
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setActiveComponent('Form')}
                    >
                      Apartments
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setActiveComponent('HomeForm')}
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setActiveComponent('CommercialForm')}
                    >
                      Commercial
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setActiveComponent('Recently')}
                    >
                      Recently Added
                    </button>
                  </li>
                </ul>
              </div>

              <div className="dropdown d-inline">
                <button
                  className="btn btn-lg p-2 badge dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Edit Property
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/edit">
                      Apartments
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/Homes">
                      Homes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/editCommercial">
                      Commercials
                    </Link>
                  </li>
                </ul>
              </div>

              <Link className="btn btn-sm badge m-2" href="/calendars">
                Calendar
                <FaCalendarAlt className="m-1" />
              </Link>
              <Link className="btn btn-sm badge" href={`/admins/${admins._id}`}>
                Admin
                <FaUser className="m-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*
import Link from 'next/link';
import { FaCalendarAlt, FaBell, FaUser } from 'react-icons/fa';

export default function Tab({ setActiveComponent, admins }) {
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
                        onClick={() => setActiveComponent('Recently')}
                      >
                        Recently Added
                      </a>
                    </li>
                  </ul>
                </div>
              </a>

              <a className="nav-link badge bg-transparent fs-6">
                <div className="dropdown">
                  <button
                    className=" btn btn-lg p-2 badge dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Edit Property
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="/edit"
                        //   onClick={() => setActiveComponent('Apartments')}
                      >
                        Apartments
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/Homes"
                        //   onClick={() => setActiveComponent('Apartments')}
                      >
                        Homes
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/editCommercial"
                        //   onClick={() => setActiveComponent('Apartments')}
                      >
                        Commercials
                      </a>
                    </li>
                  </ul>
                </div>
              </a>

              <Link className="btn btn-sm badge m-2" href="/calendars">
                Calendar
                <FaCalendarAlt className="m-1" />
              </Link>
              <Link className="btn btn-sm badge" href={`/admins/${admins._id}`}>
                Admin
                <FaUser className="m-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
}
