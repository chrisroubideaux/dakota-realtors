// Hero component for the apartments page
import Link from 'next/link';
import Search from '../nav/Search';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
export default function Hero() {
  return (
    <>
      <div className="apartments mt-4">
        <div className="containter text-center pt-5">
          <h1 className="pt-5">Apartments</h1>
          <p className="fs-3 text-light ">
            Helping you find your dream apartment.
          </p>
          <Search />
          <div className="container ">
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
          </div>
        </div>
      </div>
    </>
  );
}
