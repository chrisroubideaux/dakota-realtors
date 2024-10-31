// contact page
'use client';
import Link from 'next/link';
import Nav from '@/components/nav/Nav';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import dynamic from 'next/dynamic';
function Contact() {
  const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });
  return (
    <>
      <div>
        <div className="layout h-100">
          <div className="page-header min-vh-100">
            <div
              className="position-absolute fixed-top ms-auto w-50 h-100 z-index-0 d-none d-sm-none d-md-block"
              style={{
                backgroundImage: 'url(../sliders/image5.jpg)',
                backgroundSize: 'cover',
                borderRadius: '10px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 20px 0 rgb(0 0 0 / 30%)',
              }}
            ></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-7 d-flex justify-content-center flex-column">
                  <div className="card card-body blur d-flex justify-content-center shadow-lg p-5 mt-5">
                    <h1 className="text-gradient">Contact Us</h1>
                    <div className="lead pe-5 me-5 fw-normal">
                      <Typewriter
                        options={{
                          strings: ['We would love to meet you!'],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </div>
                    <hr />
                    <div className=" mx-3 ">
                      <h5 className=" fs-5">Mon-Thurs: 8am-5pm</h5>
                      <h5 className=" fs-5">Friday: 8am-3pm</h5>
                      <h5 className=" fs-5">Phone 000-000-0000</h5>
                      <h5 className=" fs-5">Email: dakotarealty@gmail.com</h5>
                    </div>

                    <div className="buttons pt-3 ">
                      <Link className=" nav-link mt-1" href="/properties/">
                        Back Home
                      </Link>
                      <div className="container pt-2 ">
                        <ul className="nav justify-content-center list-unstyled d-flex pt-2 ">
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
                        <p className="text-center pt-2">
                          © Copyright 2024 Dakota Realtors
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
{
  /*
'use client';
import Link from 'next/link';
import Nav from '@/components/nav/Nav';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

// metadata

function Contact() {
  return (
    <>
      <div className="layout">
        <Nav />
        <div className="contact">
          <div className="text-center py-4">
            <h3 className="display-3 py-5">Business Hours</h3>
            <div
              className="cards bg-transparent m-auto "
              style={{ maxWidth: '306px' }}
            >
              <div className="card-body mx-3 mt-5 pt-4">
                <p className=" fs-5">monday-thurs: 8am-5pm</p>
                <p className=" fs-5">friday: 8am-3pm</p>
                <p className=" fs-5">phone# 000-000-0000</p>
                <p className=" fs-6">email: dakotarealty@gmail.com</p>
              </div>
            </div>
            <div className="container mt-5 ">
              <ul className="nav justify-content-center list-unstyled d-flex ">
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
            <p className="pt-3">© Copyright 2023 Dakota Realtors</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
*/
}
