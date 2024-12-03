// Gallery componet
'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';

export default function Sliders({ homes }) {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide className="swiper ">
          <Image
            src={homes.image || '/fallback-image.jpg'}
            className="image"
            alt="mls"
            width={400}
            height={400}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper ">
          <Image
            src={homes.image1 || '/fallback-image.jpg'}
            className="image"
            alt="mls"
            width={400}
            height={400}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper ">
          <Image
            src={homes.image2 || '/fallback-image.jpg'}
            className="image"
            alt="mls"
            width={400}
            height={400}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper ">
          <Image
            src={homes.image3 || '/fallback-image.jpg'}
            className="image"
            alt="mls"
            width={400}
            height={400}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper ">
          <Image
            src={homes.image4 || '/fallback-image.jpg'}
            className="image"
            alt="mls"
            width={400}
            height={400}
          />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
