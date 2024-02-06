// cover page //

import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

// metadata
export const metadata = {
  title: 'dakota realtors',
  description: 'nextjs real estate app',
};
export default function Home() {
  return (
    <>
      <div className="cover">
        <div className="containter text-center py-5">
          <h1 className="display-3 py-4 mr-3">Dakota Realtors</h1>
          <p className="display-6 fs-3 text-light fw-semi-bold">
            Your Dream Home is just a few clicks away.
          </p>
          {/* <Search /> */}
          <Link className="btn btn-md mt-5" href="/properties/">
            View Properties
          </Link>
          <div className="container pt-5 ">
            <ul className="nav justify-content-center list-unstyled d-flex pt-5 ">
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
            <p className="text-light pt-1">© Copyright 2024 Dakota Realtors</p>
          </div>
        </div>
      </div>
    </>
  );
}
