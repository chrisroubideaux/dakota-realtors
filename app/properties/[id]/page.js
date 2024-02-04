{
  /*
'use client';
// property details page
import Nav from '@/components/nav/Nav';
import Navbar from '@/components/properties/Navbar';
import Toolbar from '@/components/properties/Toolbar';
import PropertyDetails from '@/components/properties/PropertyDetails';
import Gallery from '@/components/properties/Gallery';
import Amenities from '@/components/properties/Amenities';
import Agent from '@/components/properties/Agent';
import Bookings from '@/components/properties/tours/Bookings';
import Iconbar from '@/components/properties/Iconbar';
import Footer from '@/components/misc/Footer';
import { FaMapPin } from 'react-icons/fa';

// data
import properties from '@/data/featured/properties';
import agents from '@/data/featured/agents';

// metadata
export default function PropertyInfo({ params }) {
  const property = properties.find((property) => property.id === params.id);
  const agent = agents.find((agent) => agent.id === params.id);

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
              {property.location}
            </h6>
            <Toolbar properties={property} />
            <div className="row">
              <div className="col-md-7">
                <Gallery properties={properties} />
              </div>

              <div className="col-md-5">
                <div className="d-flex justify-content-end">
                  <p className="d-flex justify-content-end fw-normal fs-4 lh-3">
                    {property.description}
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
                  <h3 className="fw-bold">Property Details</h3>
                  <div className="d-flex p-2">
                    <PropertyDetails properties={property} />
                  </div>
                </div>
                <div className="col-md-5">
                  <h3 className="fw-bold text-center">Amenities</h3>
                  <div className="d-flex justify-content-end">
                    <Amenities properties={property} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h2 className=" text-center py-4 fw-bold">Dakota Realtors</h2>
            <div className="row py-4">
              <div className="col-md-6">
                <h4 className="fw-bold d-flex m-2">{property.name}</h4>
                <Agent properties={property} />
                <Iconbar properties={property} />
              </div>

              <div className="col-lg-6">
                <h3 className="text-center fw-bold">Bio</h3>
                <p className="d-flex justify-content-end fw-normal fs-4 lh-3">
                  {property.bio}
                </p>
                <div className="d-flex justify-content-end">
                  <Bookings properties={property} />
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
