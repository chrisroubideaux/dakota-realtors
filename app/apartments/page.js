// apartments page
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '@/components/nav/Nav';
import Hero from '@/components/apartments/Hero';
import Banners from '@/components/apartments/Banners';
import Tab from '@/components/nav/Tab';
import FeaturedApartments from '@/components/apartments/FeaturedApartments';
import Details from '@/components/misc/Details';
import Footer from '@/components/misc/Footer';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Fetch apartments data
    axios
      .get('https://dakota-realtors.onrender.com/apartments')
      .then((response) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className="layout ">
        <Hero />
        <Banners />
        <div className="container px-4 py-5" id="properties">
          <Tab />
          <div className="row row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {apartments.slice(0, 8).map((apartment, index) => (
              <div key={apartment.id || `apartment-${index}`} className="">
                <FeaturedApartments apartments={apartment} />
              </div>
            ))}
          </div>
        </div>
        <Details />
        <Footer />
      </div>
    </>
  );
};

export default Apartments;
