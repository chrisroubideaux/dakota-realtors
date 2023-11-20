// sliders
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper';

const Sliders = ({ banners }) => {
  return (
    <>
      <Swiper
        spaceBetween={16}
        centeredSlides={true}
        pagination={{
          type: 'fraction',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // import required modules  navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        className=" swiper mySwiper swiper-nav-onhover mt-3"
      >
        <SwiperSlide className="swiper shadow-lg">
          <Image
            src={banners.image1}
            className="slider img-fluid"
            loading="lazy"
            alt=""
            width={1000}
            height={250}
          />
          {/* carousel-caption */}
          <div className="carousel-caption mb-5 ">
            <div className="row mt-auto justify-content-end z-index-9 me-2">
              <div className="col-md-8 col-xl-6 col-xxl-4">
                <div className="cards p-3 p-md-5 m-2 m-lg-6">
                  <h4 className="fw-bolder">{banners.title}</h4>
                  <p className="fw-normal">{banners.description}</p>
                  <Link className="btn btn-sm" href="/Properties/">
                    View Properties
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper">
          <Image
            src={banners.image2}
            className="slider img-fluid"
            loading="lazy"
            alt=""
            width={1000}
            height={250}
          />
          {/* carousel-caption */}
          <div className="carousel-caption mb-5">
            <div className="row mt-auto justify-content-end z-index-9">
              <div className="col-md-8 col-xl-6 col-xxl-4"></div>
              <div className="col-md-8 col-xl-6 col-xxl-4">
                <div className="cards p-3 p-md-5 m-2 m-lg-6">
                  <h4 className="fw-bold">{banners.title1}</h4>
                  <p className="fw-normal">{banners.description1}</p>
                  <Link className="btn btn-sm" href="/Properties/">
                    View Homes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper">
          <Image
            src={banners.image3}
            className="slider img-fluid"
            loading="lazy"
            alt=""
            width={1000}
            height={250}
          />
          {/* carousel-caption */}
          <div className="carousel-caption mb-5">
            <div className="row mt-auto justify-content-end z-index-9">
              <div className="col-md-8 col-xl-6 col-xxl-4">
                <div className="container mt-4"></div>
              </div>
              <div className="col-md-8 col-xl-6 col-xxl-4">
                <div className="cards p-3 p-md-5 m-2 m-lg-6">
                  <h4 className="fw-bold">{banners.title2}</h4>
                  <p className="fw-normal">{banners.description2}</p>
                  <Link className="btn btn-sm" href="/Properties/">
                    View Apartments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper">
          <Image
            src={banners.image4}
            className="slider img-fluid"
            loading="lazy"
            alt=""
            width={1000}
            height={250}
          />
          {/* carousel-caption */}
          <div className="carousel-caption mb-5">
            <div className="row mt-auto justify-content-end z-index-9">
              <div className="col-md-8 col-xl-6 col-xxl-4">
                <div className="container mt-4"></div>
              </div>
              <div className="col-md-8 col-xl-6 col-xxl-4">
                <div className="cards p-3 p-md-5 m-2 m-lg-6">
                  <h4 className="fw-bold">{banners.title3}</h4>
                  <p className=" fw-normal">{banners.description3}</p>
                  <Link className="btn btn-sm" href="/Properties/">
                    Calendar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper">
          <Image
            src={banners.image8}
            className="slider img-fluid w-100"
            loading="lazy"
            alt=""
            width={1000}
            height={250}
          />
          {/* carousel-caption */}
          <div className="carousel-caption mb-5">
            <div className="row mt-auto justify-content-end z-index-9">
              <div className="col-md-8 col-xl-6 col-xxl-4"></div>
              <div className="col-md-8 col-xl-6 col-xxl-4 pe-3">
                <div className="cards p-3 p-md-5 m-2 m-lg-6">
                  <h4 className="fw-bold">{banners.title4}</h4>
                  <p className="fw-normal">{banners.description4}</p>
                  <Link className="btn btn-sm" href="/Properties/">
                    Agents
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Sliders;
