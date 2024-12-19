// cover page //

'use client';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="">
        <header>
          <div className="page-header min-vh-100">
            <div
              className="position-absolute fixed-top ms-auto w-50 h-100 z-index-0 d-none d-sm-none d-md-block"
              style={{
                backgroundImage: 'url(../sliders/image1.jpg)',
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
                    <h1 className="text-gradient">Dakota Realtors</h1>
                    <div className="lead pe-5 me-5 fw-normal">
                      <Typewriter
                        options={{
                          strings: ['Your dream home is a few clicks away'],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </div>
                    <hr />
                    <p className=" pe-5 me-5 ">
                      Dakota Realtors is a powerful app built with Next.js,
                      Redux, Express, MongoDB, and Python. Leveraging the power
                      of AI, deep learning, and machine learning, Dakota
                      Realtors tracks and analyzes national housing trends,
                      streamlining the property search and connecting agents
                      with sellers and buyers. The app allows users to create
                      accounts, set appointments for viewing properties, and
                      even list properties for sale.
                    </p>

                    <div className="buttons">
                      <Link className="btn btn-sm mt-1" href="/properties/">
                        View Properties
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
        </header>
      </div>
    </>
  );
}
