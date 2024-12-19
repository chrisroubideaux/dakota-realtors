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

function Team() {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    axios
      .get('https://dakota-realtors.onrender.com/agents')
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
        <div className="container-fluid">
          <Nav />
          <Hero />
          <Banners />
          <div className="container text-center py-4 my-4 pt-5 mt-3">
            <div className="row row-cols-1 row-cols-1">
              {agents.slice(0, 4).map((agent, index) => (
                <div
                  key={agent.id || `agent-${index}`}
                  className=" col-md-4 col-md-6 col-sm-12 mb-4"
                >
                  <Realtors agents={agent} />
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Team;
