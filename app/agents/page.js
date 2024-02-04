//agents page
'use client';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Hero from '@/components/agents/Hero';
import Banners from '@/components/agents/Banners';
import Realtors from '@/components/agents/Realtors';
import Footer from '@/components/misc/Footer';
// data
//import agents from '@/data/featured/agents';

import axios from 'axios';

// metadata
{
  /*
export const metadata = {
  title: 'dakota realtors | agents page',
  description: 'nextjs real estate app',
};

*/
}

function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // GET request to fetch agents data from server
    axios
      .get('http://localhost:3001/agents')
      .then((response) => {
        // Update the state with the fetched agents
        setAgents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, []);
  return (
    <>
      {/* page layout */}
      <div className="layout">
        {/* nav */}
        <Nav />
        <Hero />
        <Banners />
        {/* Agents */}
        <div className="container text-center py-4 my-4 pt-5 mt-5">
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
        {/* footer */}
        <Footer />
      </div>
    </>
  );
}

export default Agents;

// Fetch data on the server side using getServerSideProps
{
  /*
export async function getServerSideProps() {
  try {
    // Make a GET request to fetch agents data from server
    const response = await axios.get('http://localhost:3001/agents');
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
