// reviews component
//import  { useRef, useState } from "react";
'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import Iconbar from '@/components/misc/Iconbar';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper';
import { FaStar, FaQuoteLeft, FaAward, FaCalendar } from 'react-icons/fa';

const Reviews = ({ reviews }) => {
  return (
    <>
      <div>
        <div className="pt-4">
          {/* title */}
          <div className="container pt-5 mt-4">
            <h2 className="text-center pt-3 display-4">Reviews</h2>
            <hr className="hr w-25 mx-auto pt-5" />
            <Iconbar />
            <p className="text-center lead mt-5 fs-4 fw-normal">
              See why we were voted the #1 Real Estate Company in the region.
              Check out our wide variety of apartments, from cozy studio
              apartments to spacious 3-bedroom homes with all the amenities.
              Book an appointment today with one of our agents or check our
              calendar for open house events. We look forward to meeting you.
            </p>
          </div>
        </div>
      </div>
      <div className="container pt-5 mt-5 my-5 h-100">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className="swiper">
            <Image
              src={reviews.image1}
              className="slider img-fluid w-100"
              loading="lazy"
              alt=""
              width={1000}
              height={250}
            />
            {/* carousel-caption */}
            <div className="carousel-caption mb-5">
              <div className="row mt-auto justify-content-end z-index-9">
                <div className="col-md-8 col-xl-6 col-xxl-4">
                  {/* card */}
                  <div className="cards p-3 p-md-5 m-2 m-lg-6 ">
                    <h3 className="">{reviews.title}</h3>
                    <hr className="hr w-25 mx-auto" />
                    <div className="position-absolute">
                      <FaQuoteLeft className="social-icons fs-6" />
                    </div>
                    <div className="container p-3 p-sm-4">
                      <p className=" p-2">{reviews.description}</p>
                      {/* card-footer */}
                      <div className="card-footer d-flex align-items-center justify-content-center text-nowrap">
                        <span className="d-inline-block me-1">
                          <h6 className="pt-3 text-dark">Rating:</h6>
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-blockm me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={reviews.image2}
              className="slider img-fluid w-100"
              loading="lazy"
              alt=""
              width={1000}
              height={250}
            />
            {/* carousel-caption */}
            <div className="carousel-caption mb-5">
              <div className="row mt-auto justify-content-end z-index-9">
                <div className="col-md-8 col-xl-6 col-xxl-4 pe-3">
                  {/* card */}
                  <div className="cards p-3 p-md-5 m-2 m-lg-6 ">
                    <h3 className="">{reviews.title1}</h3>
                    <hr className="hr w-25 mx-auto" />
                    <div className="position-absolute mt-2">
                      <i className="social-icon fa-solid fa-quote-left fs-6"></i>
                    </div>
                    <div className="container p-3 p-sm-4">
                      <p className="p-2">{reviews.description1}</p>
                      {/* card-footer */}
                      <div className="card-footer pb-4 d-flex align-items-center justify-content-center text-nowrap">
                        <span className="d-inline-block me-1">
                          <h6 className="pt-3 text-dark">Rating:</h6>
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={reviews.image3}
              className="slider img-fluid w-100"
              loading="lazy"
              alt=""
              width={1000}
              height={250}
            />
            {/* carousel-caption */}
            <div className="carousel-caption mb-5">
              <div className="row mt-auto justify-content-end z-index-9">
                <div className="col-md-8 col-xl-6 col-xxl-4 pe-3">
                  {/* card */}
                  <div className="cards p-3 p-md-5 m-2 m-lg-6 ">
                    <h3 className="">{reviews.title2}</h3>
                    <hr className="hr w-25 mx-auto" />
                    <div className="position-absolute mt-2">
                      <i className="social-icon fa-solid fa-quote-left fs-6"></i>
                    </div>
                    <div className="container p-3 p-sm-4">
                      <p className="p-2">{reviews.description2}</p>
                      {/* card-footer */}
                      <div className="card-footer mb-4 d-flex align-items-center justify-content-center text-nowrap">
                        <span className="d-inline-block me-1">
                          <h6 className="pt-3 text-dark">Rating:</h6>
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={reviews.image4}
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
                  {/* card */}
                  <div className="cards p-3 p-md-5 m-2 m-lg-6 ">
                    <h3 className="">{reviews.title3}</h3>
                    <hr className="hr w-25 mx-auto" />
                    <div className="position-absolute mt-2">
                      <i className="social-icon fa-solid fa-quote-left fs-6"></i>
                    </div>
                    <div className="container p-3 p-sm-4">
                      <p className="p-2">{reviews.description3}</p>
                      {/* card-footer */}
                      <div className="card-footer mb-4 d-flex align-items-center justify-content-center text-nowrap">
                        <span className="d-inline-block me-1">
                          <h6 className="pt-3 text-dark">Rating:</h6>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper">
            <Image
              src={reviews.image8}
              className="slider img-fluid d-block
             w-100"
              loading="lazy"
              alt=""
              width={1000}
              height={250}
            />
            {/* carousel-caption */}
            <div className="carousel-caption mb-5">
              <div className="row mt-auto justify-content-end z-index-9">
                <div className="col-md-8 col-xl-6 col-xxl-4 pe-3">
                  {/* card */}
                  <div className="cards p-3 p-md-5 m-2 m-lg-6 ">
                    <h3 className="">{reviews.title4}</h3>
                    <hr className="hr w-25 mx-auto" />
                    <div className="position-absolute mt-2">
                      <i className="social-icon fa-solid fa-quote-left fs-6"></i>
                    </div>
                    <div className="container p-3 p-sm-4">
                      <p className=" p-2 ">{reviews.description4}</p>
                      {/* card-footer */}
                      <div className="card-footer mb-4 d-flex align-items-center justify-content-center text-nowrap">
                        <span className="d-inline-block me-1">
                          <h6 className="pt-3 text-dark">Rating:</h6>
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                        <span className="d-inline-block me-1">
                          <FaStar className="rating-icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Reviews;
