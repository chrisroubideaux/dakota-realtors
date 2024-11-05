// Tab component
import Link from 'next/link';

import { format } from 'date-fns';
import { FaCalendarAlt, FaBell } from 'react-icons/fa';

const Tab = ({ setActiveComponent }) => {
  const today = format(new Date(), 'MM/dd/yyyy');
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3 me-4">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-none d-lg-block">
              <h3 className="fw-normal">Calendar</h3>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/admin/admin">Profile</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Library
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <ul className="nav">
          <li className="nav-item me-3">
            <div className="gap-2 justify-content-center">
              <span className="me-2 badge appointments rounded-pill">
                Appointments
              </span>
              <span className="me-2 badge openhouse rounded-pill">
                Open House
              </span>
              <span className="me-2 badge meetings rounded-pill">Meetings</span>
            </div>
          </li>
          <li className="nav-item me-2">
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
          </li>

          <li className="nav-item me-2">
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
          </li>
          <li className="nav-item ">
            <a
              className="btn btn-sm m-1 badge"
              href="#"
              onClick={() => setActiveComponent('Calendar')}
            >
              Calendar
              <FaCalendarAlt className="m-1" />
            </a>
          </li>
        </ul>
      </div>

      {/* Display Upcoming Meetings */}
    </>
  );
};

export default Tab;

{
  /*
import { format } from 'date-fns';
import { FaBell, FaComment, FaCalendarAlt } from 'react-icons/fa';

export default function Tab({ setActiveComponent }) {
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
              <a className=" btn btn-sm badge bg-transparent" href="#" style={{backGround: ''}}>
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
              <a
                className="btn btn-sm  badge"
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
