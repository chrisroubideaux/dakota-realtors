// Modal component for booking a tour
import React, { useState } from 'react';
import Image from 'next/image';
import CalendarEvent from '@/components/calendar/CalendarEvent';
import axios from 'axios';

export default function Bookings({
  apartments,
  appointments,
  onUpdateAppointment,
  onDeleteAppointment,
}) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

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
  // Handle day click
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  //Handle submit

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

    if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
      showAlertMessage('Please select a valid date.');
      return;
    }

    // Prepare appointment data
    const appointmentData = {
      agent: apartments.realtor,
      date: selectedDate.toISOString(),
      slot: selectedSlot,
      apartmentId: apartments._id,
      userId,
    };

    try {
      // Send the request with authentication header
      const response = await axios.post(
        'http://localhost:3001/appointments',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Appointment created successfully:', response.data);

      // Show success message
      showAlertMessage(
        `Appointment successfully booked for ${selectedSlot} on ${new Date(
          selectedDate
        ).toDateString()}.`
      );
    } catch (error) {
      console.error('Error creating appointment:', error.response || error);

      // Handle specific error responses
      if (error.response?.status === 400) {
        showAlertMessage(
          'Invalid request. Please check your input and try again.'
        );
      } else if (error.response?.status === 401) {
        showAlertMessage('Authentication failed. Please log in again.', true);
      } else {
        showAlertMessage('Something went wrong. Please try again.');
      }
    }
  };
  const showAlertMessage = (message, showLoginButton = false) => {
    setAlertMessage(
      <div>
        <p className="mb-0">{message}</p>
        {showLoginButton && (
          <button
            className="btn btn-md badge mt-2 w-100"
            onClick={() => {
              window.location.href = '/login';
            }}
          >
            You must be logged in to book an appointment
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
                <CalendarEvent onSelectDate={handleDayClick} />
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
                <div
                  className="card mb-2"
                  style={{ maxWidth: '540px' }}
                  role="alert"
                >
                  <div className="card-body">
                    <p className="fs-6">
                      {alertMessage}
                      <br />
                      Appointment Date: {selectedDate.toDateString()} (
                      {getDayOfWeek(selectedDate)})
                    </p>
                  </div>
                </div>
              )}
              <div>
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                  <Image
                    src={apartments.photo || '/fallback-image.jpg'}
                    className="avatar"
                    width={200}
                    height={100}
                    alt="photo"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between mt-1">
                    <div>
                      <h6 className="fs-5 me-2">{apartments.realtor}</h6>
                      <h6>{apartments.name}</h6>
                      <h6>{apartments.times}</h6>
                    </div>
                    <small className="opacity-50 text-nowrap">
                      <h6>{apartments.days}</h6>
                      <h6>{apartments.slot}</h6>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      >
                        <option value="">Select a time slot</option>
                        <option value={apartments.slot}>
                          {apartments.slot}
                        </option>
                        <option value={apartments.slot2}>
                          {apartments.slot2}
                        </option>
                        <option value={apartments.slot3}>
                          {apartments.slot3}
                        </option>
                      </select>
                    </small>
                  </div>
                </div>
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
                Book Appointment
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
        Book a tour
      </button>
    </>
  );
}
{
  /*
// Modal component for booking a tour
import React, { useState } from 'react';
import Image from 'next/image';
import CalendarEvent from '@/components/calendar/CalendarEvent';
import axios from 'axios';

export default function Bookings({
  apartments,
  appointments,
  onUpdateAppointment,
  onDeleteAppointment,
}) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

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
  // Handle day click
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  //Handle submit

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

    if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
      showAlertMessage('Please select a valid date.');
      return;
    }

    // Prepare appointment data
    const appointmentData = {
      agent: apartments.realtor,
      date: selectedDate.toISOString(),
      slot: selectedSlot,
      apartmentId: apartments._id,
      userId,
    };

    try {
      // Send the request with authentication header
      const response = await axios.post(
        'http://localhost:3001/appointments',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Appointment created successfully:', response.data);

      // Show success message
      showAlertMessage(
        `Appointment successfully booked for ${selectedSlot} on ${new Date(
          selectedDate
        ).toDateString()}.`
      );
    } catch (error) {
      console.error('Error creating appointment:', error.response || error);

      // Handle specific error responses
      if (error.response?.status === 400) {
        showAlertMessage(
          'Invalid request. Please check your input and try again.'
        );
      } else if (error.response?.status === 401) {
        showAlertMessage('Authentication failed. Please log in again.', true);
      } else {
        showAlertMessage('Something went wrong. Please try again.');
      }
    }
  };
  const showAlertMessage = (message, showLoginButton = false) => {
    setAlertMessage(
      <div>
        <p className="mb-0">{message}</p>
        {showLoginButton && (
          <button
            className="btn btn-md badge mt-2 w-100"
            onClick={() => {
              window.location.href = '/login';
            }}
          >
            You must be logged in to book an appointment
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
                <CalendarEvent onSelectDate={handleDayClick} />
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
                <div
                  className="card mb-2"
                  style={{ maxWidth: '540px' }}
                  role="alert"
                >
                  <div className="card-body">
                    <p className="fs-6">
                      {alertMessage}
                      <br />
                      Appointment Date: {selectedDate.toDateString()} (
                      {getDayOfWeek(selectedDate)})
                    </p>
                  </div>
                </div>
              )}
              <div>
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                  <Image
                    src={apartments.photo || '/fallback-image.jpg'}
                    className="avatar"
                    width={200}
                    height={100}
                    alt="photo"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between mt-1">
                    <div>
                      <h6 className="fs-5 me-2">{apartments.realtor}</h6>
                      <h6>{apartments.name}</h6>
                      <h6>{apartments.times}</h6>
                    </div>
                    <small className="opacity-50 text-nowrap">
                      <h6>{apartments.days}</h6>
                      <h6>{apartments.slot}</h6>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      >
                        <option value="">Select a time slot</option>
                        <option value={apartments.slot}>
                          {apartments.slot}
                        </option>
                        <option value={apartments.slot2}>
                          {apartments.slot2}
                        </option>
                        <option value={apartments.slot3}>
                          {apartments.slot3}
                        </option>
                      </select>
                    </small>
                  </div>
                </div>
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
                Book Appointment
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
        Book a tour
      </button>
    </>
  );
}
*/
}
