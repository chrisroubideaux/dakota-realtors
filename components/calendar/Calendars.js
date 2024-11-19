import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // React-Calendar component
import 'react-calendar/dist/Calendar.css'; // Default React-Calendar styles

const CustomStyledCalendar = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDateClick = (date) => {
    if (onSelectDate) onSelectDate(date);

    const newEvent = {
      date: date.toISOString().split('T')[0], // Format for storage
      title: 'Event Title', // Example placeholder for event title
    };

    setEvents([...events, newEvent]);
  };

  const prevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const renderHeader = () => {
    const monthYear = currentDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    return (
      <div className="header py-3 d-flex align-items-center justify-content-between">
        <button className="btn btn-sm" onClick={prevMonth}>
          <i className="fa-solid fa-arrow-left"></i> Prev
        </button>
        <span>{monthYear}</span>
        <button className="btn btn-sm" onClick={nextMonth}>
          Next <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <div className="daysRow d-flex">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day text-center">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return events.some((event) => event.date === formattedDate)
      ? 'cell event-day'
      : 'cell';
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const event = events.find((event) => event.date === formattedDate);
    return event ? <span className="event">{event.title}</span> : null;
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDays()}
      <Calendar
        value={currentDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setCurrentDate(activeStartDate)
        }
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
        tileContent={tileContent}
        showNeighboringMonth={false}
      />
    </div>
  );
};

export default CustomStyledCalendar;

{
  /*
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

const CustomStyledCalendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onSelectDate) onSelectDate(date);

    const newEvent = {
      date: date.toISOString().split('T')[0], 
      title: 'Event Title', 
    };

    setEvents([...events, newEvent]);
  };

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return events.some((event) => event.date === formattedDate)
      ? 'cell event-day'
      : 'cell';
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const event = events.find((event) => event.date === formattedDate);
    return event ? <span className="event-title">{event.title}</span> : null;
  };

  return (
    <div className="custom-calendar">
     
      <div className="header">
        <button
          className="btn prev"
          onClick={() => console.log('Previous month')}
        >
          &#8592; Prev
        </button>
        <span className="current-month">Your Custom Header Here</span>
        <button className="btn next" onClick={() => console.log('Next month')}>
          Next &#8594;
        </button>
      </div>

    
      <Calendar
        value={selectedDate}
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />
    </div>
  );
};

export default CustomStyledCalendar;
*/
}
