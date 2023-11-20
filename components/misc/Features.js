// features component
import Image from 'next/image';
import Link from 'next/link';
import apartment1 from '@/public/properties/apartment1.jpg';
import home2 from '@/public/properties/home2.jpg';
import building6 from '@/public/commercial/building6.jpg';

import Iconbar from './Iconbar';

const Features = () => {
  return (
    <>
      <div className="pt-4">
        {/* title */}
        <div className="container pt-5 mt-4">
          <h2 className="text-center pt-5 display-4">Featured Properties</h2>
          <Iconbar />
          <p className="fw-normal text-center fs-5 pt-4 mt-2 p-5 m-2">
            See why we were voted the #1 Real Estate Company in the region.
            Check out our wide variety of apartments, from cozy studio
            apartments to spacious 3-bedroom homes with all the amenities. Book
            an appointment today with one of our agents or check our calendar
            for open house events. We look forward to meeting you.
          </p>
        </div>

        <div className="container my-5 pt-4">
          <hr className="hr text-center" />
          <h3 className="d-flex pt-5 my-5">Recently added</h3>
          {/* row */}
          <div className="row g-4">
            <div className="col-md-6">
              <Link
                className="text-decoration-none text-light pe-2"
                href="/apartments/"
              >
                <div className="card overflow-hidden mb-4 h-100">
                  <Image
                    className="image img-fluid h-100 opacity-40"
                    src={apartment1}
                    alt=""
                    width={600}
                    height={1000}
                  />
                  <div className="carousel-caption h-100">
                    <span className="img-gradient-overlay"></span>
                    <div className="card-body content-overlay pb-0">
                      <div className="d-flex">
                        <span className="badge fs-sm me-2">Verified</span>
                        <span className="badge fs-sm">New</span>
                      </div>
                    </div>
                    <div className="card-footer content-overlay border-0">
                      <div className="d-sm-flex justify-content-between align-items-center pt-5 mt-5 mt-sm-5">
                        <div className="text-decoration-none text-light pe-2 mt-5 pt-5">
                          <div className="fs-sm text-uppercase pt-2 mb-1">
                            For Rent
                          </div>
                          <h3 className="h5 text-light mb-1">
                            Luxurious Apartments
                          </h3>
                          <div className="fs-sm">
                            <i className="card-icon fa-solid fa-location-dot me-1"></i>
                            1234 Main St, Anywhere, USA 00011
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6">
              <Link
                className="text-decoration-none text-light pe-2"
                href="/Homes/"
              >
                <div className="card border-0 overflow-hidden mb-4">
                  <Image
                    className="image img-fluid"
                    src={home2}
                    alt=""
                    width={1000}
                    height={500}
                  />
                  <div className="carousel-caption">
                    <span className="img-gradient-overlay"></span>
                    <div className="card-body content-overlay">
                      <div className="d-flex">
                        <span className="badge fs-sm me-2">Verified</span>
                        <span className="badge fs-sm">New</span>
                      </div>
                      <div className=" justify-content-between align-items-center pt-2 mt-2 mt-sm-5">
                        <div className="text-decoration-none text-light">
                          <h6 className="text-decoration fs-sm text-light text-uppercase me-2 ">
                            For Sale
                          </h6>
                          <h3 className="h5 text-light">Modern Homes</h3>
                          <div className="fs-sm opacity-70">
                            <i className="card-icon fa-solid fa-location-dot me-1"></i>
                            5678 Turning St Anywhere, USA 00012
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer content-overlay border-0 pt-5"></div>
                  </div>
                </div>
              </Link>
              <Link
                className="text-decoration-none text-light pe-2"
                href="/Commercial/"
              >
                <div className="card bg-size-cover bg-position-center border-0 overflow-hidden">
                  <Image
                    className="image img-fluid"
                    src={building6}
                    alt=""
                    width={1000}
                    height={250}
                  />
                  <div className="carousel-caption">
                    <span className="img-gradient-overlay"></span>
                    <div className="card-body content-overlay">
                      <div className="d-flex ">
                        <span className="badge fs-sm me-2">Verified</span>
                        <span className="badge fs-sm">New</span>
                      </div>
                      <div className="justify-content-between align-items-center pt-2 mt-2 mt-sm-5">
                        <div className="text-decoration-none text-light pe-2 ">
                          <div className="fs-sm text-uppercase">For Sale</div>
                          <h3 className="h5 text-light">
                            New commercial properties
                          </h3>
                          <div className="fs-sm opacity-70">
                            <i className="card-icon fa-solid fa-location-dot me-1"></i>
                            1106 galaxy way Anywhere, USA 00013
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer content-overlay border-0 pt-5"></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
