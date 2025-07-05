// contact page
'use client';
import Link from 'next/link';

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaChevronUp,
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

function Contact() {
  const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });
  return (
    <>
      <div className="container-fluid">
        <div className="container d-flex flex-wrap justify-content-center justify-content-lg-start">
          <div className="pt-1 pt-md-4 pb-4 text-center">
            <h6 className="text-center fs-3">Contact Us</h6>
            <div className="">
              {/* */}
              <div className="card card-body blur d-flex justify-content-center shadow-lg p-5 mt-5">
                <div className="lead pe-5 me-5 fw-normal">
                  <h6 className="text-center fw-bold">
                    <Typewriter
                      options={{
                        strings: [' We would love to meet you!'],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </h6>
                </div>
                <hr />
                <div className=" mx-3 ">
                  <h5 className=" fs-5">Mon-Thurs: 8am-5pm</h5>
                  <h5 className=" fs-5">Friday: 8am-3pm</h5>
                  <h5 className=" fs-5">Phone 000-000-0000</h5>
                  <h5 className=" fs-5">Email: realtydakota@gmail.com</h5>
                </div>
                <Link className="nav-link text-underlined" href="/">
                  back to menu
                </Link>
              </div>

              {/* */}
              <hr className="my-4" />
              <ul className="nav justify-content-center list-unstyled d-flex pt-1 ">
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
          <div className="w-100 align-self-end">
            <p className="nav d-block fs-xs text-center text-xl-start pb-2 mb-0">
              &copy;2025, All rights reserved.
              <a
                className="nav-link d-inline-block p-0"
                href="https://createx.studio/"
                target="_blank"
                rel="noopener"
              >
                <span className="text-nowrap text-decoration-none">
                  Realty Dakota
                </span>
              </a>
            </p>
          </div>
        </div>
        <div
          className=" mt-3 position-absolute top-0 end-0 w-50 
        d-none d-xl-block"
          style={{
            backgroundImage: 'url(../sliders/image5.jpg)',
            height: '90vh',
            backgroundSize: 'cover',
            borderRadius: '10px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%) ',
          }}
        ></div>

        <a href="#top" className="btn-scroll-top btn-sm" data-scroll>
          <span className="btn-scroll-top-tooltip text-muted fs-sm me-2">
            Top
          </span>
          <FaChevronUp className="btn-scroll-top-icon bx bx-chevron-up" />
        </a>
      </div>
    </>
  );
}

export default Contact;
