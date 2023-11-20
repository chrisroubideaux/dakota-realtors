// agent component //
'use client';
import Image from 'next/image';
//import { FaBriefcase, FaEnvelope, FaMobile } from 'react-icons/fa';

function Agent({ properties }) {
  return (
    <div className="">
      <Image
        src={properties.photo}
        alt="mls"
        className="imgs img-fluid"
        width={500}
        height={100}
      />
    </div>
  );
}

export default Agent;
