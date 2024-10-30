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
    axios
      .get('http://localhost:3001/commercials')
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
          <div className="row row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {commercials.slice(0, 4).map((commercial, index) => (
              <div
                key={commercial.id || `commercial-${index}`}
                className="pt-5 my-5"
              >
                <CommercialProperties commercials={commercial} />
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
