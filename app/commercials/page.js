// commercial page
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
// components
import Nav from '@/components/nav/Nav';
import Hero from '@/components/commercials/Hero';
import Tab from '@/components/nav/Tab';
import Banners from '@/components/commercials/Banners';
import CommercialProperties from '@/components/commercials/CommercialProperties';
import Details from '@/components/misc/Details';
import Reviews from '@/components/commercials/Reviews';
import Footer from '@/components/misc/Footer';
// utils
//import commercials from '@/data/featured/commercial';
//import reviews from '@/data/slider/reviews';

// metadata
{
  /*
export const metadata = {
  title: 'dakota realtors | commercial listings',
  description: 'nextjs real estate app',
};
*/
}
const Commercials = () => {
  const [commercials, setCommercials] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch commercial properties from server
    axios
      .get('https://midwest-realtors-95d2cdb37007.herokuapp.com/commercials')
      .then((response) => {
        // Update the state with the fetched commercial listings
        setCommercials(response.data);
      })
      .catch((error) => {
        console.error('Error fetching commercials:', error);
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
        {/* commercial */}
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

        <Reviews />

        {/* Footer */}
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
    const response = await axios.get('http://localhost:3001/commercials');
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
