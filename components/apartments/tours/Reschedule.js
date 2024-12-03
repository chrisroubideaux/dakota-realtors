// Reschdule component
import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  getDay,
} from 'date-fns';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import Image from 'next/image';

const Reschedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  const today = new Date();

  const eventTypes = {
    openhouse: 'open house',
    appointments: 'appointments',
  };

  const generateRecurringEvents = (currentMonth) => {
    let events = [];
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    let day = start;

    while (day <= end) {
      const dayOfWeek = getDay(day);

      if (dayOfWeek === 0) {
        events.push({
          date: format(day, 'yyyy-MM-dd'),
          type: eventTypes.openhouse,
          title: (
            <>
              Open House
              <div className="small-text">10 AM - 3 PM</div>
            </>
          ),
        });
      }

      day = addDays(day, 1);
    }

    return events;
  };

  const [recurringEvents, setRecurringEvents] = useState(
    generateRecurringEvents(currentDate)
  );

  useEffect(() => {
    setRecurringEvents(generateRecurringEvents(currentDate));
  }, [currentDate]);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header py-3">
        <button className="btn btn-sm badge" onClick={prevMonth}>
          <FaLongArrowAltLeft className="fs-4" />
        </button>
        <div>{format(currentDate, dateFormat)}</div>
        <button className="btn btn-sm badge" onClick={nextMonth}>
          <FaLongArrowAltRight className="fs-4" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="daysRow">
        {daysOfWeek.map((day, i) => (
          <div className="day container-fluid" key={i}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const eventsForDay = recurringEvents.filter((event) =>
          isSameDay(day, new Date(event.date))
        );

        const isOpenHouse = eventsForDay.some(
          (event) => event.type === eventTypes.openhouse
        );

        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart) ? 'disabled' : ''
            } ${isSameDay(day, selectedDate) ? 'selected' : ''} ${
              isSameDay(day, today) ? 'today' : ''
            } ${isOpenHouse ? 'openhouse' : ''}`}
            key={day}
            onClick={() => onDateClick(day, eventsForDay)}
          >
            <span className="number">{format(day, 'd')}</span>
            {eventsForDay.map((event, index) => (
              <div
                key={index}
                className={`event ${event.type}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day, events) => {
    setSelectedDate(day);
    setShowModal(true);
    setSelectedDayEvents(events);
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: '750px' }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Events for Selected Day</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {selectedDayEvents.map((event, index) => (
                  <div key={index} className="event-detail">
                    {event.title}
                  </div>
                ))}

                <Image
                  src="apartmentsphoto"
                  className="avatar"
                  width={200}
                  height={100}
                  alt="photo"
                />
                <div className="d-flex gap-2 w-100 justify-content-between mt-1">
                  <div>
                    <h6 className="fs-5 me-2">realtor</h6>
                    <h6>name</h6>
                    <h6>apartment</h6>
                  </div>
                  <small className="opacity-50 text-nowrap">
                    <h6>days</h6>
                    <h6>slot</h6>
                    <select>
                      <option value="">Select a time slot</option>
                      <option>slot 1</option>
                      <option>slot 2</option>
                      <option>slot 3</option>
                    </select>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reschedule;

{
  /*
import { useState } from 'react';
import Link from 'next/link';
import Calendar from '../../profile/Calendar';
import Image from 'next/image';
import axios from 'axios';

export default function RescheduleAppointment({ apartments }) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [activeModal, setActiveModal] = useState('first');

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

    if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
      showAlertMessage('Please select a valid date.');
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
      const response = await axios.post(
        'http://localhost:3001/appointments',
        appointmentData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
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

      const message =
        error.response?.status === 400
          ? 'Invalid request. Please check your input and try again.'
          : error.response?.status === 401
          ? 'Authentication failed. Please log in again.'
          : 'Something went wrong. Please try again.';
      showAlertMessage(message);
    }
  };

  const showAlertMessage = (message, showLoginButton = false, userId = '') => {
    setAlertMessage(
      <div>
        <p className="mb-0">{message}</p>
        {showLoginButton && (
          <button
            className="btn btn-md badge mt-2 w-100"
            onClick={() => (window.location.href = '/login')}
          >
            Log in to book an appointment
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

  const toggleModal = (modal) => {
    setActiveModal(modal);
    setShowAlert(false);
  };

  return (
    <div>
     
      {activeModal === 'first' && (
        <div className="modal fade show d-block" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ minWidth: '730px' }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Reschedule</h1>
                <button
                  className="btn-close"
                  onClick={() => toggleModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <a onClick={() => toggleModal('second')}>
                  <Calendar onSelectDate={handleDayClick} />
                </a>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-sm badge"
                  onClick={() => toggleModal('second')}
                >
                  Open second modal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

 
      {activeModal === 'second' && (
        <div className="modal fade show d-block" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Reschedule</h1>
                <button
                  className="btn-close"
                  onClick={() => toggleModal(null)}
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
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                  <Image
                    src={apartments?.photo || '/fallback-image.jpg'}
                    className="avatar"
                    width={200}
                    height={100}
                    alt="photo"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between mt-1">
                    <div>
                      <h6 className="fs-5 me-2">{apartments?.realtor || ''}</h6>
                      <h6>{apartments?.name || ''}</h6>
                      <h6>{apartments?.times}</h6>
                    </div>
                    <small className="opacity-50 text-nowrap">
                      <h6>{apartments?.days}</h6>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      >
                        <option value="">Select a time slot</option>
                        <option value={apartments?.slot}>
                          {apartments?.slot}
                        </option>
                        <option value={apartments?.slot2}>
                          {apartments?.slot2}
                        </option>
                        <option value={apartments?.slot3}>
                          {apartments?.slot3}
                        </option>
                      </select>
                    </small>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-sm badge"
                  onClick={() => toggleModal('first')}
                >
                  Back to first
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    
      <button className="btn btn-sm badge" onClick={() => toggleModal('first')}>
        Reschedule
      </button>
    </div>
  );
}
*/
}
