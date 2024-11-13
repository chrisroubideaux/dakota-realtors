// Edit properties page
'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Sidebar from '@/components/admin/Sidebar';
import EditApartments from '@/components/apartments/edit/EditApartments';

export default function Page() {
  const { id } = useParams();
  const [admin, setAdmin] = useState([]);
  const [apartment, setApartment] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/admins/${id}`)
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, [id]);
  // useEffect

  useEffect(() => {
    axios
      .get(`http://localhost:3001/apartments/${id}`)
      .then((response) => {
        setApartment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, [id]);
  return (
    <>
      <Nav />

      <EditApartments
        apartments={apartment}
        setActiveComponent={setActiveComponent}
      />
    </>
  );
}

{
  /*
'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/apartments/Tab';
import Sidebar from '@/components/admin/Sidebar';
import EditApartments from '@/components/apartments/edit/EditApartments';
import HomeForm from '@/components/admin/HomeForm';
import CommercialForm from '@/components/admin/CommercialForm';
//import { Apartments } from '@/components/admin/edit/Apartments';
//import EditApartment from '@/components/admin/edit/EditApartment';

export default function edit() {
  const { id } = useParams();
  const [admin, setAdmin] = useState([]);
  const [activeComponent, setActiveComponent] = useState('PersonalInfo');
  const [apartment, setApartment] = useState([]);

  // admin
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admins/${id}`)
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/apartments/${id}`)
      .then((response) => {
        setApartment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, [id]);
  // render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'HomeForm':
        return <HomeForm setActiveComponent={setActiveComponent} />;
      case 'CommercialForm':
        return <CommercialForm setActiveComponent={setActiveComponent} />;

      case 'EditApartments':
        return (
          <EditApartments
            apartment={apartment}
            setActiveComponent={setActiveComponent}
          />
        );

      default:
        return (
          <EditApartments
            apartment={apartment}
            setActiveComponent={setActiveComponent}
          />
        );
    }
  };
  return (
    <>
      <Nav />
      <div className="layout h-100">
       
        <Tab admins={admin} setActiveComponent={setActiveComponent} />
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3">
              <Sidebar admins={admin} setActiveComponent={setActiveComponent} />
            </div>
            <div className="col-lg-8 col-xxl-9">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
*/
}
