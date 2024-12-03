// Footer comonent
//import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTiktok, FaAngleDown } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="container pt-4 py-5">
      <div className="container pt-5 mt-5">
        <div className="row">
          <div className="col-xxl-5 col-lg-5 col-md-7">
            <div className="mb-7 mb-xl-0">
              <div className="mb-4">
                <a href="#">
                  <img
                    src="https://pngimg.com/uploads/house/house_PNG55.png "
                    alt="logo"
                    className="text-inverse"
                    width="80"
                    height="100"
                  />
                </a>
              </div>
              <p className="mb-5">
                Dakota Realtors tracks and analyzes national housing trends,
                streamlining the property search and connecting agents with
                sellers and buyers.
              </p>

              <form className="needs-validation" noValidate>
                <h5 className="mb-3">Subscribe to our newsletter</h5>
                <div className="row g-2">
                  <div className="col-lg-9 col-8">
                    <label htmlFor="subscribeEmail" className="visually-hidden">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="subscribeEmail"
                      placeholder="Email address"
                      required
                    />
                    <div className="invalid-feedback">Please enter email.</div>
                  </div>
                  <div className="col-lg-3 col-4">
                    <div>
                      <button type="submit" className="btn btn-md">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="offset-xxl-1 col-xxl-6 col-lg-6 offset-md-1 col-md-4">
            <div className="row" id="ft-links">
              <div className="col-lg-4 col-12">
                <div className="position-relative">
                  <div className="mb-3 pb-2 d-flex justify-content-between border-bottom border-bottom-lg-0">
                    <h5>Landings</h5>
                    <a
                      className="d-block d-lg-none stretched-link text-inherit"
                      data-bs-toggle="collapse"
                      href="#collapseLanding"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseLanding"
                    >
                      <FaAngleDown />
                    </a>
                  </div>
                  <div
                    className="collapse d-lg-block"
                    id="collapseLanding"
                    data-bs-parent="#ft-links"
                  >
                    <ul className="list-unstyled mb-0 py-3 py-lg-0">
                      <li className="mb-2">
                        <a
                          href="../index.html"
                          className="text-decoration-none text-reset"
                        >
                          Realtors
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#!"
                          className="text-decoration-none text-reset"
                        >
                          Tours
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="../landing-finance.html"
                          className="text-decoration-none text-reset"
                        >
                          Open House
                        </a>
                      </li>

                      <li className="mb-2">
                        <a
                          href="../landing-conference.html"
                          className="text-decoration-none text-reset"
                        >
                          Meetings
                        </a>
                      </li>
                      <li className="mb-2">
                        <a
                          href="#!"
                          className="text-decoration-none text-reset"
                        >
                          Team
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="mb-3 pb-2 d-flex justify-content-between border-bottom border-bottom-lg-0 position-relative">
                  <h5>Accounts</h5>
                  <a
                    className="d-block d-lg-none stretched-link text-inherit"
                    data-bs-toggle="collapse"
                    href="#collapseAccounts"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseAccounts"
                  >
                    <i className="bi bi-chevron-down"></i>
                  </a>
                </div>
                <div
                  className="collapse d-lg-block"
                  id="collapseAccounts"
                  data-bs-parent="#ft-links"
                >
                  <ul className="list-unstyled mb-0 py-3 py-lg-0">
                    <li className="mb-2">
                      <a
                        href="../signup.html"
                        className="text-decoration-none text-reset"
                      >
                        Register
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="../signin.html"
                        className="text-decoration-none text-reset"
                      >
                        Login
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="../forget-password.html"
                        className="text-decoration-none text-reset"
                      >
                        Forgot Password
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="../reset-password.html"
                        className="text-decoration-none text-reset"
                      >
                        Reset Password
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#!" className="text-decoration-none text-reset">
                        Profile
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="mb-3 pb-2 d-flex justify-content-between border-bottom border-bottom-lg-0 position-relative">
                  <h5>Resources</h5>
                  <a
                    className="d-block d-lg-none stretched-link text-inherit"
                    data-bs-toggle="collapse"
                    href="#collapseResources"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseResources"
                  >
                    <i className="bi bi-chevron-down"></i>
                  </a>
                </div>
                <div
                  className="collapse d-lg-block"
                  id="collapseResources"
                  data-bs-parent="#ft-links"
                >
                  <ul className="list-unstyled mb-0 py-3 py-lg-0">
                    <li className="mb-2">
                      <a
                        href="../docs/index.html"
                        className="text-decoration-none text-reset"
                      >
                        Docs
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#!" className="text-decoration-none text-reset">
                        Support
                      </a>
                    </li>
                    <li className="mb-2">
                      <a
                        href="../changelog.html"
                        className="text-decoration-none text-reset"
                      >
                        Join the team
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#!" className="text-decoration-none text-reset">
                        Help Center
                      </a>
                    </li>
                    <li className="mb-2">
                      <a href="#!" className="text-decoration-none text-reset">
                        Community
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-7 mb-3">
        <div className="row align-items-center">
          <div className="col-md-9">
            <div className="small mb-3 mb-md-0">
              Copyright © 2024
              <span className="me-1">
                <a href="#" className="text-decoration-none">
                  Dakota Realtors
                </a>
              </span>
              | Built by
              <span className="">
                <a href="#" className="me-2">
                  Digi Wraith
                </a>
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-md-end d-flex align-items-center justify-content-md-end">
              {/* dropdown */}
              <div className="ms-3 d-flex gap-2">
                <a href="#!" className="">
                  <FaFacebook className="social-icons m-2" />
                </a>
                <a href="#!" className="">
                  <FaInstagram className="social-icons m-2" />
                </a>
                <a href="#!" className="">
                  <FaTiktok className="social-icons m-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
