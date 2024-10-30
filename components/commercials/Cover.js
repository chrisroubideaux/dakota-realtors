// cover component
'use client';
import Image from 'next/image';

export default function Cover({ commercials }) {
  return (
    <div>
      <div className="container-fluid">
        <Image
          src={commercials.image || '/fallback-image.jpg'}
          alt="mls"
          width={700}
          height={400}
          className="image"
        />
      </div>
    </div>
  );
}
