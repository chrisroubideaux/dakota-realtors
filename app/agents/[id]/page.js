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
import Messages from '@/components/agents/Messages';
import ViewMessages from '@/components/agents/ViewMessages';
import Notifications from '@/components/agents/Notifications';
//import Calendar from '@/components/agents/Calendar';
//import TimeOff from '@/components/agetns/TimeOff';

export default function AgentBio() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [message, setMessage] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  //const [timeOffRequests, setTimeOffRequests] = useState([]);
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

  {
    /*
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
  */
  }
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
            selectedRecipientId={agent}
            recipientId={agent}
            senderModel="Agent"
            recipientModel="Admin"
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
