// Hero component
import Link from 'next/link';
import Search from '../nav/Search';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import dynamic from 'next/dynamic';

export default function Heros() {
  const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });
  return (
    <>
      <div className="homes mt-4">
        <div className="containter text-center pt-5">
          <h1 className="pt-5">Luxury Homes</h1>
          <h6 className="fs-3 text-light ">
            <Typewriter
              options={{
                strings: ['Your dream home awaits.'],
                autoStart: true,
                loop: true,
              }}
            />
          </h6>
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
