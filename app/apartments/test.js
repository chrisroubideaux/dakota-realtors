// apartment details page
'use client';
// apartment details page
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Nav from '@/components/nav/Nav';
import Toolbar from '@/components/apartments/Toolbar';
import ApartmentDetails from '@/components/apartments/ApartmentDetails';
//import Gallery from '@/components/apartments/Gallery';
import Navbar from '@/components/apartments/Navbar';
import Amenities from '@/components/apartments/Amenities';
import Bed from '@/components/apartments/Bed';
import Cover from '@/components/apartments/Cover';
import Maps from '@/components/apartments/Maps';
//import Agent from '@/components/apartments/Agent';
import Realtors from '@/components/apartments/Realtors';
import Bookings from '@/components/apartments/tours/Bookings';
import Room from '@/components/apartments/Room';
import Floor from '@/components/apartments/Floor';
//import Iconbar from '@/components/apartments/Iconbar';
import Footer from '@/components/misc/Footer';

// data
import apartments from '@/data/featured/apartments';

//import agents from '@/data/featured/agents';

// metadata
export const metadata = {
  title: 'dakota realtors | apartment details page',
  description: 'real estate app',
};

export default function ApartmentInfo({ params }) {
  // const apartment = apartments.find((apartment) => apartment.id === +params.id);

  // single apartment by ID
  const [apartment, setApartment] = useState(null);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/apartments/${params.id}`)
      .then((response) => {
        console.log('Apartment Response:', response.data);
        setApartment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartment details:', error);
        // Log the detailed error response if available
        if (error.response) {
          console.error('Detailed Error Response:', error.response.data);
        }
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
            <Toolbar apartments={apartment} />
            <div className="row gx-2">
              <div className="col-md-8">
                <Cover apartments={apartment} />
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-end">
                  <Bed apartments={apartment} />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Room apartments={apartment} />
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
                    <ApartmentDetails apartments={apartment} />
                  </div>
                </div>
                <div className="col-md-6">
                  <h3 className="fw-bold text-center">Description</h3>
                  {apartment ? (
                    <div className="container d-flex justify-content-end fs-6 m-4">
                      {apartment.description}
                    </div>
                  ) : (
                    <p>Loading apartment details...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row py-4">
              <div className="col-md-6">
                <h2 className=" text-center fw-bold">Amenities</h2>
                <Amenities apartments={apartment} />
              </div>
              <div className="col-md-6">
                <h3 className="text-center fw-bold mt-3">Floor Plan</h3>
                <div className="">
                  <Floor apartments={apartment} />
                </div>
                <div className="d-flex justify-content-end"></div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row py-4">
              <div className="col-md-6">
                <h2 className=" text-center fw-bold">{apartment.title}</h2>
                <div className="mt-4">
                  <Realtors apartments={apartment} />
                </div>
                {/*      <Bookings appoinments={appointment} /> */}
              </div>
              <div className="col-md-6">
                <h3 className="text-center fw-bold mt-2">Map</h3>
                <div className="mt-3">
                  <Maps />
                </div>
                <div className="d-flex justify-content-end"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
{
  /*
import Nav from '@/components/nav/Nav';
import Toolbar from '@/components/apartments/Toolbar';
import ApartmentDetails from '@/components/apartments/ApartmentDetails';
import Gallery from '@/components/apartments/Gallery';
import Navbar from '@/components/apartments/Navbar';
import Amenities from '@/components/apartments/Amenities';
import Agent from '@/components/apartments/Agent';
import Bookings from '@/components/apartments/tours/Bookings';
import Iconbar from '@/components/apartments/Iconbar';
import Footer from '@/components/misc/Footer';
import { FaMapPin } from 'react-icons/fa';
// data
import apartments from '@/data/featured/apartments';

// metadata
export const metadata = {
  title: 'dakota realtors | apartment details page',
  description: 'real estate app',
};

export default function apartmentInfo({ params }) {
  const apartment = apartments.find((apartment) => apartment.id === +params.id);

  return (
    <>
      
      <div className="layout h-100">
        <Nav />
        <div className="container-fluid my-5">
          <div className="container-fluid">
            <Navbar />
          </div>

          <div className=" mt-5">
            <h6 className="mb-2 fs-sm fw-bold">
              <FaMapPin className="card-icon mt-n1 me-2" />
              {apartment.location}
            </h6>
            <Toolbar apartments={apartment} />
            <div className="row">
              <div className="col-md-7">
                <Gallery apartments={apartment} />
              </div>

              <div className="col-md-5">
                <div className="d-flex justify-content-end">
                  <p className="d-flex justify-content-end fw-normal fs-4 lh-3">
                    {apartment.description}
                  </p>
                </div>
                <button className="btn btn-md btn-accent d-block w-75 m-auto mt-3">
                  Book a tour
                </button>
              </div>
            </div>

            <div className="container-fluid mt-5 py-4 my-4">
              <h3 className="pt-5 mt-5 my-3 text-center display-4">
                Apartment Info
              </h3>
              <hr className="hr w-25 mx-auto pt-5" />
              <div className="row">
                <div className="col-md-7">
                  <div className="container">
                    <h3 className="fw-bold me-5">Property Details</h3>
                  </div>
                  <div className="d-flex p-2">
                    <ApartmentDetails apartments={apartment} />
                  </div>
                </div>
                <div className="col-md-5">
                  <h3 className="fw-bold text-center">Amenities</h3>
                  <div className="d-flex justify-content-end">
                    <Amenities apartments={apartment} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h2 className=" text-center py-4 fw-bold">Dakota Realtors</h2>
            <div className="row py-4">
              <div className="col-md-6">
                <h4 className="fw-bold d-flex m-2">{apartment.name}</h4>
                <Agent apartments={apartment} />
                <Iconbar apartments={apartment} />
              </div>

              <div className="col-lg-6">
                <h3 className="text-center fw-bold">Bio</h3>
                <p className="d-flex justify-content-end fw-normal fs-4 lh-3">
                  {apartment.bio}
                </p>
                <div className="d-flex justify-content-end">
                  <Bookings apartments={apartment} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

*/
}
