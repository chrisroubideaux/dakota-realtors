// Cover component
'use client';
import Image from 'next/image';

export default function Cover({ homes }) {
  return (
    <div className="container-fluid">
      <Image
        src={homes.image || '/fallback-image.jpg'}
        className="image"
        alt="mla"
        width={700}
        height={400}
      />
    </div>
  );
}
