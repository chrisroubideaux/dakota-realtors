// slider components
'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Pagination } from 'swiper';

export default function Sliders({ commercials }) {
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
            <img src={commercials.image} alt="mls" className="image" />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <img src={commercials.image1} className="image" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <img src={commercials.image2} className="image" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <img src={commercials.image3} className="image" alt="" />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <img src={commercials.image4} className="image" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
