// Edit homes page
'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
import EditHome from '@/components/homes/edit/EditHome';

export default function EditProperties({}) {
  const { id } = useParams();
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('');
  const [home, setHome] = useState([]);

  // admin
  useEffect(() => {
    {
      axios
        .get(`http://dakota-realtors.duckdns.org/admins`)
        .then((response) => {
          setAdmins(response.data);
        })
        .catch((error) => {
          console.error('Error fetching admins:', error);
        });
    }
  }, []);

  // Fetch single home by id

  useEffect(() => {
    axios
      .get(`http://dakota-realtors.duckdns.org/homes/${id}`)
      .then((response) => {
        setHome(response.data);
      })
      .catch((error) => {
        console.error('Error fetching homes:', error);
      });
  }, [id]);

  // render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'EditHomes':
        return (
          <EditHome homes={home} setActiveComponent={setActiveComponent} />
        );

      default:
        return (
          <EditHome homes={home} setActiveComponent={setActiveComponent} />
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
