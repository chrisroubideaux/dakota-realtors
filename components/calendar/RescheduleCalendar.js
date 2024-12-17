// Reschedule component
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import Calendar from '@/components/profile/Calendar';

export default function RescheduleCalendar({ apartments, userId }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          console.error('User is not logged in');
          return;
        }

        const response = await axios.get(
          'https://dakota-realtors.onrender.com/appointments',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setAppointments(response.data.appointments);
      } catch (err) {
        console.error('Error fetching appointments:', err.message);
      }
    };

    fetchAppointments();
  }, [userId]);

  const getDayOfWeek = (date) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!authToken || !userId) {
      showAlertMessage('You must be logged in to book an appointment.', true);
      return;
    }

    if (!selectedSlot) {
      showAlertMessage('Please select a time slot.');
      return;
    }

    const appointmentData = {
      agent: apartments.realtor,
      date: selectedDate.toISOString(),
      slot: selectedSlot,
      apartmentId: apartments._id,
      userId,
    };

    try {
      const response = await axios.put(
        'https://dakota-realtors.onrender.com/appointments',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Appointment rescheduled successfully:', response.data);

      showAlertMessage(
        `Appointment successfully rescheduled for ${selectedSlot} on ${new Date(
          selectedDate
        ).toDateString()}.`,
        false
      );
    } catch (error) {
      console.error('Error rescheduling appointment:', error.message);
      showAlertMessage('Something went wrong. Please try again.');
    }
  };

  const showAlertMessage = (message, showLoginButton = false) => {
    setAlertMessage(
      <div>
        <p className="mb-0">{message}</p>
        {showLoginButton && (
          <button
            className="btn btn-md badge mt-2 w-100"
            onClick={() => (window.location.href = '/login')}
          >
            Log In
          </button>
        )}
      </div>
    );
    setShowAlert(true);
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="fw-normal fs-5" id="exampleModalToggleLabel">
                Reschedule
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <a
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
                onClick={() => setShowAlert(false)}
              >
                <Calendar
                  appointments={appointments}
                  onSelectDate={handleDayClick}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="fs-5" id="exampleModalToggleLabel2">
                Select a time
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {showAlert && (
                <div className="alert alert-info">{alertMessage}</div>
              )}
              <div>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="list-group-item d-flex gap-3 py-3"
                    >
                      <Image
                        src={
                          appointment.apartment?.photo || '/fallback-image.jpg'
                        }
                        className="avatar"
                        width={200}
                        height={100}
                        alt="photo"
                      />
                      <div className="d-flex flex-column w-100">
                        <h6>{appointment.apartment?.name || 'N/A'}</h6>
                        <h6>{appointment.date || 'N/A'}</h6>
                        <h6>Current Time: {appointment.slot}</h6>
                        <label htmlFor={`slot-${appointment._id}`}>
                          Select a new time:
                        </label>
                        <select
                          id={`slot-${appointment._id}`}
                          value={selectedSlot}
                          onChange={(e) => {
                            setSelectedSlot(e.target.value);
                            setSelectedAppointment(appointment._id);
                          }}
                        >
                          <option value="">Select a time slot</option>
                          {Object.entries(appointment)
                            .filter(
                              ([key, value]) => key.startsWith('slot') && value
                            )
                            .map(([key, value]) => (
                              <option key={key} value={value}>
                                {value}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No appointments available.</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-sm badge"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to calendar
              </button>
              <button
                type="submit"
                className="btn btn-md badge"
                onClick={handleSubmit}
              >
                Reschedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-md badge"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Reschedule
      </button>
    </>
  );
}

{
  /*
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import Calendar from '@/components/profile/Calendar';

export default function RescheduleCalendar({ apartments, userId }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          console.error('User is not logged in');
          return;
        }

        const response = await axios.get('http://localhost:3001/appointments', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setAppointments(response.data.appointments);
      } catch (err) {
        console.error('Error fetching appointments:', err.message);
      }
    };

    fetchAppointments();
  }, [userId]);

  const getDayOfWeek = (date) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!authToken || !userId) {
      showAlertMessage('You must be logged in to book an appointment.', true);
      return;
    }

    if (!selectedSlot) {
      showAlertMessage('Please select a time slot.');
      return;
    }

    const appointmentData = {
      agent: apartments.realtor,
      date: selectedDate.toISOString(),
      slot: selectedSlot,
      apartmentId: apartments._id,
      userId,
    };

    try {
      const response = await axios.put(
        'http://localhost:3001/appointments',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Appointment rescheduled successfully:', response.data);

      showAlertMessage(
        `Appointment successfully rescheduled for ${selectedSlot} on ${new Date(
          selectedDate
        ).toDateString()}.`,
        false
      );
    } catch (error) {
      console.error('Error rescheduling appointment:', error.message);
      showAlertMessage('Something went wrong. Please try again.');
    }
  };

  const showAlertMessage = (message, showLoginButton = false) => {
    setAlertMessage(
      <div>
        <p className="mb-0">{message}</p>
        {showLoginButton && (
          <button
            className="btn btn-md badge mt-2 w-100"
            onClick={() => (window.location.href = '/login')}
          >
            Log In
          </button>
        )}
      </div>
    );
    setShowAlert(true);
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="fw-normal fs-5" id="exampleModalToggleLabel">
                Book your tour
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <a
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
                onClick={() => setShowAlert(false)}
              >
                <Calendar onSelectDate={handleDayClick} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="fs-5" id="exampleModalToggleLabel2">
                Select a time
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {showAlert && (
                <div className="alert alert-info">{alertMessage}</div>
              )}
              <div>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="list-group-item d-flex gap-3 py-3"
                    >
                      <Image
                        src={
                          appointment.apartment?.photo || '/fallback-image.jpg'
                        }
                        className="avatar"
                        width={200}
                        height={100}
                        alt="photo"
                      />
                      <div className="d-flex flex-column w-100">
                        <h6>{appointment.apartment?.name || 'N/A'}</h6>
                        <h6>{appointment.date || 'N/A'}</h6>
                        <h6>Current Time: {appointment.slot}</h6>
                        <label htmlFor={`slot-${appointment._id}`}>
                          Select a new time:
                        </label>
                        <select
                          id={`slot-${appointment._id}`}
                          value={selectedSlot}
                          onChange={(e) => {
                            setSelectedSlot(e.target.value);
                            setSelectedAppointment(appointment._id);
                          }}
                        >
                          <option value="">Select a time slot</option>
                          {Object.entries(appointment)
                            .filter(
                              ([key, value]) => key.startsWith('slot') && value
                            )
                            .map(([key, value]) => (
                              <option key={key} value={value}>
                                {value}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No appointments available.</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-sm badge"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to calendar
              </button>
              <button
                type="submit"
                className="btn btn-md badge"
                onClick={handleSubmit}
              >
                Reschedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-md badge"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Reschedule a tour
      </button>
    </>
  );
}


*/
}
