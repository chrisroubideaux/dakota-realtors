// Tab component
import Link from 'next/link';
import { FaCalendarAlt, FaBell, FaUser } from 'react-icons/fa';
import { format } from 'date-fns';

export default function Tab({ setActiveComponent, admins }) {
  const today = format(new Date(), 'MM/dd/yyyy');
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
          <div className="col-auto d-flex align-items-center">
            {/* Date Form and Buttons aligned side by side */}
            <form
              className="d-flex"
              style={{ width: '10rem', marginRight: '1rem' }}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="dash-daterange"
                  value={today}
                  readOnly
                />
                <button className="btn btn-sm badge ">
                  <FaCalendarAlt className="social-icon fs-6" />
                </button>
              </div>
            </form>

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

            <div className="dropdown d-inline me-2">
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
                  <Link className="dropdown-item" href="/editHomes">
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

            <a
              className="btn btn-sm badge m-2"
              href="#"
              onClick={() => setActiveComponent('Calendar')}
            >
              Calendar
              <FaCalendarAlt className="m-1" />
            </a>
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
import { format } from 'date-fns';

export default function Tab({ setActiveComponent, admins }) {
  const today = format(new Date(), 'MM/dd/yyyy');
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
              <a>
                <form className="d-flex" style={{ width: '10rem' }}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="dash-daterange"
                      value={today}
                      readOnly
                    />
                    <button className="btn btn-sm badge ">
                      <FaCalendarAlt className="social-icon fs-6 " />
                    </button>
                  </div>
                </form>
              </a>
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

              <div className="dropdown d-inline me-2">
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
                      className="dropdown-item "
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
                    <Link className="dropdown-item" href="/editHomes">
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

              <a
                className="btn btn-sm badge m-2"
                href="#"
                onClick={() => setActiveComponent('Calendar')}
              >
                Calendar
                <FaCalendarAlt className="m-1" />
              </a>
            
              </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
*/
}
