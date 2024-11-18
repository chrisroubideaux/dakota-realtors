'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
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
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayClick = (date) => {
    setSelectedDay(date);
    setSelectedDate(date);

    // Automatically transition to the second modal
    const nextModalTrigger = document.querySelector(
      'button[data-bs-target="#exampleModalToggle2"]'
    );
    if (nextModalTrigger) nextModalTrigger.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/appointments', {
        apartmentId: apartments._id,
        selectedSlot,
        appointmentId: selectedAppointment ? selectedAppointment._id : null,
      });

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
      {/* First Modal: Calendar */}
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
              <CalendarEvent
                className="calendar text-center"
                onClickDay={handleDayClick}
                value={selectedDay}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Modal: Time Selection */}
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
                <div className="card mb-2" style={{ maxWidth: '540px' }}>
                  <div className="card-body">
                    <p className="fs-6">
                      {alertMessage} || {selectedDate.toDateString()}
                    </p>
                  </div>
                  <div className="card-footer d-flex text-nowrap m-auto">
                    <button className="btn btn-sm" onClick={handleSubmit}>
                      View your appointment
                    </button>
                  </div>
                </div>
              )}
              <div className="list-group-item list-group-item-action d-flex gap-3 py-3 ">
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
                    <h6 className="">{apartments.name}</h6>
                  </div>
                  <small className="opacity-50 text-nowrap">
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                    >
                      <option value="">Select a time slot</option>
                      <option value={apartments.slot}>{apartments.slot}</option>
                      <option value={apartments.slot2}>
                        {apartments.slot2}
                      </option>
                    </select>
                  </small>
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

      {/* Main Button to Open Calendar */}
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
