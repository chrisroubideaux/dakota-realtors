// Edit Commercial
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
//import { Commercials } from '@/components/commercials/edit/Commericals';
import EditCommercial from '@/components/commercials/edit/EditCommercial';

export default function EditCommercials() {
  const { id } = useParams();
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [commercial, setCommercial] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/commercials/${id}`)
      .then((response) => {
        setCommercial(response.data);
      })
      .catch((error) => {
        console.error('Error fetching commercials:', error);
      });
  }, [id]);

  // render component
  const renderComponent = () => {
    console.log('Admin data for bio:', admins);
    switch (activeComponent) {
      case 'EditCommercial':
        return (
          <>
            <EditCommercial
              commercials={commercial}
              setActiveComponent={setActiveComponent}
            />
          </>
        );

      default:
        return (
          <EditCommercial
            commercials={commercial}
            setActiveComponent={setActiveComponent}
          />
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
