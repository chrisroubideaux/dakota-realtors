// Rooms component
'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { FaArrowAltCircleDown } from 'react-icons/fa';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
//import 'swiper/css/navigation';

export default function Room({ commercials }) {
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Image
          src={commercials.image3}
          alt="mls"
          width={400}
          height={200}
          className="image img-fluid"
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
              tabIndex="-1"
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
                            src={commercials.image1 || '/fallback-image.jpg'}
                            className="image img-fluid"
                            alt="mls"
                            width={1500}
                            height={500}
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <Image
                            src={commercials.image2 || '/fallback-image.jpg'}
                            className="image img-fluid"
                            alt="mls"
                            width={1500}
                            height={500}
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <Image
                            src={commercials.image3 || '/fallback-image.jpg'}
                            className="image img-fluid"
                            alt="mls"
                            width={1500}
                            height={500}
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <Image
                            src={commercials.image4 || '/fallback-image.jpg'}
                            className="image img-fluid"
                            alt="mls"
                            width={1500}
                            height={500}
                          />
                        </SwiperSlide>
                      </Swiper>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
