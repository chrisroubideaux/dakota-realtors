// Office component
'use client';
import Image from 'next/image';

export default function Bed({ commercials }) {
  return (
    <div>
      <div className="">
        <Image
          src={commercials.image2 || '/fallback-image.jpg'}
          className="image img-fluid"
          alt="mls"
          width={400}
          height={200}
        />
      </div>
    </div>
  );
}
