// Notifactions
import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import axios from 'axios';

export default function Notifications({ appointments }) {
  const [visibleAppointments, setVisibleAppointments] = useState(appointments);

  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();

    if (!isValid(date)) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }

    return format(date, 'MM/dd/yyyy');
  };

  // Fetch time-off requests
  {
    /*
  useEffect(() => {
    const fetchTimeOffRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/timeoff');
        setTimeOffRequests(response.data);
      } catch (error) {
        console.error('Error fetching time-off requests:', error);
      }
    };

    fetchTimeOffRequests();
  }, []);
*/
  }

  const deleteNotification = (appointmentId) => {
    setVisibleAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment._id !== appointmentId
      )
    );
  };

  const deleteAllNotifications = () => {
    setVisibleMeetings([]);
    setTimeOffRequests([]);
  };

  return (
    <div className="mt-3 card">
      <div className="chat-container">
        <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
          <div className="card-body h-100 d-flex justify-content-between ">
            <h6 className="d-flex fw-bold mt-2">Notifications</h6>
          </div>
          <div className="">
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
                {visibleAppointments && visibleAppointments.length > 0 ? (
                  visibleAppointments.map((appointment) => (
                    <div className="accordion-body pb-1" key={appointment._id}>
                      <div className="meeting-container">
                        <div className="meeting-item">
                          <strong>Date:</strong>{' '}
                          <span>
                            {appointment.days.length > 0
                              ? formatDate(appointment.days[0])
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="meeting-item">
                          <strong>Time:</strong> <span>{appointment.slot}</span>
                        </div>

                        <div className="meeting-item">
                          <strong>Attendees:</strong>{' '}
                          <span>
                            {appointment.sender.name},{' '}
                            {appointment.recipient.name}
                          </span>
                        </div>
                        <div className="meeting-item">
                          <strong>Subject:</strong>{' '}
                          <span>{appointment.description || 'No subject'}</span>
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
                  <div>No meetings available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
