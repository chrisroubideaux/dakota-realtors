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
import Image from 'next/image';

export default function Calendar({ onSelectDate, apartments, userId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState({});

  const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  };

  const handleSlotChange = (appointmentId, newSlot) => {
    setSelectedSlots((prevState) => ({
      ...prevState,
      [appointmentId]: newSlot,
    }));
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('Authentication token is missing.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/appointments', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setAppointments(response.data.appointments);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.response?.data?.error || 'Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  //

  const handleReschedule = async (appointmentId, newSlot) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('Authentication token is missing.');
        return;
      }

      await axios.patch(
        `http://localhost:3001/appointments/${appointmentId}`,
        { slot: newSlot },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      // Update local state to reflect the changes
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, slot: newSlot }
            : appointment
        )
      );
    } catch (err) {
      console.error('Error rescheduling appointment:', err);
      setError(err.response?.data?.error || 'Error rescheduling appointment');
    }
  };

  //
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
      console.error('Appointments data is not an array:', appointments);
      return [];
    }

    return appointments.flatMap((appointment) => {
      if (!appointment.date || !appointment.user || !appointment.apartment) {
        console.warn('Missing required fields in appointment:', appointment);
        return [];
      }

      const parsedDate = new Date(appointment.date);
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');

      return [
        {
          date: formattedDate,
          type: eventTypes.appointments,
          title: (
            <div>
              {appointment.name || 'N/A'} with {appointment.user.name || 'N/A'}
              <div className="small-text">
                {appointment.slot || 'No slot provided'}
              </div>
            </div>
          ),
          slot: appointment.slot,
          sender: appointment.user.name,
          recipient: appointment.apartment.name,
          apartment: appointment.apartment,
          user: appointment.user,
          createdAt: appointment.createdAt,
          updatedAt: appointment.updatedAt,
          dayOfWeek: appointment.dayOfWeek || 'Unknown',
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

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const eventsForDay = combinedEvents.filter((event) => {
          if (!event.date) {
            console.warn('Event with missing date:', event);
            return false;
          }
          return isSameDay(day, new Date(event.date));
        });

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
    if (!events || !Array.isArray(events)) {
      console.warn('Invalid events for selected date:', events);
      setSelectedDayEvents([]);
    } else {
      setSelectedDayEvents(events);
    }
    setSelectedDate(day);
    setShowModal(true);
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleUpdateAppointment = async (appointmentId, updatedData) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('User is not logged in');
        setError('User is not logged in');
        return;
      }

      const response = await axios.put(
        `http://localhost:3001/appointments/${appointmentId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Close the modal after a successful update
      setShowAddModal(false);

      // Update the local state with the updated appointment
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, ...response.data.appointment }
            : appointment
        )
      );
    } catch (err) {
      console.error(
        'Error updating appointment:',
        err.response?.data || err.message
      );
      setError('Error updating appointment');
    }
  };

  return (
    <div>
      {renderHeader()}
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
                  Events on {format(selectedDate, 'MMMM dd, yyyy')}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
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
                  onClick={() => setShowAddModal(true)}
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal - Add Appointment */}
      {showAddModal && (
        <div
          className="modal fade show d-block"
          id="exampleModalToggle2"
          aria-hidden="true"
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: '750px' }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reschedule</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
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
                          value={
                            selectedAppointment === appointment._id
                              ? selectedSlot
                              : ''
                          }
                          onChange={(e) => {
                            setSelectedSlot(e.target.value);
                            setSelectedAppointment(appointment._id);
                          }}
                        >
                          <option value="">Select a time slot</option>
                          {[
                            '9:00 AM - 10:00 AM',
                            '10:00 AM - 11:00 AM',
                            '11:00 AM - 12:00 PM',
                            '1:00 PM - 2:00 PM',
                            '2:00 PM - 3:00 PM',
                            '3:00 PM - 4:00 PM',
                          ]
                            .filter((slot) => slot !== appointment.slot)
                            .map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
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
              <div className="modal-footer">
                <button
                  className="btn btn-md badge"
                  onClick={() => {
                    handleUpdateAppointment({
                      date: format(selectedDate, 'yyyy-MM-dd'),
                      slot: selectedSlot,
                      user: { name: userId },
                    });
                  }}
                >
                  Save Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
*/
}
