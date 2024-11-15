// Edit homes card

'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';

import { Homes } from '@/components/homes/edit/Homes';
//import { EditCommercial } from '@/components/commercials/edit/EditCommerical';

export default function Home() {
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [homes, setHomes] = useState([]);

  // admin
  useEffect(() => {
    axios
      .get('http://localhost:3001/admins')
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching admin:', error);
      });
  }, []);

  // homes
  useEffect(() => {
    axios
      .get('http://localhost:3001/homes')
      .then((response) => {
        setHomes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching home data:', error);
      });
  }, []);

  // render component
  const renderComponent = () => {
    console.log('Admin data for Bio:', admins);
    switch (activeComponent) {
      case 'Homes':
        return (
          <>
            {homes.map((homes, index) => (
              <Homes
                key={index}
                homes={homes}
                setActiveComponent={setActiveComponent}
              />
            ))}
          </>
        );

      default:
        return (
          <>
            {homes.map((homes, index) => (
              <Homes
                key={index}
                homes={homes}
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
