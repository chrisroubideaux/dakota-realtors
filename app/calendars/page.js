// calendar page
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Nav from '@/components/nav/Nav';
import Sidebar from '@/components/admin/Sidebar';
import Tab from '@/components/calendar/Tab';
import Calendar from '@/components/calendar/Calendar';
import Week from '@/components/calendar/Week';
import Day from '@/components/calendar/Day';

export default function Calendars() {
  const [activeComponent, setActiveComponent] = useState('Calendars');
  const [admins, setAdmins] = useState([]);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // Fetch admins
    axios
      .get('http://localhost:3001/admins')
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });

    // Fetch meetings
    axios
      .get('http://localhost:3001/meetings')
      .then((response) => {
        setMeetings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching meetings:', error);
      });
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Week':
        return (
          <Week
            meetings={meetings}
            key={meetings.id}
            setActiveComponent={setActiveComponent}
          />
        );
      case 'Day':
        return (
          <Day
            meetings={meetings}
            key={meetings.id}
            setActiveComponent={setActiveComponent}
          />
        );

      case 'Calendar':
        return (
          <Calendar
            meetings={meetings}
            key={meetings.id}
            setActiveComponent={setActiveComponent}
          />
        );
      default:
        return (
          <Calendar
            meetings={meetings}
            key={meetings.id}
            setActiveComponent={setActiveComponent}
          />
        );
    }
  };

  return (
    <>
      <div className="layout h-100">
        <Nav />
        {admins.map((admins) => (
          <Tab
            setActiveComponent={setActiveComponent}
            key={admins.id}
            admins={admins}
            meetings={meetings}
          />
        ))}

        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              {admins.map((admins) => (
                <Sidebar
                  setActiveComponent={setActiveComponent}
                  key={admins.id}
                  admins={admins}
                />
              ))}
            </div>
            <div className="col-lg-8 col-xxl-9">
              <div className="mt-3">{renderComponent()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
