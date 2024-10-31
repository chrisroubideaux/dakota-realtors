'use client';
// properties page
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
// components
import Nav from '@/components/nav/Nav';
import Search from '@/components/nav/Search';
import Featured from '@/components/misc/Features';
import Tab from '@/components/nav/Tab';
import FeaturedApartments from '@/components/apartments/FeaturedApartments';
import FeaturedHomes from '@/components/homes/FeaturedHomes';
import CommercialProperties from '@/components/commercials/CommercialProperties';
import Details from '@/components/misc/Details';
import Footer from '@/components/misc/Footer';

import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Properties = () => {
  const [apartments, setApartments] = useState([]);
  const [homes, setHomes] = useState([]);
  const [commercials, setCommercials] = useState([]);
  const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });
  // useEffect for fetching apartments
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

  // useEffect for fetching homes
  useEffect(() => {
    axios
      .get('http://localhost:3001/homes')
      .then((response) => {
        setHomes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching homes:', error);
      });
  }, []);

  const handleSearch = (filteredData) => {
    setApartments(filteredData);
  };

  // useEffect for fetching commercial properties
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
      <Nav />
      <div className="layout h-100">
        <div className="properties mt-4">
          <div className="container text-center pt-5">
            <h1 className="pt-5">Featured Properties</h1>
            <h5 className="fs-3 text-light ">
              <Typewriter
                options={{
                  strings: [' Helping you find your dream home.'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h5>
            <Search apartments={apartments} onSearch={handleSearch} />
            <div className="container">
              <ul className="nav justify-content-center list-unstyled d-flex pt-5">
                <li className="ms-3">
                  <Link className="text-muted" href="/">
                    <FaFacebook className="social-icons m-2" />
                  </Link>
                </li>
                <li className="ms-3">
                  <Link className="text-muted" href="/">
                    <FaInstagram className="social-icons m-2" />
                  </Link>
                </li>
                <li className="ms-3">
                  <Link className="text-muted" href="/">
                    <FaYoutube className="social-icons m-2" />
                  </Link>
                </li>
                <li className="ms-3">
                  <Link className="text-muted" href="/">
                    <FaTiktok className="social-icons m-2" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Featured />
        <div className="container">
          <Tab />
          {/* Apartments Section */}
          <div className="row row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {apartments.slice(0, 4).map((apartment, index) => (
              <div key={apartment.id || `apartment-${index}`} className="">
                <FeaturedApartments apartments={apartment} />
              </div>
            ))}
          </div>

          {/* Homes Section */}
          <div className="text-center mt-2">
            <h2 className="text-center pt-5 display-4">Featured Homes</h2>
          </div>
          <div className="row row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {homes.slice(0, 4).map((home, index) => (
              <div key={home.id || `home-${index}`} className="pt-5 my-5">
                <FeaturedHomes homes={home} />
              </div>
            ))}
          </div>

          {/* Commercial Properties Section */}
          <div className="text-center mt-2">
            <h2 className="text-center pt-5 display-4">
              Commercial Properties
            </h2>
          </div>
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
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Properties;

// Fetch data using getStaticProps
{
  /*
export async function getStaticProps() {
  try {
    // Fetch apartments data
    const apartmentsResponse = await axios.get(
      'http://localhost:3001/apartments'
    );
    const apartmentsData = apartmentsResponse.data;

    // Fetch homes data
    const homesResponse = await axios.get(
      'http://localhost:3001/homes'
    );
    const homesData = homesResponse.data;

    // Fetch commercials data
    const commercialsResponse = await axios.get(
      'http://localhost:3001/commercials'
    );
    const commercialsData = commercialsResponse.data;

    return {
      props: {
        apartments: apartmentsData,
        homes: homesData,
        commercials: commercialsData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        apartments: [],
        homes: [],
        commercials: [],
      },
    };
  }
}
*/
}
