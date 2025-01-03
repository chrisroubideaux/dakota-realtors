// agent bio page
'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
// component imports
import Nav from '@/components/nav/Nav';
import Navbar from '@/components/agents/Navbar';
import Bio from '@/components/agents/Bio';
import Footer from '@/components/misc/Footer';

const AgentBio = ({}) => {
  const { id } = useParams();
  const [agent, setAgent] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dakota-realtors.onrender.com/agents/${id}`)
      .then((response) => {
        setAgent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, [id]);

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
