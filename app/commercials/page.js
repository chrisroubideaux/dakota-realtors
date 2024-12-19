// Commercial page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Hero from '@/components/commercials/Hero';
import Tab from '@/components/nav/Tab';
import Banners from '@/components/commercials/Banners';
import CommercialProperties from '@/components/commercials/CommercialProperties';
import Details from '@/components/misc/Details';
import Footer from '@/components/misc/Footer';

const Commercials = () => {
  const [commercials, setCommercials] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Fetch commercials
    axios
      .get('https://dakota-realtors.onrender.com/commercials ')
      .then((response) => {
        setCommercials(response.data);
      })
      .catch((error) => {
        console.error('Error fetching commercials:', error);
      });
  }, []);

  return (
    <>
      <div className="layout">
        <div className="container-fluid">
          <Nav />
          <Hero />
          <Banners />
          <div className="container px-4 py-5" id="properties">
            <Tab />
            <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-4">
              {commercials.map((commercials) => (
                <div key={commercials.id} className="pt-4 ">
                  <CommercialProperties commercials={commercials} />
                </div>
              ))}
            </div>
          </div>
          <Details />
          {/* <Reviews /> */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Commercials;
