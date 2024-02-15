// apartment details page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// component imports
import Nav from '@/components/nav/Nav';
import Toolbar from '@/components/apartments/Toolbar';
import ApartmentDetails from '@/components/apartments/ApartmentDetails';
//import Gallery from '@/components/apartments/Gallery';
import Navbar from '@/components/apartments/Navbar';
import Amenities from '@/components/apartments/Amenities';
import Bed from '@/components/apartments/Bed';
import Cover from '@/components/apartments/Cover';
import Maps from '@/components/misc/Maps';
import Realtors from '@/components/apartments/Realtors';
import Bookings from '@/components/apartments/tours/Bookings';
import Room from '@/components/apartments/Room';
import Floor from '@/components/apartments/Floor';
import Footer from '@/components/misc/Footer';

// metadata
{
  /*
export const metadata = {
  title: 'dakota realtors | apartment details page',
  description: 'real estate app',
};
*/
}
export default function Page({ params }) {
  const [apartment, setApartment] = useState([]);
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://midwest-realtors-95d2cdb37007.herokuapp.com/apartments/${params.id}`
      )
      .then((response) => {
        setApartment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apartments:', error);
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
                  <div className="container d-flex justify-content-end fs-6 m-4">
                    {apartment.description}
                  </div>
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
                <h2 className="text-center fw-bold">{apartment.title}</h2>
                <div className="mt-4">
                  <Realtors apartments={apartment} />
                </div>

                <Bookings apartments={apartment} />
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

// Fetch data server side using getServerSideProps
{
  /*
export async function getServerSideProps({ params }) {
  try {
    // GET request to fetch apartment data from server based on the ID in the URL
    const response = await axios.get(
      `https://midwest-realtors-95d2cdb37007.herokuapp.com/apartments/${params.id}`
    );
    const apartmentData = response.data;

    // Return data as props to the component
    return {
      props: {
        apartment: apartmentData,
      },
    };
  } catch (error) {
    console.error('Error fetching apartment details:', error);
    return {
      props: {
        apartment: {},
      },
    };
  }
}
*/
}
