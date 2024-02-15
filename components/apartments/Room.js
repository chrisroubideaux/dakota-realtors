// rooms component
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
import { FaMapPin, FaArrowAltCircleDown } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
//import 'swiper/css/navigation';

export default function Room({ apartments }) {
  return (
    <div>
      <Image
        src={apartments.image3}
        className="image img-fluid"
        alt="mls"
        width={400}
        height={200}
      />

      <div className="position-absolute bottom-0 end-0 mb-3 me-5 mt-5">
        <span className="">
          {/*modal*/}
          <button
            type="button"
            className="d-none d-md-inline-block btn btn-sm btn-light me-5 mt-5 m-5"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <FaArrowAltCircleDown /> View photos
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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
                      className="mySwiper container"
                    >
                      <SwiperSlide className="conatiner">
                        <Image
                          src={apartments.image1}
                          className="image img-fluid"
                          alt="mls"
                          width={1500}
                          height={500}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={apartments.image2}
                          className="image img-fluid"
                          alt="mls"
                          width={1500}
                          height={500}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={apartments.image3}
                          className="image img-fluid"
                          alt="mls"
                          width={1500}
                          height={500}
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={apartments.image4}
                          className="image img-fluid"
                          alt="mls"
                          width={1500}
                          height={500}
                        />
                      </SwiperSlide>
                    </Swiper>
                  </>
                </div>
                {/*footer*/}

                {/*footer*/}
              </div>
            </div>
          </div>
          {/*modal*/}
        </span>
      </div>
    </div>
  );
}
