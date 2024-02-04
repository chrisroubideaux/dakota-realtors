// commercial details page
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
// components
import Nav from '@/components/nav/Nav';
import Navbar from '@/components/commercials/Navbar';
import Toolbar from '@/components/commercials/Toolbar';
import Office from '@/components/commercials/Office';
import Cover from '@/components/commercials/Cover';
import Floor from '@/components/commercials/Floor';
import Room from '@/components/commercials/Room';
import Maps from '@/components/misc/Maps';
import Layout from '@/components/commercials/calculator/Layout';
import Details from '@/components/commercials/Details';
import Gallery from '@/components/commercials/Gallery';
import Realtors from '@/components/commercials/Realtors';
import Bookings from '@/components/commercials/tours/Bookings';
import Amenities from '@/components/commercials/Amenties';
import Footer from '@/components/misc/Footer';

// data
//import commercials from '@/data/featured/commercial';
import Iconbar from '@/components/commercials/Iconbar';

// metadata
export const metadata = {
  title: 'dakota realtors | commercial details page',
  description: 'next js real estate app',
};
export default function CommercialInfo({ params }) {
  //const commercial = commercials.find((commercial) => commercial.id === +params.id );

  const [commercial, setCommercial] = useState([]);
  // const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    // Makes a GET request to fetch commercial property by id
    axios
      .get(`http://localhost:3001/commercials/${params.id}`)
      .then((response) => {
        // Update the state with the fetched commercial property
        setCommercial(response.data);
      })
      .catch((error) => {
        console.error('Error fetching commercials:', error);
      });
  }, [params.id]);

  return (
    <>
      {/* page layout */}
      <div className="layout h-100">
        <Nav />
        <div className="container my-5">
          <div className="container-fluid">
            <Navbar />
          </div>
          <div className="mt-3">
            <Toolbar commercials={commercial} />
            <div className="row gx-2">
              <div className="col-md-8">
                <Cover commercials={commercial} />
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-end">
                  <Office commercials={commercial} />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Room commercials={commercial} />
                </div>
              </div>
            </div>
            <div className="container mt-5 py-4 my-4">
              <hr className="hr w-25 mx-auto pt-5" />

              <div className="row">
                <div className="col-md-6">
                  <div className="container">
                    <h3 className="fw-bold me-5 text-center">
                      Property Details
                    </h3>
                  </div>
                  <div className=" ">
                    <Details commercials={commercial} />
                  </div>
                </div>
                <div className="col-md-6">
                  <h3 className="fw-bold text-center">Description</h3>
                  <div className="container d-flex justify-content-end fs-6 m-4">
                    {commercial.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row py-4">
              <div className="col-md-6">
                <h2 className=" text-center fw-bold">Amenities</h2>
                <Amenities commercials={commercial} />
              </div>
              <div className="col-md-6">
                <h3 className="text-center fw-bold mt-3">Floor Plan</h3>
                <div className="">
                  <Floor commercials={commercial} />
                </div>
                <div className="d-flex justify-content-end"></div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row py-4">
              <div className="col-md-6">
                <h2 className=" text-center fw-bold">{commercial.title}</h2>
                <div className="mt-4">
                  <Realtors commercials={commercial} />
                </div>
                <Bookings commercials={commercial} />
              </div>
              <div className="col-md-6">
                <h3 className="text-center fw-bold mt-2">Map</h3>
                <div className="mt-3">
                  <Maps />
                </div>
                <div className="d-flex justify-content-end"></div>
              </div>
              <Layout />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
// Fetch data on the server side using getServerSideProps
{
  /*
export async function getServerSideProps({ params }) {
  const { id } = params;

  // Fetch the commercial data based on the 'id' parameter
  try {
    const response = await axios.get(`http://localhost:3001/commercials/${id}`);
    const commercial = response.data;

    // Return the 'commercial' data as props
    return {
      props: {
        commercial,
      },
    };
  } catch (error) {
    console.error('Error fetching commercial data:', error);

    // You can handle errors here, e.g., redirect to an error page
    return {
      redirect: {
        destination: '/error', // Replace with your error page URL
        permanent: false,
      },
    };
  }
}
*/
}
