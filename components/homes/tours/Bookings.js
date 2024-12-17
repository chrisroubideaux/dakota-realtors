// Component for schdeduling appointments
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import CalendarEvent from '@/components/calendar/CalendarEvent';

export default function Bookings({
  homes,
  userId,
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

  // Handle submit for booking or rescheduling
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

    const appointmentData = {
      agent: homes.realtor,
      date: selectedDate.toISOString(),
      slot: selectedSlot,
      homeId: homes._id,
      userId,
    };

    try {
      const response = await axios.post(
        'https://dakota-realtors.onrender.com/appointments',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Appointment created successfully:', response.data);

      showAlertMessage(
        `Appointment successfully booked for ${selectedSlot} on ${new Date(
          selectedDate
        ).toDateString()}.`,
        false,
        userId
      );
    } catch (error) {
      console.error('Error creating appointment:', error.response || error);

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

  // Display alert message
  const showAlertMessage = (message, showLoginButton = false, userId = '') => {
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
        {userId && (
          <Link href={`/user/${userId}`} className="btn btn-sm badge mt-2">
            View Appointments
          </Link>
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
                    src={homes.photo || '/fallback-image.jpg'}
                    className="avatar"
                    width={200}
                    height={100}
                    alt="photo"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between mt-1">
                    <div>
                      <h6 className="fs-5 me-2">{homes.realtor}</h6>
                      <h6>{homes.name}</h6>
                      <h6>{homes.times}</h6>
                    </div>
                    <small className="opacity-50 text-nowrap">
                      <h6>{homes.days}</h6>
                      <h6>{homes.slot}</h6>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      >
                        <option value="">Select a time slot</option>
                        <option value={homes.slot}>{homes.slot}</option>
                        <option value={homes.slot2}>{homes.slot2}</option>
                        <option value={homes.slot3}>{homes.slot3}</option>
                        <option value={homes.slot4}>{homes.slot4}</option>
                        <option value={homes.slot5}>{homes.slot5}</option>
                        <option value={homes.slot6}>{homes.slot6}</option>
                        <option value={homes.slot7}>{homes.slot7}</option>
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
import { useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
//import properties from '@/data/featured/properties';

export default function Bookings({ homes }) {
  const [value, onChange, onClickTile] = useState(new Date());

  const [date, setDate] = useState(new Date());
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
                  onChange={onClickTile}
                  value={value}
                  selectRange={true}
                ></Calendar>
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
              <h6 className=" fs-5" id="exampleModalToggleLabel2">
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
              <div className="">
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3 ">
                  <Image
                    src={homes.photo || '/fallback-image.jpg'}
                    className=" avatar"
                    width={200}
                    height={100}
                    alt="image"
                  />

                  <div className="d-flex gap-2 w-100 justify-content-between mt-1 ">
                    <div className="">
                      <h6 className="fs-5 me-2">{homes.realtor}</h6>
                      <h6 className="">{homes.name}</h6>
                      <h6 className="">{homes.times}</h6>
                    </div>

                    <small className="opacity-50 text-nowrap">
                    
                      <h6 className="">{homes.days}</h6>
                      <select>
                        <option value="1">{homes.slot}</option>
                        <option value="2">{homes.slot2}</option>
                        <option value="3">{homes.slot3}</option>
                        <option value="4">{homes.slot4}</option>
                        <option value="5">{homes.slot5}</option>
                        <option value="6">{homes.slot6}</option>
                        <option value="7">{homes.slot7}</option>
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
                back to calendar
              </button>
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
