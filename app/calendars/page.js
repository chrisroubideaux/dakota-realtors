// calendar page
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Nav from '@/components/nav/Nav';
import Sidebar from '@/components/admin/Sidebar';
import Tab from '@/components/calendar/Tab';
import Calendar from '@/components/calendar/Calendars';
import Week from '@/components/calendar/Week';
import Day from '@/components/calendar/Day';

export default function Calendars() {
  const [activeComponent, setActiveComponent] = useState('Calendars');
  const [admins, setAdmins] = useState([]);
  const [meetings, setMeetings] = useState([]);

  // Fetch admins
  useEffect(() => {
    axios
      .get('https://dakota-realtors.onrender.com/admins ')
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admins:', error);
      });

    // Fetch meetings
    axios
      .get('https://dakota-realtors.onrender.com/meetings')
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
          <Week meetings={meetings} setActiveComponent={setActiveComponent} />
        );
      case 'Day':
        return (
          <Day meetings={meetings} setActiveComponent={setActiveComponent} />
        );
      case 'Calendar':
      default:
        return (
          <Calendar
            meetings={meetings}
            setActiveComponent={setActiveComponent}
          />
        );
    }
  };

  return (
    <>
      <div className="layout h-100">
        <Nav />
        {admins.slice(0, 8).map((admin, index) => (
          <div key={admin.id || `admin-${index}`} className="">
            <Tab
              setActiveComponent={setActiveComponent}
              admins={admin}
              meetings={meetings}
            />
          </div>
        ))}
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              {admins.slice(0, 8).map((admin, index) => (
                <div key={admin.id || `admin-${index}`} className="">
                  <Sidebar
                    setActiveComponent={setActiveComponent}
                    admins={admin}
                  />
                </div>
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
