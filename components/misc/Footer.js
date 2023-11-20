// footer comonent
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
export default function Footer() {
  return (
    <div>
      <hr className="hr mt-5 " />
      <footer className="container pt-4 py-5">
        <div className="row py-5">
          <div className="col-12 col-md">
            <ul className="list-unstyled list-py-1">
              <li className="my-1">
                <h6 className="link-sm fw-bold">
                  <img
                    className="mb-2"
                    src="https://pngimg.com/uploads/house/house_PNG55.png "
                    alt=""
                    width={30}
                    height={20}
                  />
                  Dakota Reality
                </h6>
              </li>
              <li className="my-1 me-1">
                <a className="link-sm " href="#">
                  <i className="fa-solid fa-location-dot me-1"> </i>
                  1234 Anytown, USA
                </a>
              </li>
              <li className="my-1 mt-2">
                <a className="link-sm" href="">
                  <i className="fa-solid fa-phone me-1"> </i>
                  (xxx) xxx-xxxx
                </a>
              </li>
            </ul>
            <small className="d-block mb-3 text-muted">
              &copy; 2023 Dakota Reality
            </small>
          </div>
          <div className="col-6 col-md">
            <h3 className=" fw-bold">Contact</h3>
            <ul className="list-unstyled fw-semibold m-3">
              <li className="my-2">
                <Link className="nav-links" href="/">
                  Realtors
                </Link>
              </li>
              <li className="my-2">
                <Link className="nav-links" href="/">
                  Tours
                </Link>
              </li>
              <li className="my-2">
                <Link className="nav-links" href="/">
                  Open house
                </Link>
              </li>
              <li className="my-2">
                <Link className="nav-links" href="/Register">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md">
            <h3 className="fw-bold">Media</h3>
            <ul className="list-unstyled m-3">
              <li className="">
                <FaFacebook className="social-icons m-2" />
              </li>
              <li className="">
                <FaInstagram className="social-icons m-2" />
              </li>
              <li className="">
                <FaYoutube className="social-icons m-2" />
              </li>
              <li className="">
                <FaTiktok className="social-icons m-2" />
              </li>
            </ul>
          </div>

          <div className="col-6 col-md">
            <h3 className="fw-bold">About</h3>
            <ul className="list-unstyled fw-semibold m-3">
              <li className="my-2">
                <Link className="nav-links" href="/">
                  Team
                </Link>
              </li>
              <li className="my-2">
                <Link className="nav-links" href="/">
                  Locations
                </Link>
              </li>
              <li className="my-2">
                <Link className="nav-links" href="#">
                  Privacy
                </Link>
              </li>
              <li className="my-2">
                <Link className="nav-links" href="/">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div className="container text-lg-center mx-lg-auto my-3">
            <p className="text-black-50 small text-center">
              Built by: Digi Wraith. &copy; 2023 Digi Wraith.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
