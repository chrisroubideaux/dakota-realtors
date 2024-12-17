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

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('Authentication token is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          'https://dakota-realtors.onrender.com/appointments',
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
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

  const handleUpdateAppointment = async (id, updatedData) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('User is not logged in');
        setError('User is not logged in');
        return;
      }

      const response = await axios.put(
        `https://dakota-realtors.onrender.com/appointments/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setShowAddModal(false);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id
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

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const onDateClick = (day) => {
    const selectedDateWithoutTime = new Date(day);
    selectedDateWithoutTime.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDateWithoutTime < today) {
      setError('Cannot select a past date.');
      return;
    }

    setSelectedDate(selectedDateWithoutTime);
    setShowAddModal(true);
  };

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
      if (
        !appointment.date ||
        !appointment.user ||
        (!appointment.apartment && !appointment.home && !appointment.commercial)
      ) {
        console.warn('Missing required fields in appointment:', appointment);
        return [];
      }

      const parsedDate = new Date(appointment.date);
      const formattedDate = format(parsedDate, 'MM/dd/yyyy');

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
          recipient:
            appointment.apartment?.name ||
            appointment.home?.name ||
            appointment.commercial?.name ||
            'No Name',
          apartment: appointment.apartment,
          home: appointment.home,
          commercial: appointment.commercial,
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

  const renderHeader = () => (
    <div className="header py-3">
      <button className="btn btn-sm badge" onClick={prevMonth}>
        <FaLongArrowAltLeft className="fs-4" />
      </button>
      <div>{format(currentDate, 'MMMM yyyy')}</div>
      <button className="btn btn-sm badge" onClick={nextMonth}>
        <FaLongArrowAltRight className="fs-4" />
      </button>
    </div>
  );

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
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(endOfMonth(currentDate));
    let day = startDate;

    const rows = [];
    while (day <= endDate) {
      const days = Array.from({ length: 7 }, () => {
        const dayCopy = new Date(day);
        const isToday = isSameDay(dayCopy, new Date());
        const isSelected = isSameDay(dayCopy, selectedDate);

        const eventsForDay = combinedEvents.filter((event) =>
          isSameDay(dayCopy, new Date(event.date))
        );

        const isOpenHouse = eventsForDay.some(
          (event) => event.type === eventTypes.openhouse
        );

        const cellClass = `cell ${
          !isSameMonth(dayCopy, monthStart)
            ? 'disabled'
            : isSelected
            ? 'selected'
            : isToday
            ? 'today'
            : isOpenHouse
            ? 'openhouse'
            : ''
        }`;

        const cellContent = (
          <>
            <span className="number">{format(dayCopy, 'd')}</span>
            {eventsForDay.map((event, index) => (
              <div
                key={index}
                className={`event ${event.type}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
          </>
        );

        day = addDays(day, 1);

        ///
        return (
          <div
            className={cellClass}
            key={dayCopy}
            onClick={() => onDateClick(dayCopy, eventsForDay)}
          >
            {cellContent}
          </div>
        );
      });

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="">
      {renderHeader()}
      <div className="px-1">{renderDays()}</div>
      {renderCells()}

      {showAddModal && selectedDate && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reschedule Appointment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Reschedule for:
                  {selectedDate
                    ? format(selectedDate, 'MM/dd/yyyy')
                    : 'N/A'}{' '}
                </p>
                {/*
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="list-group-item d-flex gap-3 py-3"
                    >
                      <Image
                        src={
                          appointment.home?.photo ||
                          appointment.apartment?.photo ||
                          '/fallback-image.jpg'
                        }
                        className="avatar"
                        width={200}
                        height={100}
                        alt="photo"
                      />
                      <div className="d-flex flex-column align-items-end w-100 ">
                        <h6>
                          {' '}
                          {appointment.home?.name ||
                            appointment.apartment?.name ||
                            'N/A'}{' '}
                        </h6>
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
               */}
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="list-group-item d-flex gap-3 py-3"
                    >
                      <Image
                        src={
                          appointment.home?.photo ||
                          appointment.apartment?.photo ||
                          appointment.commercial?.photo ||
                          '/fallback-image.jpg'
                        }
                        className="avatar"
                        width={200}
                        height={100}
                        alt="photo"
                      />
                      <div className="d-flex flex-column align-items-end w-100 ">
                        <h6>
                          {appointment.home?.name ||
                            appointment.apartment?.name ||
                            appointment.commercial?.name ||
                            'N/A'}
                        </h6>
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
                  className="btn btn-sm badge"
                  onClick={() =>
                    handleUpdateAppointment(selectedAppointment, {
                      date: selectedDate,
                      slot: selectedSlot,
                    })
                  }
                >
                  Save Changes
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
import Image from 'next/image';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('Authentication token is missing.');
        setLoading(false);
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

  const handleUpdateAppointment = async (id, updatedData) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('User is not logged in');
        setError('User is not logged in');
        return;
      }

      const response = await axios.put(
        `http://localhost:3001/appointments/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setShowAddModal(false);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id
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

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const onDateClick = (day) => {
    const selectedDateWithoutTime = new Date(day);
    selectedDateWithoutTime.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDateWithoutTime < today) {
      setError('Cannot select a past date.');
      return;
    }

    setSelectedDate(selectedDateWithoutTime);
    setShowAddModal(true);
  };

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
      const formattedDate = format(parsedDate, 'MM/dd/yyyy');

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

  const renderHeader = () => (
    <div className="header py-3">
      <button className="btn btn-sm badge" onClick={prevMonth}>
        <FaLongArrowAltLeft className="fs-4" />
      </button>
      <div>{format(currentDate, 'MMMM yyyy')}</div>
      <button className="btn btn-sm badge" onClick={nextMonth}>
        <FaLongArrowAltRight className="fs-4" />
      </button>
    </div>
  );

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
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(endOfMonth(currentDate));
    let day = startDate;

    const rows = [];
    while (day <= endDate) {
      const days = Array.from({ length: 7 }, () => {
        const dayCopy = new Date(day);
        const isToday = isSameDay(dayCopy, new Date());
        const isSelected = isSameDay(dayCopy, selectedDate);

        const eventsForDay = combinedEvents.filter((event) =>
          isSameDay(dayCopy, new Date(event.date))
        );

        const isOpenHouse = eventsForDay.some(
          (event) => event.type === eventTypes.openhouse
        );

        const cellClass = `cell ${
          !isSameMonth(dayCopy, monthStart)
            ? 'disabled'
            : isSelected
            ? 'selected'
            : isToday
            ? 'today'
            : isOpenHouse
            ? 'openhouse'
            : ''
        }`;

        const cellContent = (
          <>
            <span className="number">{format(dayCopy, 'd')}</span>
            {eventsForDay.map((event, index) => (
              <div
                key={index}
                className={`event ${event.type}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
          </>
        );

        day = addDays(day, 1);

        ///
        return (
          <div
            className={cellClass}
            key={dayCopy}
            onClick={() => onDateClick(dayCopy, eventsForDay)}
          >
            {cellContent}
          </div>
        );
      });

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="">
      {renderHeader()}
      <div className="px-1">{renderDays()}</div>
      {renderCells()}

      {showAddModal && selectedDate && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reschedule Appointment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Reschedule for:
                  {selectedDate
                    ? format(selectedDate, 'MM/dd/yyyy')
                    : 'N/A'}{' '}
                </p>

                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment._id}
                      className="list-group-item d-flex gap-3 py-3"
                    >
                      <Image
                        src={
                          appointment.home?.photo ||
                          appointment.apartment?.photo ||
                          '/fallback-image.jpg'
                        }
                        className="avatar"
                        width={200}
                        height={100}
                        alt="photo"
                      />
                      <div className="d-flex flex-column align-items-end w-100 ">
                        <h6>
                          {' '}
                          {appointment.home?.name ||
                            appointment.apartment?.name ||
                            'N/A'}{' '}
                        </h6>
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
                  className="btn btn-sm badge"
                  onClick={() =>
                    handleUpdateAppointment(selectedAppointment, {
                      date: selectedDate,
                      slot: selectedSlot,
                    })
                  }
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

*/
}
