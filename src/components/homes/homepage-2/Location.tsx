"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const locations = [
  {
    name: "Los Angeles, CA",
    properties: 221,
    image: "/assets/images/section/location-7.jpg",
  },
  {
    name: "San Francisco, CA",
    properties: 312,
    image: "/assets/images/section/location-8.jpg",
  },
  {
    name: "New York City, NY",
    properties: 311,
    image: "/assets/images/section/location-9.jpg",
  },
  {
    name: "Chicago, IL",
    properties: 180,
    image: "/assets/images/section/location-10.jpg",
  },
  {
    name: "Boston, MA",
    properties: 128,
    image: "/assets/images/section/location-11.jpg",
  },
];

export default function Location() {
  return (
    <div className="section-location-3 sw-layout">
      <div className="tf-container w-1830">
        <div className="heading-section justify-content-center text-center mb_46">
          <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
            Explore Cities
          </span>
          <h3 className="split-text effect-blur-fade">Property Location</h3>
        </div>
        <div className="position-relative">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={4}
            spaceBetween={30}
            navigation={{
              nextEl: ".nav-next-layout",
              prevEl: ".nav-prev-layout",
            }}
            pagination={{
              el: ".sw-pagination-layout",
              clickable: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 3, spaceBetween: 20 },
              1200: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="scrolling-effect effectLeft"
          >
            {locations.map((loc, idx) => (
              <SwiperSlide key={idx}>
                <div className="location-item style-1 hover-image">
                  <a href="#" className="img-style">
                    <Image
                      width={428}
                      height={590}
                      src={loc.image}
                      alt="location"
                    />
                  </a>
                  <div className="content">
                    <a href="#" className="mb_8 h5 text_primary-color">
                      {loc.name}
                    </a>
                    <p className="text-caption-1">
                      {loc.properties} Properties
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="sw-dots style-1 sw-pagination-layout text-center mt_24 d-xl-none"></div>
          <div className="sw-button nav-prev-layout xl-hide">
            <i className="icon-CaretLeft"></i>
          </div>
          <div className="sw-button nav-next-layout xl-hide">
            <i className="icon-CaretRight"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
