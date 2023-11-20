// office component
'use client';
import Image from 'next/image';

export default function Bed({ commercials }) {
  return (
    <div>
      <div className="">
        <Image
          src={commercials.image2}
          alt="mls"
          width={400}
          height={200}
          className="image img-fluid"
        />
      </div>
    </div>
  );
}
