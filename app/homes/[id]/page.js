// homes details page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
// component imports
import Nav from '@/components/nav/Nav';
import Navbar from '@/components/homes/Navbar';
import Toolbar from '@/components/homes/Toolbar';
import Cover from '@/components/homes/Cover';
import Bed from '@/components/homes/Bed';
import Room from '@/components/homes/Room';
import HomeDetails from '@/components/homes/HomeDetails';
import Floor from '@/components/homes/Floor';
import Realtors from '@/components/homes/Realtors';
import Maps from '@/components/misc/Maps';
import Amenities from '@/components/homes/Amenities';
import Bookings from '@/components/homes/tours/Bookings';
import Layout from '@/components/homes/calculator/Layout';
import Footer from '@/components/misc/Footer';

//import Chart from '@/components/homes/calculator/Chart';
//import Calculator from '@/components/homes/calculator/Calculator';

// metadata

export default function HomeInfo({ params }) {
  //  const [homeValue, setHomeValue] = useState(0);
  //  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);
  //  const [interestRate, setInterestRate] = useState(4.5);
  //  const [loanAmount, setLoanAmount] = useState(20);
  //  const [loanTerm, setLoanTerm] = useState(30);
  //  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [home, setHome] = useState([]);
  // const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://midwest-realtors-95d2cdb37007.herokuapp.com/homes/${params.id}`
      )
      .then((response) => {
        setHome(response.data);
      })
      .catch((error) => {
        console.error('Error fetching homes:', error);
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
            <Toolbar homes={home} />
            <div className="row gx-2">
              <div className="col-md-8">
                <Cover homes={home} />
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-end">
                  <Bed homes={home} />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Room homes={home} />
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
                    <HomeDetails homes={home} />
                  </div>
                </div>
                <div className="col-md-6">
                  <h3 className="fw-bold text-center">Description</h3>
                  <div className="container d-flex justify-content-end fs-6 m-4">
                    {home.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-5 pt-5">
            <div className="row py-4">
              <div className="col-md-6">
                <h2 className=" text-center fw-bold">Amenities</h2>
                <Amenities homes={home} />
              </div>
              <div className="col-md-6">
                <h3 className="text-center fw-bold mt-3">Floor Plan</h3>
                <div className="">
                  <Floor homes={home} />
                </div>
                <div className="d-flex justify-content-end"></div>
              </div>
            </div>
          </div>
          <div className="container mt-5 pt-5">
            <div className="row py-4">
              <div className="col-md-6">
                <h2 className=" text-center fw-bold">{home.title}</h2>
                <div className="mt-4">
                  <Realtors homes={home} />
                </div>
                <Bookings homes={home} />
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
          <Layout />
        </div>
      </div>
      <Footer />
    </>
  );
}

// Function for fetching data on the server side using getServerSideProps
{
  /*
export async function getServerSideProps({ params }) {
  try {
    // Make a GET request to fetch the home by id from your server
    const response = await axios.get(
      `https://midwest-realtors-95d2cdb37007.herokuapp.com/homes/${params.id}`
    );
    const home = response.data;

    // Return the 'home' data as props
    return {
      props: {
        home,
      },
    };
  } catch (error) {
    console.error('Error fetching home:', error);

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
