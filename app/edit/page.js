// edit properties page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
//import HomeForm from '@/components/homes/HomeForm';
//import CommercialForm from '@/components/commercials/CommercialForm';
import { Apartments } from '@/components/apartments/edit/Apartments';
import { Homes } from '@/components/homes/edit/Homes';
import { Commercials } from '@/components/commercials/edit/Commericals';

export default function Edit() {
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [apartments, setApartments] = useState([]);
  const [homes, setHomes] = useState([]);
  const [commercials, setCommercials] = useState([]);

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

  // apartments
  useEffect(() => {
    axios
      .get(`http://localhost:3001/apartments`)
      .then((response) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, []);

  // homes
  useEffect(() => {
    axios
      .get(`http://localhost:3001/homes`)
      .then((response) => {
        setHomes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching homes:', error);
      });
  }, []);

  // commercials
  useEffect(() => {
    axios
      .get('http://localhost:3001/commercials')
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

      case 'Apartments':
        return (
          <>
            {apartments.map((apartments, index) => (
              <Apartments
                key={index}
                apartments={apartments}
                setActiveComponent={setActiveComponent}
              />
            ))}
          </>
        );

      default:
        return (
          <>
            {apartments.map((apartments, index) => (
              <Apartments
                key={index}
                apartments={apartments}
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
