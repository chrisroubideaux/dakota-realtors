// Admins page
'use client';
// admin page
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
// import
import Nav from '@/components/nav/Nav';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
import Bio from '@/components/admin/Bio';
import Messages from '@/components/admin/Messages';
import ViewMessages from '@/components/admin/ViewMessages';
import Notifications from '@/components/admin/Notifications';
import Form from '@/components/admin/Form';
import HomeForm from '@/components/admin/HomeForm';
import CommercialForm from '@/components/admin/CommercialForm';
import { Apartments } from '@/components/admin/edit/Apartments';
import EditApartment from '@/components/admin/edit/EditApartment';

export default function Admin() {
  const { id } = useParams();
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [message, setMessage] = useState([]);
  const [apartments, setApartments] = useState([]);

  // admin
  useEffect(() => {
    axios
      .get(`https://dakota-realtors.onrender.com/admins`)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, []);

  // Fetch apartments
  useEffect(() => {
    axios
      .get('https://dakota-realtors.onrender.com/apartments')
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
      case 'ViewMessages':
        return <ViewMessages setActiveComponent={setActiveComponent} />;
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
      case 'EditApartment':
        return (
          <EditApartment
            apartments={apartments}
            setActiveComponent={setActiveComponent}
          />
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
        {/*<Navbar/> */}
        <Tab setActiveComponent={setActiveComponent} />
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              {admins.map((admins, index) => (
                <Sidebar
                  key={index}
                  admins={admins}
                  setActiveComponent={setActiveComponent}
                />
              ))}
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
