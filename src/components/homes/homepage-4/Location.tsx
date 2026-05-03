"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

const locations = [
  {
    image: "/assets/images/section/location-12.jpg",
    name: "Los Angeles, CA",
    count: 214,
    link: "#",
    nameClass: "mb_4",
  },
  {
    image: "/assets/images/section/location-13.jpg",
    name: "San Francisco, CA",
    count: 312,
    link: "#",
    nameClass: "mb_6",
  },
  {
    image: "/assets/images/section/location-14.jpg",
    name: "New York City, NY",
    count: 311,
    link: "#",
    nameClass: "mb_6",
  },
  {
    image: "/assets/images/section/location-15.jpg",
    name: "Chicago, IL",
    count: 180,
    link: "#",
    nameClass: "mb_6",
  },
  {
    image: "/assets/images/section/location-16.jpg",
    name: "Boston, MA",
    count: 128,
    link: "#",
    nameClass: "mb_6",
  },
  {
    image: "/assets/images/section/location-17.jpg",
    name: "Boston, MA",
    count: 128,
    link: "#",
    nameClass: "mb_6",
  },
];

export default function Location() {
  return (
    <div className="section-location-1 sw-layout tf-spacing-1">
      <div className="tf-container">
        <div className="wrap-heading-section d-flex justify-content-between align-items-center mb_48">
          <div className="heading-section ">
            <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
              Filter by Type
            </span>
            <h3 className="text_white split-text effect-blur-fade">
              Properties By Location
            </h3>
          </div>
          <div className="wrap-btn d-flex gap_12">
            <div className="sw-button style-border-2 nav-prev-layout swbp-3">
              <i className="icon-CaretLeft"></i>
            </div>
            <div className="sw-button style-border-2 nav-next-layout swbn-3">
              <i className="icon-CaretRight"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="tf-container slider-layout-right scrolling-effect effectRight">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swbp-3",
            nextEl: ".swbn-3",
          }}
          slidesPerView={4.96}
          spaceBetween={30}
          breakpoints={{
            1400: { slidesPerView: 4.96, spaceBetween: 30 },
            1200: { slidesPerView: 3.9, spaceBetween: 30 },
            992: { slidesPerView: 3.2, spaceBetween: 20 },
            576: { slidesPerView: 2.3, spaceBetween: 15 },
            0: { slidesPerView: 1.2, spaceBetween: 15 },
          }}
          className="swiper"
        >
          {locations.map((loc, idx) => (
            <SwiperSlide key={idx}>
              <div className="location-item hover-image">
                <a href={loc.link} className="img-style mb_18">
                  <Image
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={260}
                    src={loc.image}
                    alt="location"
                  />
                </a>
                <div className="content">
                  <a
                    href={loc.link}
                    className={`${loc.nameClass} link h5 text_white`}
                  >
                    {loc.name}
                  </a>
                  <p className="text_secondary-color-2 text-caption-1">
                    {loc.count} Property
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
