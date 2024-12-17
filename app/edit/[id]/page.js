'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/admin/Tab';
import Sidebar from '@/components/admin/Sidebar';
import EditApartments from '@/components/apartments/edit/EditApartments';
import HomeForm from '@/components/admin/HomeForm';
import EditCommercial from '@/components/commercials/edit/EditCommercial';

export default function EditProperties({}) {
  const { id } = useParams();
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('');
  const [apartment, setApartment] = useState([]);
  const [commercial, setCommercial] = useState([]);
  // admin
  useEffect(() => {
    {
      axios
        .get(`https://dakota-realtors.onrender.com/admins`)
        .then((response) => {
          setAdmins(response.data);
        })
        .catch((error) => {
          console.error('Error fetching admins:', error);
        });
    }
  }, []);
  // Apartments
  useEffect(() => {
    axios
      .get(`https://dakota-realtors.onrender.com/apartments/${id}`)
      .then((response) => {
        setApartment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, [id]);

  // Fetch commercial data by id
  // Apartments
  useEffect(() => {
    axios
      .get(`https://dakota-realtors.onrender.com/commercials/${id}`)
      .then((response) => {
        setCommercial(response.data);
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

      case 'EditApartments':
        return (
          <EditApartments
            apartments={apartment}
            setActiveComponent={setActiveComponent}
          />
        );

      case 'EditCommercial':
        return (
          <EditCommercial
            commercials={commercial}
            setActiveComponent={setActiveComponent}
          />
        );

      default:
        return (
          <EditApartments
            apartments={apartment}
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

{
  /*
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Tab from '@/components/apartments/Tab';
import Sidebar from '@/components/admin/Sidebar';
import EditApartments from '@/components/apartments/edit/EditApartments';
import HomeForm from '@/components/admin/HomeForm';
import EditCommercial from '@/components/commercials/edit/EditCommercial';

export default function EditProperties({}) {
  const { id } = useParams();
  const [admins, setAdmins] = useState([]);
  const [activeComponent, setActiveComponent] = useState('');
  const [apartment, setApartment] = useState([]);
  const [commercial, setCommercial] = useState([]);
  // admin
  useEffect(() => {
    {
      axios
        .get(`http://localhost:3001/admins`)
        .then((response) => {
          setAdmins(response.data);
        })
        .catch((error) => {
          console.error('Error fetching admins:', error);
        });
    }
  }, []);
  // Apartments
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

  // Fetch commercial data by id
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/commercials/${id}`)
        .then((response) => setCommercial(response.data))
        .catch((error) => console.error('Error fetching commercials:', error));
    }
  }, [id]);

  // render component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'HomeForm':
        return <HomeForm setActiveComponent={setActiveComponent} />;

      case 'EditApartments':
        return (
          <EditApartments
            apartments={apartment}
            setActiveComponent={setActiveComponent}
          />
        );

      case 'EditCommercial':
        return (
          <EditCommercial
            commercial={commercial} // Pass single commercial object
            setActiveComponent={setActiveComponent}
          />
        );

      default:
        return (
          <EditApartments
            apartments={apartment}
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
*/
}
