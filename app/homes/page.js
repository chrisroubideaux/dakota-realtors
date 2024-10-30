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

const Homes = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/homes')
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
    const response = await axios.get(
      'http://localhost:3001/homes'
    );
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
