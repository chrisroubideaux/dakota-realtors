// agent bio page
'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
// import
import Nav from '@/components/nav/Nav';
import Tab from '@/components/agents/Tab';
import Sidebar from '@/components/agents/Sidebar';
import Profile from '@/components/agents/Profile';
//import Messages from '@/components/agents/Messages';
import ViewMessages from '@/components/agents/ViewMessages';
import Notifications from '@/components/agents/Notifications';
import Calendar from '@/components/agents/Calendar';

export default function AgentBio() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [appointment, setAppointment] = useState([]);
  //const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [agent, setAgent] = useState('');

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

  // agent
  useEffect(() => {
    axios
      .get(`http://localhost:3001/agents/${id}`)
      .then((response) => {
        setAgent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, [id]);

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

        setAppointment(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointment();
  }, [id]);

  // render component
  const renderComponent = () => {
    console.log('Admin data for Bio:', admin);
    switch (activeComponent) {
      case 'Calendar':
        return (
          <Calendar
            appointments={appointment}
            setActiveComponent={setActiveComponent}
          />
        );
      case 'ViewMessages':
        return <ViewMessages setActiveComponent={setActiveComponent} />;
      case 'Notifications':
        return (
          <Notifications
            appointments={appointment}
            setActiveComponent={setActiveComponent}
          />
        );
      default:
        return <Profile agents={agent} />;
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
              <Sidebar agents={agent} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

// Fetch data on the server side using getServerSideProps
{
  /*
export async function getServerSideProps({ params }) {
  try {
    // Make a GET request to fetch agent data from server using `params.id`
    const response = await axios.get(
      `http://localhost:3001/agents${params.id}`
    );
    const agentData = response.data;

    // Return data as props to the component
    return {
      props: {
        agent: agentData,
      },
    };
  } catch (error) {
    console.error('Error fetching agent:', error);
    return {
      props: {
        agent: {},
      },
    };
  }
}

*/
}
