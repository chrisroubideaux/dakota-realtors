// agent bio page
'use client';
import { useState, useEffect } from 'react';

import Nav from '@/components/nav/Nav';
import Navbar from '@/components/agents/Navbar';
import Bio from '@/components/agents/Bio';
import Footer from '@/components/misc/Footer';
// data
//import agents from '@/data/featured/agents';

import axios from 'axios';

// metadata
export const metadata = {
  title: 'dakota realtors | agent details page',
  description: 'nextjs real estate app',
};

const AgentBio = ({ params }) => {
  const [agent, setAgent] = useState([]);
  // const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    // GET request to fetch agent data by id from your server
    axios
      .get(`http://localhost:3001/agents/${params.id}`)
      .then((response) => {
        // Update the state with the fetched agents
        setAgent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, [params.id]);
  // const agent = agents.find((agent) => agent.id === +params.id);
  return (
    <>
      <Nav />
      <div className="layout">
        <div className="container-fluid">
          <Navbar />
        </div>
        <div className="container-fluid ">
          <div className="row py-4">
            <div className="col-md-6">
              <h3 className="mt-2">{agent.name}</h3>
              <h1 className="fs-3">{agent.title}</h1>
              <div className="d-flex">
                <Bio agents={agent} />
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="text-center fs-1 fw-bold ">Bio</h3>
              <p className="d-flex justify-content-end fw-normal fs-5 mt-5 lh-3">
                {agent.bio}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AgentBio;
// Fetch data on the server side using getServerSideProps
export async function getServerSideProps({ params }) {
  try {
    // Make a GET request to fetch agent data from server using `params.id`
    const response = await axios.get(
      `http://localhost:3001/agents/${params.id}`
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
