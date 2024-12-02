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

  // Fetch appointments on mount
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
        `http://localhost:3001/appointments/${id}`, // Use 'id' here
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

        const cellClass = `cell ${
          !isSameMonth(dayCopy, monthStart)
            ? 'disabled'
            : isSelected
            ? 'selected'
            : isToday
            ? 'today'
            : ''
        }`;

        const appointment = appointments.find((appt) =>
          isSameDay(new Date(appt.date), dayCopy)
        );

        const cellContent = (
          <>
            <span className="number">{format(dayCopy, 'd')}</span>
            {appointment && (
              <div className="appointment-label">{appointment.slot}</div>
            )}
          </>
        );

        day = addDays(day, 1);

        return (
          <div
            className={cellClass}
            key={dayCopy}
            onClick={() => {
              setSelectedAppointment(appointment?._id || null);
              onDateClick(dayCopy);
            }}
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
    <div>
      {renderHeader()}
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
                <p>Selected Date: {format(selectedDate, 'MMMM dd, yyyy')}</p>
                <label htmlFor="slot-select">Select a new time slot:</label>
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
                  className="btn btn-primary"
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
