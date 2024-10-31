// Hero component for the agent page
import Link from 'next/link';

import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import dynamic from 'next/dynamic';

export default function Hero() {
  const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });
  return (
    <>
      <div className="agents mt-2">
        <div className="containter text-center py-5">
          <h1 className="pt-5 display-4 mt-5">Agents</h1>
          <h5 className="fs-3 text-light   ">
            <Typewriter
              options={{
                strings: ['  Meet the best realtor group in the area.'],
                autoStart: true,
                loop: true,
              }}
            />
          </h5>
          <div className="container ">
            <ul className="nav justify-content-center list-unstyled d-flex  ">
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
