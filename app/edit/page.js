// edit properties page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/apartments/Tab';
import Sidebar from '@/components/admin/Sidebar';
//import Form from '@/components/apartments/Form';
//import HomeForm from '@/components/homes/HomeForm';
//import CommercialForm from '@/components/commercials/CommercialForm';
import { Apartments } from '@/components/apartments/edit/Apartments';
//import EditApartment from '@/components/admin/edit/EditApartment';

export default function Edit() {
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [apartments, setApartments] = useState([]);

  // admin
  useEffect(() => {
    axios
      .get('http://localhost:3001/admins')
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
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
  // render component
  const renderComponent = () => {
    console.log('Admin data for Bio:', admins);
    switch (activeComponent) {
      case 'Form':
        return <Form setActiveComponent={setActiveComponent} />;
      case 'HomeForm':
        return <HomeForm setActiveComponent={setActiveComponent} />;
      case 'CommercialForm':
        return <CommercialForm setActiveComponent={setActiveComponent} />;

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
