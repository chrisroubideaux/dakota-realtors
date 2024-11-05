// Calendar component
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

const Calendar = ({ onSelectDate, appointments = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const today = new Date();

  const eventTypes = {
    openhouse: 'open house',
    appointments: 'appointments',
    meeting: 'meeting',
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

  const formatAppointments = (appointments) => {
    if (!Array.isArray(appointments)) {
      return [];
    }

    return appointments.flatMap((appointment) => {
      const appointmentDates = appointment.days
        .map((day) => {
          const parsedDate = new Date(day);
          return isNaN(parsedDate.getTime())
            ? null
            : format(parsedDate, 'yyyy-MM-dd');
        })
        .filter(Boolean);

      return appointmentDates.map((date) => ({
        date,
        type: eventTypes.appointments,
        title: (
          <div className="">
            Appointments: {appointment.sender.name} &{' '}
            {appointment.recipient.name}
          </div>
        ),
        slot: appointment.slot,
        sender: appointment.sender.name,
        recipient: appointment.recipient.name,
      }));
    });
  };

  const combinedEvents = [
    ...recurringEvents,
    ...formatAppointments(appointments),
  ];

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
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;

        const eventsForDay = combinedEvents.filter((event) =>
          isSameDay(day, new Date(event.date))
        );

        const isOpenHouse = eventsForDay.some(
          (event) => event.type === eventTypes.openhouse
        );

        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : isSameDay(day, today)
                ? 'today'
                : isOpenHouse
                ? 'openhouse'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay, eventsForDay)}
          >
            <span className="number">{formattedDate}</span>

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

  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  return (
    <div className="calendar">
      <div className="align-items-center">{renderHeader()}</div>
      {renderDays()}
      {renderCells()}

      {showModal && (
        <div
          className="modal fade show d-block"
          id="exampleModalToggle"
          aria-hidden="true"
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: '750px' }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  Events on {format(selectedDate, 'MMMM d, yyyy')}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body ">
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map((event, index) => (
                    <div key={index} className={`box ${event.type}`}>
                      <h6 className="py-3 fs-6 mt-2">{event.title}</h6>
                      {event.type === eventTypes.meeting && (
                        <div className="fs-6">
                          <h6>
                            <strong>Time:</strong> {event.slot}
                          </h6>
                          <h6>
                            <strong>Sender:</strong> {event.sender}
                          </h6>
                          <h6>
                            <strong>Recipient:</strong> {event.recipient}
                          </h6>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No events for this day.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-md badge"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
