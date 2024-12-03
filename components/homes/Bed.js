// Bedroom component
'use client';
import Image from 'next/image';

export default function Bed({ homes }) {
  return (
    <div className="">
      <Image
        src={homes.image1 || '/fallback-image.jpg'}
        className="image img-fluid"
        alt="mls"
        width={400}
        height={200}
      />
    </div>
  );
}
