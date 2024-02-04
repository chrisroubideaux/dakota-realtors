// apartments page
'use client';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Hero from '@/components/apartments/Hero';
import Banners from '@/components/apartments/Banners';
import Tab from '@/components/nav/Tab';
import FeaturedApartments from '@/components/apartments/FeaturedApartments';
import Details from '@/components/misc/Details';
import Reviews from '@/components/apartments/Reviews';
import Footer from '@/components/misc/Footer';
// axios
import axios from 'axios';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch apartments from your server
    axios
      .get('https://midwest-realtors-95d2cdb37007.herokuapp.com/apartments')
      .then((response) => {
        // Update the state with the fetched apartments
        setApartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, []);
  return (
    <>
      {/* page layout */}

      <div className="layout">
        {/* nav */}
        <Nav />
        <Hero />
        <Banners />
        {/* Apartments */}
        <div className="container px-4 py-5" id="properties">
          <Tab />
          <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-4">
            {apartments.map((apartments) => (
              <div key={apartments.id} className="pt-4 ">
                <FeaturedApartments apartments={apartments} />
              </div>
            ))}
          </div>
        </div>
        {/* Details */}
        <Details />

        <Reviews />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Apartments;

// Fetch data on the server side using getServerSideProps
{
  /*
export async function getServerSideProps() {
  try {
    // Make a GET request to fetch apartments data from your server
    const response = await axios.get('http://localhost:3001/apartments');
    const apartmentsData = response.data;

    // Return data as props to the component
    return {
      props: {
        apartments: apartmentsData,
      },
    };
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return {
      props: {
        apartments: [],
      },
    };
  }
}
*/
}
