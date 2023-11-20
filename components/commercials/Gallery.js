// gallery componet
'use client';
import Image from 'next/image';
import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

export default function Sliders({ commercials }) {
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
          <img src={commercials.image} alt="mls" className="image" />
        </SwiperSlide>
        <SwiperSlide className="swiper ">
          <img src={commercials.image1} alt="mls" className="image" />
        </SwiperSlide>
        <SwiperSlide className="swiper ">
          <img src={commercials.image2} alt="mls" className="image" />
        </SwiperSlide>
        <SwiperSlide className="swiper ">
          <img src={commercials.image3} alt="mls" className="image" />
        </SwiperSlide>
        <SwiperSlide className="swiper ">
          <img src={commercials.image4} alt="mls" className="image" />
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
