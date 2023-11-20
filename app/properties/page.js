'use client';
// properties page
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
// components
import Nav from '@/components/nav/Nav';
import Search from '@/components/nav/Search';
import Featured from '@/components/misc/Features';
import Tab from '@/components/nav/Tab';
import FeaturedApartments from '@/components/apartments/FeaturedApartments';
import FeaturedHomes from '@/components/homes/FeaturedHomes';
import CommercialProperties from '@/components/commercials/CommercialProperties';
import Reviews from '@/components/properties/Reviews';
import Details from '@/components/misc/Details';
import Footer from '@/components/misc/Footer';

import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

// data
//import apartments from '@/data/featured/apartments';
//import homes from '@/data/featured/homes';
import reviews from '@/data/slider/reviews';
//import commercials from '@/data/featured/commercial';

// metadata
export const metadata = {
  title: 'dakota realtors | properties page',
  description: 'nextjs real estate app',
};

const Properties = () => {
  //
  const [apartments, setApartments] = useState([]);
  const [homes, setHomes] = useState([]);
  const [commercials, setCommercials] = useState([]);

  // useEffect for fetching apartments

  useEffect(() => {
    // Make a GET request to fetch apartments from your server
    axios
      .get('http://localhost:3001/apartments')
      .then((response) => {
        // Update the state with the fetched apartments
        setApartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
      });
  }, []);

  // useEffect for fetching homes
  useEffect(() => {
    // Make a GET request to fetch homes from your server
    axios
      .get('http://localhost:3001/homes')
      .then((response) => {
        // Update the state with the fetched apartments
        setHomes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching homes:', error);
      });
  }, []);

  const handleSearch = (filteredData) => {
    setFilteredApartments(filteredData);
  };

  // useEffect for fetching commercial properties
  useEffect(() => {
    // Make a GET request to fetch apartments from your server
    axios
      .get('http://localhost:3001/commercials')
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

      <Nav />
      <div className="layout h-100">
        {/* hero content */}

        <div className="properties mt-4">
          <div className="containter text-center pt-5">
            <h1 className="pt-5">Featured Properties</h1>
            <p className="fs-3 text-light ">
              Helping you find your dream home.
            </p>
            <Search apartments={apartments} onSearch={handleSearch} />
            <div className="container ">
              <ul className="nav justify-content-center list-unstyled d-flex pt-5 ">
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
          <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {apartments.slice(0, 4).map((apartments) => (
              <div key={apartments.id} className="">
                <FeaturedApartments apartments={apartments} />
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <h2 className="text-center pt-5 display-4">Featured Homes</h2>
          </div>
          <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {homes.slice(0, 4).map((homes) => (
              <div key={homes.id} className="pt-5 my-5">
                <FeaturedHomes homes={homes} />
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <h2 className="text-center pt-5 display-4">
              Commercial Properties
            </h2>
          </div>
          <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {commercials.slice(0, 4).map((commercials) => (
              <div key={commercials.id} className="pt-5 my-5">
                <CommercialProperties commercials={commercials} />
              </div>
            ))}
          </div>
        </div>

        <Details />
        {reviews.map((reviews) => (
          <Reviews key={reviews.id} reviews={reviews} />
        ))}
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Properties;
// Fetch data using getStaticProps
export async function getStaticProps() {
  try {
    // Fetch apartments data
    const apartmentsResponse = await axios.get(
      'http://localhost:3001/apartments'
    );
    const apartmentsData = apartmentsResponse.data;

    // Fetch homes data
    const homesResponse = await axios.get('http://localhost:3001/homes');
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
