// cover component
'use client';
import Image from 'next/image';

export default function Cover({ homes }) {
  return (
    <div>
      <div className="container-fluid">
        <Image
          src={homes.image}
          alt="mls"
          width={700}
          height={400}
          className="image"
        />
      </div>
    </div>
  );
}
