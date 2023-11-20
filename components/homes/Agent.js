// agent component
'use client';
import Image from 'next/image';

function Agent({ homes }) {
  return (
    <div className="">
      <Image
        src={homes.photo}
        alt="mls"
        className="imgs img-fluid"
        width={500}
        height={100}
      />
    </div>
  );
}

export default Agent;
