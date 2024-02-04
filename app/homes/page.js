// home page
'use client';
import { useState, useEffect } from 'react';
import Nav from '@/components/nav/Nav';
import Heros from '@/components/homes/Heros';
import Tab from '@/components/nav/Tab';
import Banners from '@/components/homes/Banners';
import FeaturedHomes from '@/components/homes/FeaturedHomes';
import Details from '@/components/misc/Details';
//import Reviews from '@/components/homes/Reviews';
import Footer from '@/components/misc/Footer';
// utils

import axios from 'axios';

// metadata

const Homes = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    // GET request to fetch homes data from server
    axios
      .get('https://midwest-realtors-95d2cdb37007.herokuapp.com/homes')
      .then((response) => {
        // Update the state with the fetched homes
        setHomes(response.data);
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
        <Heros />
        <Banners />
        {/* homes */}
        <div className="container px-4 py-5" id="properties">
          <Tab />
          <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-4">
            {homes.map((homes) => (
              <div key={homes.id} className="pt-4 ">
                <FeaturedHomes homes={homes} />
              </div>
            ))}
          </div>
        </div>
        <Details />

        {/* <Reviews /> */}

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homes;

// Function fetching data on the server side using getServerSideProps
{
  /*
export async function getServerSideProps() {
  try {
    // GET request to fetch homes data from server
    const response = await axios.get('http://localhost:3001/homes');
    const homes = response.data;

    // Return the 'homes' data as props
    return {
      props: {
        homes,
      },
    };
  } catch (error) {
    console.error('Error fetching homes:', error);

    // handle errors 
    return {
      redirect: {
        destination: '/error', 
        permanent: false,
      },
    };
  }
}

*/
}
