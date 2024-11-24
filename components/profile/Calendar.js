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
import axios from 'axios';

const isValidDate = (date) => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

const Calendar = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          console.error('User is not logged in');
          setError('User is not logged in');
          return;
        }

        const response = await axios.get('http://localhost:3001/appointments', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setAppointments(response.data.appointments);
      } catch (err) {
        console.error(
          'Error fetching appointments:',
          err.response?.data || err.message
        );
        setError(err.response?.data?.error || 'Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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

  const formatAppointments = (appointments) => {
    if (!Array.isArray(appointments)) {
      return [];
    }

    return appointments.flatMap((appointment) => {
      const parsedDate = new Date(appointment.date);
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');

      return [
        {
          date: formattedDate,
          type: eventTypes.appointments,
          title: (
            <div>
              {appointment.name} with {appointment.user.name}
              <div className="small-text">{appointment.slot}</div>
            </div>
          ),
          slot: appointment.slot,
          sender: appointment.user.name,
          recipient: appointment.apartment.name,
          apartment: appointment.apartment,
          user: appointment.user,
          createdAt: appointment.createdAt,
          updatedAt: appointment.updatedAt,
          dayOfWeek: appointment.dayOfWeek,
        },
      ];
    });
  };

  const combinedEvents = [
    ...generateRecurringEvents(currentDate),
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
                : isSameDay(day, new Date())
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              <div className="modal-body">
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`calendar bg-transparent m-2 ${event.type}`}
                    >
                      <h6 className="py-3 fs-6 mt-2">{event.title}</h6>
                      {event.type === eventTypes.appointments && (
                        <div className="fs-6">
                          <h6>
                            <strong>Date:</strong>{' '}
                            {format(new Date(event.date), 'MM/dd/yyyy')}
                          </h6>

                          <h6>
                            <strong>Time:</strong> {event.slot}
                          </h6>
                          <h6>
                            <strong>Realtor:</strong> {event.apartment?.name}
                          </h6>
                          <h6>
                            <strong>Address:</strong>{' '}
                            {event.apartment?.location}
                          </h6>
                          <h6>
                            <strong>Client:</strong> {event.sender}
                          </h6>
                          <h6>
                            <strong>Phone:</strong> {event.user?.phone}
                          </h6>
                          <h6>
                            <strong>Booked:</strong>{' '}
                            {isValidDate(event.createdAt)
                              ? format(new Date(event.createdAt), 'MM/dd/yyyy')
                              : 'Invalid Date'}
                          </h6>
                          <h6>
                            <strong>Day of Week:</strong> {event.dayOfWeek}
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

{
  /*
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
*/
}
