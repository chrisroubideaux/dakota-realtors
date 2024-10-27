//agents page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// component imports
import Nav from '@/components/nav/Nav';
import Hero from '@/components/agents/Hero';
import Banners from '@/components/agents/Banners';
import Realtors from '@/components/agents/Realtors';
import Footer from '@/components/misc/Footer';

function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/agents')
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, []);
  return (
    <>
      <div className="layout">
        <Nav />
        <Hero />
        <Banners />
        <div className="container text-center py-4 my-4 pt-5 mt-3">
          <div className="row row-cols-1 row-cols-1">
            {agents.map((agents) => (
              <div
                key={agents.id}
                className=" col-md-4 col-md-6 col-sm-12 mb-4"
              >
                <Realtors agents={agents} />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Agents;

{
  /*
export async function getServerSideProps() {
  try {
    // Make a GET request to fetch agents data from server
    const response = await axios.get(
      'http://localhost:3001/agents'
    );
    const agentsData = response.data;

    // Return data as props to the component
    return {
      props: {
        agents: agentsData,
      },
    };
  } catch (error) {
    console.error('Error fetching agents:', error);
    return {
      props: {
        agents: [],
      },
    };
  }
}

*/
}
