// apartments page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// component imports
import Nav from '@/components/nav/Nav';
import Hero from '@/components/apartments/Hero';
import Banners from '@/components/apartments/Banners';
import Tab from '@/components/nav/Tab';
import FeaturedApartments from '@/components/apartments/FeaturedApartments';
import Details from '@/components/misc/Details';
//import Reviews from '@/components/apartments/Reviews';
import Footer from '@/components/misc/Footer';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/apartments')
      .then((response) => {
        setApartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, []);
  return (
    <>
      <div className="layout">
        <Nav />
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
        {/* <Reviews /> */}
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
    const response = await axios.get(
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/apartments'
    );
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
