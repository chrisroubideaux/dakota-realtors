// Cover component for apartments
'use client';
import Image from 'next/image';

export default function Cover({ apartments }) {
  return (
    <div className="container-fluid">
      <Image
        src={apartments.image1 || '/fallback-image.jpg'}
        className="image"
        alt="mls"
        width={700}
        height={400}
      />
    </div>
  );
}
