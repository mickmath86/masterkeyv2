"use client";
import React from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { recommendedProperties } from "@/data/properties";
import Link from "next/link";

export default function Properties() {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(
        null
    );
    const [mainSwiper, setMainSwiper] = React.useState<SwiperClass | null>(
        null
    );

    return (
        <div className="section-features-property-2 tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Features Properties
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Recommended For You
                    </h3>
                </div>
                <div className="card-house style-1 hover-image flat-thumbs-tes position-relative">
                    <div className="box-left">
                        <Swiper
                            modules={[Thumbs, Navigation, Pagination]}
                            onSwiper={setMainSwiper}
                            thumbs={{
                                swiper:
                                    thumbsSwiper && !thumbsSwiper.destroyed
                                        ? thumbsSwiper
                                        : null,
                            }}
                            navigation={{
                                nextEl: ".nav-next-tes",
                                prevEl: ".nav-prev-tes",
                            }}
                            pagination={{
                                el: ".sw-pagination-tes",
                                clickable: true,
                            }}
                            spaceBetween={20}
                            slidesPerView={1}
                            className="tf-tes-main"
                            onSlideChange={(swiper) => {
                                if (thumbsSwiper && !thumbsSwiper.destroyed) {
                                    thumbsSwiper.slideTo(swiper.activeIndex);
                                }
                            }}
                        >
                            {recommendedProperties.map((property) => (
                                <SwiperSlide key={property.id}>
                                    <div className="content">
                                        <Link
                                            href={`/property-details-1/${property.id}`}
                                            className="title mb_12 h4 link text_primary-color"
                                        >
                                            {property.title}
                                        </Link>
                                        <p className="text-caption-1 mb_20">
                                            {property.address}
                                        </p>
                                        <ul className="info d-flex mb_32">
                                            <li className="d-flex align-items-center gap_12 h6 text_primary-color fw-6">
                                                <i className="icon-Bed"></i>
                                                {property.beds} Beds
                                            </li>
                                            <li className="d-flex align-items-center gap_12 h6 text_primary-color fw-6">
                                                <i className="icon-Bathstub"></i>
                                                {property.baths} Baths
                                            </li>
                                            <li
                                                className="d-flex align-items-center gap_12 h6 text_primary-color fw-6"
                                                suppressHydrationWarning
                                            >
                                                <i className="icon-Ruler"></i>
                                                {property.sqft
                                                    ? property.sqft.toLocaleString()
                                                    : "0"}{" "}
                                                Sqft
                                            </li>
                                        </ul>
                                        <p className="desc text-body-2 mb_32">
                                            {property.description}
                                        </p>
                                        <div className="wrap-author d-flex align-items-center gap_12 justify-content-between flex-wrap mb_32">
                                            <div className="author d-flex gap_12">
                                                <div className="avatar">
                                                    <Image
                                                        src={
                                                            property.authorAvatar ||
                                                            "/assets/images/avatar/avatar-7.jpg"
                                                        }
                                                        alt="avatar"
                                                        width={60}
                                                        height={60}
                                                    />
                                                </div>
                                                <div className="info-author">
                                                    <p className="text-body-2 mb_4">
                                                        Agent
                                                    </p>
                                                    <h6>
                                                        {property.authorName}
                                                    </h6>
                                                </div>
                                            </div>
                                            <h4 className="price">
                                                {property.price}
                                                <span className="text_secondary-color text-title">
                                                    {property.type === "Sale"
                                                        ? "/Sqft"
                                                        : "/month"}
                                                </span>
                                            </h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="box-right">
                        <Swiper
                            modules={[Thumbs]}
                            onSwiper={setThumbsSwiper}
                            watchSlidesProgress={true}
                            allowTouchMove={true}
                            spaceBetween={20}
                            slidesPerView={1}
                            className="tf-thumb-tes"
                            onSlideChange={(swiper) => {
                                if (mainSwiper && !mainSwiper.destroyed) {
                                    mainSwiper.slideTo(swiper.activeIndex);
                                }
                            }}
                        >
                            {recommendedProperties.map((property, idx) => (
                                <SwiperSlide key={property.id}>
                                    <div
                                        className={`img-style${
                                            idx === 0 ? "" : ""
                                        }`}
                                    >
                                        <Image
                                            src={property.imgSrc}
                                            width={645}
                                            height={410}
                                            alt="home"
                                        />
                                        <div className="wrap-tag d-flex gap_8 mb_12">
                                            <div
                                                className={`tag ${
                                                    property.type === "Sale"
                                                        ? "sale"
                                                        : property.type ===
                                                          "Rent"
                                                        ? "rent"
                                                        : property.type
                                                } text-button-small fw-6 text_primary-color`}
                                            >
                                                For {property.type}
                                            </div>
                                            <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                {property.categories}
                                            </div>
                                        </div>
                                        <Link
                                            href={`/property-details-1/${property.id}`}
                                            className="overlay-link"
                                        ></Link>
                                        <div className="wishlist">
                                            <div className="hover-tooltip tooltip-left box-icon">
                                                <span className="icon icon-Heart"></span>
                                                <span className="tooltip">
                                                    Add to Wishlist
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="sw-button nav-prev-tes xxl-hide">
                            <i className="icon-CaretLeft"></i>
                        </div>
                        <div className="sw-button nav-next-tes xxl-hide">
                            <i className="icon-CaretRight"></i>
                        </div>
                    </div>
                </div>
                <div className="sw-dots style-1 sw-pagination-tes justify-content-center d-xl-none d-flex mt_24"></div>
            </div>
        </div>
    );
}
