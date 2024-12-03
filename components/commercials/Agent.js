// Agent component
'use client';
import Image from 'next/image';

function Agent({ commercials }) {
  return (
    <div className="">
      <Image
        src={commercials.photo || '/fallback-image.jpg'}
        alt="mls"
        className="imgs img-fluid"
        width={500}
        height={100}
      />
    </div>
  );
}

export default Agent;
