// Agent component
'use client';
import Image from 'next/image';

function Agent({ homes }) {
  return (
    <div className="">
      <Image
        src={homes.photo || '/fallback-image.jpg'}
        className="imgs img-fluid"
        alt="mls"
        width={500}
        height={100}
        layout="responsive"
      />
    </div>
  );
}

export default Agent;
