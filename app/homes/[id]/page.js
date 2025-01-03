// homes details page
'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function HomeInfo({}) {
  const { id } = useParams();
  const [home, setHome] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Fetch home details by id
    axios
      .get(`https://dakota-realtors.onrender.com/homes/${id}`)
      .then((response) => {
        setHome(response.data);
      })
      .catch((error) => {
        console.error('Error fetching home:', error);
      });

    // Fetch appointment by id
    axios
      .get(`https://dakota-realtors.onrender.com/appointments/${id}`)
      .then((response) => {
        setAppointment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, [id]);

  return (
    <>
      <div className="layout h-100">
        <div className="container-fluid">
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
                  {isLoggedIn ? (
                    <Bookings appointments={appointment} homes={home} />
                  ) : (
                    <div className="alert alert-warning">
                      You must be logged in to book an appointment.
                    </div>
                  )}
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
      </div>
    </>
  );
}
