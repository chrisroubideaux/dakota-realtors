// contact page
'use client';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/nav/Nav';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

// metadata

function Contact() {
  return (
    <>
      <Head>
        <title>Dakota Realtors</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      </Head>
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