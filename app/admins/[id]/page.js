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
import Notifications from '@/components/admin/Notifications';
import Form from '@/components/admin/Form';
import HomeForm from '@/components/admin/HomeForm';
import CommercialForm from '@/components/admin/CommercialForm';
import { Apartments } from '@/components/admin/edit/Apartments';
import EditApartment from '@/components/admin/edit/EditApartment';

export default function Admin() {
  const { id } = useParams();
  const [admin, setAdmin] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [message, setMessage] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [apartment, setApartment] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

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
  // Agent

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
    axios
      .get(`http://localhost:3001/messsages/${id}`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [id]);

  // Fetch appointments
  useEffect(() => {
    axios
      .get('http://localhost:3001/appointments')
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  // Fetch apartments
  useEffect(() => {
    axios
      .get('http://localhost:3001/apartments')
      .then((response) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, []);
  // Fetch Apartment

  useEffect(() => {
    axios
      .get(`http://localhost:3001/apartments/${id}`)
      .then((response) => {
        setApartment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, [id]);
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

      case 'Form':
        return <Form setActiveComponent={setActiveComponent} />;
      case 'HomeForm':
        return <HomeForm setActiveComponent={setActiveComponent} />;
      case 'CommercialForm':
        return <CommercialForm setActiveComponent={setActiveComponent} />;
      case 'ViewMessages':
        return <ViewMessages setActiveComponent={setActiveComponent} />;
      case 'Apartments':
        return (
          <>
            {apartments.map((apartments, index) => (
              <Apartments
                key={index}
                apartments={apartments}
                setActiveComponent={setActiveComponent}
              />
            ))}
          </>
        );

      case 'EditApartment':
        return (
          <EditApartment
            apartments={apartment}
            setActiveComponent={setActiveComponent}
          />
        );
      case 'Notifications':
        return (
          <Notifications
            appointments={appointments}
            //  timeOffRequests={timeOffRequests}
            setActiveComponent={setActiveComponent}
          />
        );

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
        {
          /*
      case 'TimeOff':
        return (
          <TimeOff
            timeOffRequests={timeOffRequests}
            setActiveComponent={setActiveComponent}
          />
        );
        */
        }
      default:
        return <Bio admins={admin} />;
    }
  };
  return (
    <>
      <Nav />
      <div className="layout h-100">
        {/*<Navbar/> */}
        <Tab admins={admin} setActiveComponent={setActiveComponent} />
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
