// bedroom component
'use client';
import Image from 'next/image';

export default function Bed({ homes }) {
  return (
    <div>
      <div className="">
        <Image
          src={homes.image1}
          alt="mls"
          width={400}
          height={200}
          className="image img-fluid"
        />
      </div>
    </div>
  );
}
