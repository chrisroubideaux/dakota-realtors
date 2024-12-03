// notifications
import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import axios from 'axios';

export default function Notifications({ currentAgentId }) {
  const [visibleAppointments, setVisibleAppointments] = useState([]);
  const [visibleRequests, setVisibleRequests] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const appointmentsResponse = await axios.get(
          'http://localhost:3001/appointments'
        );
        setVisibleAppointments(appointmentsResponse.data);

        const timeOffResponse = await axios.get(
          'http://localhost:3001/timeOff'
        );
        const filteredRequests = timeOffResponse.data.filter(
          (request) => request.agent._id === currentAgentId
        );
        setVisibleRequests(filteredRequests);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (currentAgentId) {
      fetchNotifications();
    }
  }, [currentAgentId]);

  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();

    if (!isValid(date)) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }

    return format(date, 'MM/dd/yyyy');
  };

  const deleteAppointment = (appointmentId) => {
    setVisibleAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment._id !== appointmentId
      )
    );
  };

  const deleteRequest = (requestId) => {
    setVisibleRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== requestId)
    );
  };

  const deleteAllNotifications = () => {
    setVisibleMeetings([]);
    setVisibleRequests([]);
  };

  return (
    <div className="mt-3 card">
      <div className="chat-container">
        <div className="card card-chat ">
          <div className="card-body d-flex ">
            {/*
            <button
              className="btn btn-sm badge"
              onClick={deleteAllNotifications}
            >
              Delete All
            </button>
            */}
          </div>
          <h6 className="fw-bold me-1">Notifications</h6>
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
                {visibleAppointments.length > 0 ? (
                  visibleAppointments.map((appointment) => (
                    <div className="accordion-body pb-1" key={appointment._id}>
                      <div className="meeting-container">
                        <div className="meeting-item">
                          <strong>Date:</strong>
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
                          <strong>Attendees:</strong>
                          <span>
                            {appointment.sender.name},{' '}
                            {appointment.recipient.name}
                          </span>
                        </div>
                        <div className="meeting-item">
                          <strong>Subject:</strong>
                          <span>{appointment.description || 'No subject'}</span>
                        </div>
                        <button
                          className="btn btn-sm mt-2"
                          onClick={() => deleteMeeting(appointment._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No appointments available</div>
                )}
              </div>
            </div>
            {/*
            <div className="accordion-item">
              <h5 className="accordion-header">
                <button
                  className="accordion-button fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseRequests"
                  aria-expanded="false"
                  aria-controls="collapseRequests"
                >
                  Time-Off Requests
                </button>
              </h5>
              <div
                id="collapseRequests"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                {visibleRequests.length > 0 ? (
                  visibleRequests.map((request) => (
                    <div className="accordion-body pb-1" key={request._id}>
                      <div className="request-container">
                        <div className="request-item">
                          <strong>Agent:</strong> <span>{request.name}</span>
                        </div>
                        <div className="request-item">
                          <strong>Date:</strong>{' '}
                          <span>{formatDate(request.timestamp)}</span>
                        </div>
                        <div className="request-item">
                          <strong>Request Type:</strong>{' '}
                          <span>{request.requestType}</span>
                        </div>
                        <div className="request-item">
                          <strong>Start Date:</strong>{' '}
                          <span>{formatDate(request.startDate)}</span>
                        </div>
                        <div className="request-item">
                          <strong>End Date:</strong>{' '}
                          <span>{formatDate(request.endDate)}</span>
                        </div>
                        <div className="request-item">
                          <strong>Status:</strong> <span>{request.status}</span>
                        </div>
                        <button
                          className="btn btn-sm mt-2"
                          onClick={() => deleteRequest(request._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No time-off requests available</div>
                )}
              </div>    
            </div>
           */}
          </div>
        </div>
      </div>
    </div>
  );
}
