// commercial page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// component imports
import Nav from '@/components/nav/Nav';
import Hero from '@/components/commercials/Hero';
import Tab from '@/components/nav/Tab';
import Banners from '@/components/commercials/Banners';
import CommercialProperties from '@/components/commercials/CommercialProperties';
import Details from '@/components/misc/Details';
//import Reviews from '@/components/commercials/Reviews';
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
      .get('https://dakota-realtors.duckdns.org/commercials ')
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
    </>
  );
};

export default Commercials;

// Fetch data on the server side using getServerSideProps
{
  /*
export async function getServerSideProps() {
  try {
    // GET request to fetch commercial listings from server
    const response = await axios.get(
      '  http://localhost:3001/commercials'
    );
    const commercialListings = response.data;

    // Return data as props to the component
    return {
      props: {
        commercials: commercialListings,
      },
    };
  } catch (error) {
    console.error('Error fetching commercial listings:', error);
    return {
      props: {
        commercials: [],
      },
    };
  }
}

*/
}
