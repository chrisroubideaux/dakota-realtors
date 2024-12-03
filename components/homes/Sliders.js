// Slider component
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper';

export default function Sliders({ homes }) {
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
              src={homes.image || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
              layout="responsive"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={homes.image1 || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
              layout="responsive"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={homes.image2 || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
              layout="responsive"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={homes.image3 || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
              layout="responsive"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={homes.image4 || '/fallback-image.jpg'}
              className="image"
              alt="mls"
              width={400}
              height={400}
              layout="responsive"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
