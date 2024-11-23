// Profile page
'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
// import
import Nav from '@/components/nav/Nav';
import Tab from '@/components/profile/Tab';
import Sidebar from '@/components/profile/Sidebar';
import Bio from '@/components/profile/Bio';
import Messages from '@/components/profile/Messages';
import ViewMessages from '@/components/profile/ViewMessages';
import Notifications from '@/components/profile/Notifications';
import Calendar from '@/components/profile/Calendar';
//import Schedule from '@/components/admin/Schedule';
//import TimeOff from '@/components/admin/TimeOff';

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [message, setMessage] = useState([]);
  const [appointment, setAppointment] = useState([]);
  //const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [agentId, setAgentId] = useState('');

  // user
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, [id]);
  // Fetch agent data
  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/agents');
        if (response.data.length > 0) {
          setAgentId(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchAgentData();
  }, []);
  // Fetch appointments
  useEffect(() => {
    const fetchAppointment = async () => {
      const authToken = localStorage.getItem('authToken') || token;

      if (!authToken) {
        console.error('User is not logged in.');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/appointments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Filter appointments by logged-in user ID (if needed)
        setAppointment(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointment();
  }, [id]);

  // render component
  const renderComponent = () => {
    console.log('User data for Bio:', user);
    switch (activeComponent) {
      case 'Messages':
        return (
          <Messages
            messages={message}
            setActiveComponent={setActiveComponent}
            currentUserId={user._id}
            selectedRecipientId={agentId}
            recipientId={agentId}
            senderModel="User"
            recipientModel="Agent"
          />
        );

      case 'Calendar':
        return <Calendar setActiveComponent={setActiveComponent} />;

      case 'Notifications':
        return (
          <Notifications
            appointments={appointment}
            setActiveComponent={setActiveComponent}
          />
        );

      default:
        return <Bio users={user} />;
    }
  };
  return (
    <>
      <Nav />
      <div className="layout h-100">
        {/*<Navbar/> */}
        <Tab setActiveComponent={setActiveComponent} />
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <Sidebar users={user} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
