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

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };
  {
    /*
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot || !selectedDate) {
      showAlertMessage('Please select a time slot and a date.');
      return;
    }

    const [hours, minutes] = selectedSlot.split(':');
    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));

    try {
      const response = await axios.post('http://localhost:3001/appointments', {
        agent: apartments.realtor,
        date: appointmentDateTime.toISOString(),
        apartmentId: apartments._id,
        appointmentId: selectedAppointment ? selectedAppointment._id : null,
      });

      console.log('Appointment created or rescheduled:', response.data);

      showAlertMessage(
        `Your appointment has been successfully booked for ${appointmentDateTime.toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
          }
        )} on ${appointmentDateTime.toDateString()} (${getDayOfWeek(
          appointmentDateTime
        )}).`
      );

      setSelectedAppointment(null);
      setSelectedSlot('');
    } catch (error) {
      console.error('Error creating appointment:', error);
      showAlertMessage('Failed to book the appointment. Please try again.');
    }
  };
*/
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot || !selectedDate) {
      showAlertMessage('Please select a time slot and a date.');
      return;
    }

    try {
      const appointmentDate = new Date(selectedDate);

      const response = await axios.post('http://localhost:3001/appointments', {
        agent: apartments.realtor, // The agent making the appointment
        date: appointmentDate.toISOString(),
        slot: selectedSlot, // Selected time slot
        apartmentId: apartments._id, // Pass the apartment ID
        userId: currentUser._id, // Include the current user's ID
      });

      console.log('Appointment created:', response.data);

      showAlertMessage(
        `Appointment successfully booked for ${selectedSlot} on ${appointmentDate.toDateString()}`
      );

      // Reset states after successful booking
      setSelectedAppointment(null);
      setSelectedSlot('');
    } catch (error) {
      console.error('Error creating appointment:', error);
      showAlertMessage('Failed to book the appointment. Please try again.');
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

  
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };
  

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot || !selectedDate) {
      showAlertMessage('Please select a time slot and a date.');
      return;
    }

    try {
      const appointmentDate = new Date(selectedDate);

      const response = await axios.post(
        'http://localhost:3001/appointments',
        {
          agent: apartments.realtor, // From props
          date: appointmentDate.toISOString(), // Format date as ISO string
          slot: selectedSlot, // Selected time slot
          apartmentId: apartments._id, // From props
        },
        {
          headers: { Authorization: `Bearer ${userToken}` }, // Include user token
        }
      );

      console.log('Appointment created:', response.data);

      showAlertMessage(
        `Appointment successfully booked for ${selectedSlot} on ${appointmentDate.toDateString()}`
      );

      setSelectedAppointment(null); // Reset selected appointment
      setSelectedSlot(''); // Clear slot selection
    } catch (error) {
      console.error('Error creating appointment:', error);
      showAlertMessage('Failed to book the appointment. Please try again.');
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
