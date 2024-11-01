'use client';
// admin page
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
// import
import Nav from '@/components/nav/Nav';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
import Bio from '@/components/admin/Bio';
import Messages from '@/components/admin/Messages';
import ViewMessages from '@/components/admin/ViewMessages';
//import Notifications from '@/components/admin/Notifications';
//import Calendar from '@/components/calendar/Calendar';
//import Schedule from '@/components/admin/Schedule';
import TimeOff from '@/components/admin/TimeOff';

export default function Admin() {
  const { id } = useParams();
  const [admin, setAdmin] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [message, setMessage] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [agentId, setAgentId] = useState('');

  // admin
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admins/${id}`)
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, [id]);
  //
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

  // Fetch message data
  useEffect(() => {
    if (id) {
      const fetchMessageData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/messages/${id}`
          );
          console.log('Message data:', response.data);
          setMessage(response.data);

          if (response.data.length > 0) {
            setSelectedRecipient(response.data[0].recipient);
          }
        } catch (error) {
          console.error('Error fetching message data:', error);
        }
      };

      fetchMessageData();
    }
  }, [id]);

  // Fetch meetings
  useEffect(() => {
    axios
      .get('http://localhost:3001/meetings')
      .then((response) => {
        setMeetings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching meetings:', error);
      });
  }, []);

  // timeoff api

  useEffect(() => {
    const fetchTimeOffRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/timeOff');
        setTimeOffRequests(response.data);
        console.log('Time-off data:', response.data);
      } catch (error) {
        console.error('Error fetching time-off data:', error);
      }
    };

    fetchTimeOffRequests();
  }, []);
  // render component
  const renderComponent = () => {
    console.log('Admin data for Bio:', admin);
    switch (activeComponent) {
      case 'Messages':
        return (
          <Messages
            messages={message}
            setActiveComponent={setActiveComponent}
            currentAdminId={admin._id}
            selectedRecipientId={agentId}
            recipientId={agentId}
            senderModel="Admin"
            recipientModel="Agent"
          />
        );
        {
          /*
      case 'Calendar':
        return <Calendar setActiveComponent={setActiveComponent} />;
        */
        }
      case 'ViewMessages':
        return <ViewMessages setActiveComponent={setActiveComponent} />;
        {
          /*
      case 'Notifications':
        return (
          <Notifications
            meetings={meetings}
            timeOffRequests={timeOffRequests}
            setActiveComponent={setActiveComponent}
          />
        );
        */
        }
        {
          /*
      case 'Schedule':
        return (
          <Schedule
            meetings={meetings}
            setActiveComponent={setActiveComponent}
          />
        );
        */
        }
      case 'TimeOff':
        return (
          <TimeOff
            timeOffRequests={timeOffRequests}
            setActiveComponent={setActiveComponent}
          />
        );
      default:
        return <Bio admins={admin} />;
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
              <Sidebar admins={admin} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
