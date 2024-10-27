'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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

const Properties = () => {
  const [apartments, setApartments] = useState([]);
  const [homes, setHomes] = useState([]);
  const [commercials, setCommercials] = useState([]);

  const fetchData = (endpoint, setState) => {
    axios
      .get(`http://localhost:3001/${endpoint}`)
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching ${endpoint}:`, error);
      });
  };

  useEffect(() => {
    const endpoints = [
      { endpoint: 'apartments', setState: setApartments },
      { endpoint: 'homes', setState: setHomes },
      { endpoint: 'commercials', setState: setCommercials },
    ];

    endpoints.forEach(({ endpoint, setState }) =>
      fetchData(endpoint, setState)
    );
  }, []);

  const handleSearch = (filteredData) => {
    setApartments(filteredData);
  };

  return (
    <>
      <Nav />
      <div className="layout h-100">
        <div className="properties mt-4">
          <div className="containter text-center pt-5">
            <h1 className="pt-5">Featured Properties</h1>
            <p className="fs-3 text-light">Helping you find your dream home.</p>
            <Search apartments={apartments} onSearch={handleSearch} />
            <div className="container">
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
            {apartments.slice(0, 4).map((apartment) => (
              <div key={apartment.id}>
                <FeaturedApartments apartments={apartment} />
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <h2 className="text-center pt-5 display-4">Featured Homes</h2>
          </div>
          <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {homes.slice(0, 4).map((home) => (
              <div key={home.id} className="pt-5 my-5">
                <FeaturedHomes homes={home} />
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <h2 className="text-center pt-5 display-4">
              Commercial Properties
            </h2>
          </div>
          <div className="row row-cols-1 row-cols-1 row-cols-lg-3 row-cols-lg-4 g-4 py-5">
            {commercials.slice(0, 4).map((commercial) => (
              <div key={commercial.id} className="pt-5 my-5">
                <CommercialProperties commercials={commercial} />
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

export default Properties;

// Fetch data using getStaticProps
{
  /*
export async function getStaticProps() {
  try {
    // Fetch apartments data
    const apartmentsResponse = await axios.get(
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/apartments'
    );
    const apartmentsData = apartmentsResponse.data;

    // Fetch homes data
    const homesResponse = await axios.get(
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/homes'
    );
    const homesData = homesResponse.data;

    // Fetch commercials data
    const commercialsResponse = await axios.get(
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/commercials'
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
