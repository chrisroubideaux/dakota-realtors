// edit properties page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
import { Commercials } from '@/components/commercials/edit/Commericals';
//import { EditCommercial } from '@/components/commercials/edit/EditCommerical';

export default function Commercial() {
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [commercials, setCommercials] = useState([]);

  // admin
  useEffect(() => {
    axios
      .get('https://dakota-realtors.onrender.com/admins')
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admin:', error);
      });
  }, []);

  // commercials
  useEffect(() => {
    axios
      .get('https://dakota-realtors.onrender.com/commercials')
      .then((response) => {
        setCommercials(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admin:', error);
      });
  }, []);

  // render component
  const renderComponent = () => {
    console.log('Admin data for Bio:', admins);
    switch (activeComponent) {
      case 'Commercials':
        return (
          <>
            {commercials.map((commercials, index) => (
              <Commercials
                key={index}
                commercials={commercials}
                setActiveComponent={setActiveComponent}
              />
            ))}
          </>
        );

      default:
        return (
          <>
            {commercials.map((commercials, index) => (
              <Commercials
                key={index}
                commercials={commercials}
                setActiveComponent={setActiveComponent}
              />
            ))}
          </>
        );
    }
  };
  return (
    <>
      <Nav />
      <div className="layout h-100">
        {admins.map((admins, index) => (
          <Tab
            key={index}
            admins={admins}
            setActiveComponent={setActiveComponent}
          />
        ))}
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <>
                {admins.map((admins, index) => (
                  <Sidebar
                    key={index}
                    admins={admins}
                    setActiveComponent={setActiveComponent}
                  />
                ))}
              </>
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
