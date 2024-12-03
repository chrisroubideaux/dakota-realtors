// Slider component
'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper';

export default function Sliders({ apartments }) {
  return (
    <>
      <div className="container">
        <Swiper
          spaceBetween={16}
          centeredSlides={true}
          pagination={{
            type: 'fraction',
          }}
          //  autoplay={{
          //delay: 2500,
          //disableOnInteraction: false,
          // }}

          // import required modules  navigation={true}
          modules={[Navigation, Pagination]}
          className=" mySwiper swiper-nav-onhover w-100"
        >
          <SwiperSlide className="swiper ">
            <Image
              src={apartments.image || '/fallback-image.jpg'}
              alt="mls"
              className="image"
              width={400}
              height={400}
            />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={apartments.image1 || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
            />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={apartments.image2 || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
            />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={apartments.image3 || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
            />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={apartments.image4 || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
