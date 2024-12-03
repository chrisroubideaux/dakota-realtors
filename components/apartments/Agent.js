// Agent component //
'use client';
import Image from 'next/image';
import { FaBriefcase, FaEnvelope, FaMobile } from 'react-icons/fa';
function Agent({ apartments }) {
  return (
    <div className="">
      <Image
        //   src={apartments.photo}
        src={apartments.photo || '/fallback-image.jpg'}
        alt="mls"
        className="imgs img-fluid"
        width={500}
        height={100}
      />
    </div>
  );
}

export default Agent;
