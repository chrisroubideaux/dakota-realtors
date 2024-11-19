// Calendar
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
  parse,
} from 'date-fns';

const Calendar = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', type: '', time: '' });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="header py-3">
        <button className="btn btn-sm" onClick={prevMonth}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <button className="btn btn-sm" onClick={nextMonth}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <div className="daysRow">
        {daysOfWeek.map((day, index) => (
          <div className="day" key={index}>
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
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        const event = events.find((e) =>
          isSameDay(parse(e.date, 'yyyy-MM-dd', new Date()), day)
        );

        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart) ? 'disabled' : ''
            } ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            {event && (
              <div className="event">
                <strong>{event.title}</strong>
                <span>{event.time}</span>
              </div>
            )}
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

  const onDateClick = (day) => {
    setSelectedDate(day);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.type && newEvent.time) {
      const newEventData = {
        date: format(selectedDate, 'yyyy-MM-dd'),
        ...newEvent,
      };
      setEvents([...events, newEventData]);
      setNewEvent({ title: '', type: '', time: '' });
      setShowModal(false);
    } else {
      alert('Please fill all the fields for the event.');
    }
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="calendar" style={{ minWidth: '350px' }}>
      <div className="align-items-center">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create Event</h3>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Event Type (e.g., Meeting)"
              value={newEvent.type}
              onChange={(e) =>
                setNewEvent({ ...newEvent, type: e.target.value })
              }
            />
            <input
              type="time"
              placeholder="Time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
            />
            <button onClick={handleSaveEvent}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
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
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parse,
} from 'date-fns';

const Calendar = ({ setActiveComponent, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="">
        <div className="header py-3">
          <button className="btn btn-sm" onClick={() => prevMonth()}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <span>{format(currentDate, dateFormat)}</span>
          </div>
          <button className="btn btn-sm" onClick={() => nextMonth()}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day container-fluid" key={i}>
          {daysOfWeek[i]}
        </div>
      );
    }

    return (
      <div className="">
        <div className="daysRow">{days}</div>
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
        const event = events.find((event) =>
          isSameDay(day, parse(event.date, 'yyyy-MM-dd', new Date()))
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
                : ''
            } ${event ? event.type : ''}`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            {event && <span className="event">{event.title}</span>}
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

  const onDateClick = (day) => {
    setSelectedDate(day);
    const eventTitle = prompt('Enter event title');
    const eventType = prompt(
      'Enter event type (meeting, video-chat, reminder)'
    );

    if (onSelectDate) {
      onSelectDate(day);
    }

    if (eventTitle && eventType) {
      setEvents([
        ...events,
        { date: format(day, 'yyyy-MM-dd'), type: eventType, title: eventTitle },
      ]);
    }
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  const prevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  return (
    <div className="calendar" style={{ minWidth: '350px' }}>
      <div className="align-items-center">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
*/
}
