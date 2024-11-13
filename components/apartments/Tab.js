import Link from 'next/link';
import { FaCalendarAlt, FaBell, FaUser } from 'react-icons/fa';

export default function Tab({ setActiveComponent, admins }) {
  return (
    <div className="mt-2">
      <div className="container content-space-1 content-space-b-lg-3">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h1 className="h2">Edit Property</h1>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light mb-0">
                <li className="breadcrumb-item">Edit</li>
                <li className="breadcrumb-item active" aria-current="page">
                  Apartments, Homes, Commercial
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-auto">
            <div className="d-none d-lg-block">
              {/*
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
                      <Link className="dropdown-item" href={'/EditProperties'}>
                        Apartments
                      </Link>
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
                  </ul>
                </div>
              </a>
              */}
              <a
                className="btn btn-sm badge"
                href="#"
                onClick={() => setActiveComponent('Apartments')}
              >
                Edit Apartment
              </a>
              <a
                className="btn btn-sm badge m-2"
                href="#"
                onClick={() => setActiveComponent('Homes')}
              >
                Edit Home
              </a>
              <a
                className="btn btn-sm badge me-2"
                href="#"
                onClick={() => setActiveComponent('Commercials')}
              >
                Edit Commercial
              </a>
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
