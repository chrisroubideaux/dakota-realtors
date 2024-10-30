// bedroom component
'use client';
import Image from 'next/image';
export default function Bed({ apartments }) {
  return (
    <div className="">
      <Image
        src={apartments.image2 || '/fallback-image.jpg'}
        className="image img-fluid"
        // alt={`${apartments.name} Bedroom`}
        alt="bedroom"
        width={400}
        height={200}
      />
    </div>
  );
}
