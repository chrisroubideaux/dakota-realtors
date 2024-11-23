import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import axios from 'axios';

export default function Notifications({ userId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          console.error('User is not logged in');
          setError('User is not logged in');
          return;
        }

        console.log('Auth Token:', authToken);

        const response = await axios.get('http://localhost:3001/appointments', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setAppointments(response.data.appointments);
      } catch (err) {
        console.error(
          'Error fetching appointments:',
          err.response?.data || err.message
        );
        setError(err.response?.data?.error || 'Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isValid(date)) {
      return 'Invalid Date';
    }
    return format(date, 'MM/dd/yyyy');
  };

  const deleteNotification = (appointmentId) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment._id !== appointmentId
      )
    );
  };

  const deleteAllNotifications = () => {
    setAppointments([]);
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-3 card">
      <div className="chat-container">
        <div className="card-body d-flex justify-content-between">
          <h6 className="d-flex fw-bold mt-2">Notifications</h6>
          <button
            className="btn btn-sm badge me-2"
            onClick={deleteAllNotifications}
          >
            Delete All
          </button>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h5 className="accordion-header">
              <button
                className="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseMeetings"
                aria-expanded="true"
                aria-controls="collapseMeetings"
              >
                Appointments
              </button>
            </h5>
            <div
              id="collapseMeetings"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div className="accordion-body pb-1" key={appointment._id}>
                    <div className="meeting-container">
                      <div className="meeting-item">
                        <strong>Date:</strong>{' '}
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Time:</strong> <span>{appointment.time}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Slot:</strong> <span>{appointment.slot}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Realtor:</strong>{' '}
                        <span>{appointment.apartment?.name || 'N/A'}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Address:</strong>{' '}
                        <span>{appointment.apartment?.location || 'N/A'}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>User:</strong>{' '}
                        <span>{appointment.user?.name || 'N/A'}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Phone:</strong>{' '}
                        <span>{appointment.user?.phone || 'N/A'}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Created At:</strong>{' '}
                        <span>{formatDate(appointment.createdAt)}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Updated At:</strong>{' '}
                        <span>{formatDate(appointment.updatedAt)}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Day of Week:</strong>{' '}
                        <span>{appointment.dayOfWeek || 'N/A'}</span>
                      </div>
                      <button
                        className="btn btn-sm mt-2"
                        onClick={() => deleteNotification(appointment._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No appointments available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*
import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import axios from 'axios';

export default function Notifications({ userId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          console.error('User is not logged in');
          setError('User is not logged in');
          return;
        }

        console.log('Auth Token:', authToken);

        const response = await axios.get('http://localhost:3001/appointments', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setAppointments(response.data.appointments);
      } catch (err) {
        console.error(
          'Error fetching appointments:',
          err.response?.data || err.message
        );
        setError(err.response?.data?.error || 'Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isValid(date)) {
      return 'Invalid Date';
    }
    return format(date, 'MM/dd/yyyy');
  };

  const deleteNotification = (appointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== appointment)
    );
  };

  const deleteAllNotifications = () => {
    setAppointments([]);
  };

  // Conditional rendering based on loading or error state
  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-3 card">
      <div className="chat-container">
        <div className="card-body d-flex justify-content-between">
          <h6 className="d-flex fw-bold mt-2">Notifications</h6>
          <button
            className="btn btn-sm badge me-2"
            onClick={deleteAllNotifications}
          >
            Delete All
          </button>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h5 className="accordion-header">
              <button
                className="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseMeetings"
                aria-expanded="true"
                aria-controls="collapseMeetings"
              >
                Appointments
              </button>
            </h5>
            <div
              id="collapseMeetings"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              {appointments.length > 0 ? (
                appointments.map((appointments) => (
                  <div className="accordion-body pb-1" key={appointments._id}>
                    <div className="meeting-container">
                      <div className="meeting-item">
                        <strong>Date:</strong>{' '}
                        <span>{formatDate(appointments.date)}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Time:</strong> <span>{appointments.slot}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>Realtor:</strong>{' '}
                        <span>{appointments.apartment?.name || 'N/A'}</span>
                      </div>
                      <div className="meeting-item">
                        <strong>address:</strong>{' '}
                        <span>{appointments.apartment?.location || 'N/A'}</span>
                      </div>
                      <button
                        className="btn btn-sm mt-2"
                        onClick={() => deleteNotification(appointments._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No appointments available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
}
