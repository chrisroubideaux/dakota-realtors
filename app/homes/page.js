// home page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Heros from '@/components/homes/Heros';
import Tab from '@/components/nav/Tab';
import Banners from '@/components/homes/Banners';
import FeaturedHomes from '@/components/homes/FeaturedHomes';
import Details from '@/components/misc/Details';
//import Reviews from '@/components/homes/Reviews';
import Footer from '@/components/misc/Footer';

// Fetch all homes

const Homes = () => {
  const [homes, setHomes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    axios
      .get('https://dakota-realtors.onrender.com/homes')
      .then((response) => {
        setHomes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, []);

  return (
    <>
      <div className="layout">
        <div className="container-fluid">
          <Nav />
          <Heros />
          <Banners />

          <div className="container px-4 py-5" id="properties">
            <Tab />
            <div className="row row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
              {homes.slice(0, 8).map((home, index) => (
                <div key={home.id || `home-${index}`} className="pt-5 my-5">
                  <FeaturedHomes homes={home} />
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

export default Homes;
