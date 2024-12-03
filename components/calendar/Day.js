// Calendar component for single day

import { useState, useEffect } from 'react';
import { format, isSameDay, addDays, subDays } from 'date-fns';

const Day = ({ setActiveComponent, appointments }) => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [events, setEvents] = useState([]);
  const threeDaysAgo = subDays(new Date(), 3);
  const threeDaysAhead = addDays(new Date(), 3);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('dayEvents')) || [];

    const formattedAppointments = appointments.map((appointments) => {
      const appointmentDate = new Date(appointment.days[0]);
      const [startTime, endTime] = appointment.slot
        .split('-')
        .map((time) => time.trim());
      const hour = parseInt(startTime);

      return {
        date: appointmentDate,
        hour: hour,
        attendees: `${appointments.sender.name}, ${appointments.recipient.name}`,
        type: appointments.isVideo ? 'Video' : 'Appointment',
        time: `${startTime} - ${endTime}`,
      };
    });

    const currentDayEvents = [
      ...storedEvents,
      ...formattedAppointments.filter((appointment) =>
        isSameDay(appointment.date, currentDay)
      ),
    ];

    setEvents(currentDayEvents);
  }, [currentDay, appointments]);

  const renderHeader = () => {
    const dateFormat = 'EEEE, MMM d yyyy';
    return (
      <div className="d-flex justify-content-between align-items-center">
        <h5>{format(currentDay, dateFormat)}</h5>
        <div>
          <button
            className="btn btn-sm me-2 badge"
            onClick={() => toggleDay('prev')}
            disabled={isSameDay(currentDay, threeDaysAgo)}
          >
            Previous Day
          </button>

          <button
            className="btn btn-sm badge"
            onClick={() => toggleDay('next')}
            disabled={isSameDay(currentDay, threeDaysAhead)}
          >
            Next Day
          </button>
        </div>
      </div>
    );
  };

  const renderCells = () => {
    const hours = Array.from({ length: 11 }, (_, i) => 7 + i);

    return (
      <div className="body" style={{ minWidth: '350px' }}>
        {hours.map((hour) => {
          const event = events.find((event) => event.hour === hour);
          const formattedTime = format(new Date().setHours(hour), 'h a');

          return (
            <div key={hour} className="d-flex align-items-stretch mb-3">
              <div className="time-col">
                <span className="m-3 ">{formattedTime}</span>
              </div>
              <div className="cell">
                {event && (
                  <span className="">
                    <strong className="">Time:</strong> {event.time}{' '}
                    <strong>Attendees:</strong> {event.attendees}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const toggleDay = (direction) => {
    if (direction === 'next') {
      setCurrentDay((prev) => addDays(prev, 1));
    } else if (direction === 'prev') {
      setCurrentDay((prev) => subDays(prev, 1));
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-12 mb-2 mb-md-0">{renderHeader()}</div>
          <div className="mt-3">{renderCells()}</div>
        </div>
      </div>
    </div>
  );
};

export default Day;
