// bookings component
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import CalendarEvent from '@/components/calendar/CalendarEvent';

export default function Bookings({
  apartments,
  appointments,
  onUpdateAppointment,
  onDeleteAppointment,
  isAuthenticated,
}) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayClick = (date) => {
    setSelectedDay(date);
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setAlertMessage(
        'Please login or create an account to make an appointment.'
      );
      setShowAlert(true);
      return;
    }

    if (!selectedSlot) {
      setAlertMessage('Please select a time slot.');
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/appointments', {
        apartmentId: apartments._id,
        selectedSlot,
        appointmentId: selectedAppointment ? selectedAppointment._id : null,
      });

      console.log('Appointment created or rescheduled:', response.data);

      if (selectedAppointment) {
        showAlertMessage(
          `Your appointment has been rescheduled ${selectedSlot}.`
        );
      } else {
        showAlertMessage(
          `Your appointment has been successfully created for one hour from ${selectedSlot}.`
        );
      }

      setSelectedAppointment(null);
      setSelectedSlot('');
    } catch (error) {
      console.error('Error creating or rescheduling appointment:', error);

      showAlertMessage(
        `Selected time slot is not available. Please choose another time slot ${selectedSlot}.`
      );
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/appointments/${appointmentId}`
      );

      console.log('Appointment deleted:', response.data);

      alert('Appointment has been canceled successfully.');

      onDeleteAppointment(appointmentId);
    } catch (error) {
      console.error('Error deleting appointment:', error);

      alert('Error deleting appointment. Please try again later.');
    }
  };

  const showAlertMessage = (message) => {
    setAlertMessage(message);
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
              <a data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                <CalendarEvent
                  className="calendar text-center"
                  onClickDay={handleDayClick}
                  value={selectedDay}
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
                <div
                  className="card mb-2"
                  style={{ maxWidth: '540px' }}
                  role="alert"
                >
                  <div className="card-body">
                    <p className="fs-6">{alertMessage}</p>
                    {!isAuthenticated && (
                      <p>
                        <a href="/login" className="btn btn-link">
                          Go to Login
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
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
                      <option value={apartments.slot}>{apartments.slot}</option>
                      <option value={apartments.slot2}>
                        {apartments.slot2}
                      </option>
                      <option value={apartments.slot3}>
                        {apartments.slot3}
                      </option>
                      <option value={apartments.slot4}>
                        {apartments.slot4}
                      </option>
                      <option value={apartments.slot5}>
                        {apartments.slot5}
                      </option>
                      <option value={apartments.slot6}>
                        {apartments.slot6}
                      </option>
                      <option value={apartments.slot7}>
                        {apartments.slot7}
                      </option>
                    </select>
                  </small>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-md badge"
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
// bookings component
'use client';
// modal component for booking a tour
import React, { useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
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
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayClick = (date) => {
    setSelectedDay(date);
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/appointments', {
        apartmentId: apartments._id, // Send the apartment ID
        selectedSlot, // Send the selected time slot
        appointmentId: selectedAppointment ? selectedAppointment._id : null,
      });

      // Handle successful appointment creation or rescheduling
      console.log('Appointment created or rescheduled:', response.data);

      if (selectedAppointment) {
        showAlertMessage(
          `Your appointment has been rescheduled ${selectedSlot}.`
        );
      } else {
        showAlertMessage(
          `Your appointment has been successfully created for one hour from ${selectedSlot}.`
        );
      }

      setSelectedAppointment(null);
      setSelectedSlot('');
    } catch (error) {
      console.error('Error creating or rescheduling appointment:', error);

      showAlertMessage(
        `Selected time slot is not available. Please choose another time slot ${selectedSlot}.`
      );
    }
  };

  // Function to delete an appointment
  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/appointments/${appointmentId}`
      );

      console.log('Appointment deleted:', response.data);

      alert('Appointment has been canceled successfully.');

      onDeleteAppointment(appointmentId);
    } catch (error) {
      console.error('Error deleting appointment:', error);

      alert('Error deleting appointment. Please try again later.');
    }
  };

  const showAlertMessage = (message) => {
    setAlertMessage(message);
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
              <a data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                <Calendar
                  className="calendar text-center "
                  onClickDay={handleDayClick}
                  value={selectedDay}
                />
              </a>
            </div>
            <div className="modal-footer"></div>
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
                      {alertMessage} || {selectedDate.toDateString()}
                    </p>
                    <h3 className="fs-6"> </h3>
                  </div>
                  <div className="card-footer d-flex text-nowrap m-auto">
                    <button className="btn btn-sm" onClick={handleSubmit}>
                      view your appointment
                    </button>
                  </div>
                </div>
              )}
              <div className="">
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3 ">
                  <Image
                    src={apartments.photo || '/fallback-image.jpg'}
                    className="avatar"
                    width={200}
                    height={100}
                    alt="photo"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between mt-1">
                    <div className="">
                      <h6 className="fs-5 me-2">{apartments.realtor}</h6>
                      <h6 className="">{apartments.name}</h6>
                      <h6 className="">{apartments.times}</h6>
                    </div>
                    <small className="opacity-50 text-nowrap">
                      <h6 className="">{apartments.days}</h6>
                      <h6 className="">{apartments.slot}</h6>

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
                        <option value={apartments.slot4}>
                          {apartments.slot4}
                        </option>
                        <option value={apartments.slot5}>
                          {apartments.slot5}
                        </option>
                        <option value={apartments.slot6}>
                          {apartments.slot6}
                        </option>
                        <option value={apartments.slot7}>
                          {apartments.slot7}
                        </option>
                      </select>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-md"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to calendar
              </button>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-md"
                  onClick={handleSubmit}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-md"
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
