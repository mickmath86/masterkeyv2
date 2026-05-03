"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { properties } from "@/data/properties";
import Link from "next/link";
import Image from "next/image";

export default function Properties() {
    return (
        <div className="bg-dark-color sw-layout tf-spacing-1">
            <div className="tf-container">
                <div className="wrap-heading-section d-flex justify-content-between align-items-center mb_48">
                    <div className="heading-section ">
                        <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotae">
                            Featured Properties
                        </span>
                        <h3 className="text_white split-text effect-blur-fade">
                            Find Your Dream Home
                        </h3>
                    </div>
                    <a
                        href="listing-topmap-grid.html"
                        className="tf-btn btn-bg-white btn-px-32"
                    >
                        <span>View All Properties</span>
                        <span className="bg-effect"></span>
                    </a>
                </div>
            </div>
            <div className="tf-container slider-layout-right">
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        el: ".sw-pagination-layout",
                        clickable: true,
                    }}
                    spaceBetween={30}
                    slidesPerView={3.7}
                    breakpoints={{
                        1440: { slidesPerView: 3.7, spaceBetween: 30 },
                        1200: { slidesPerView: 2.7, spaceBetween: 30 },
                        992: { slidesPerView: 2.3, spaceBetween: 20 },
                        768: { slidesPerView: 1.5, spaceBetween: 15 },
                        0: { slidesPerView: 1.1, spaceBetween: 15 },
                    }}
                    className="scrolling-effect effectRight"
                >
                    {properties.map((property) => (
                        <SwiperSlide key={property.id}>
                            <div
                                key={property.id}
                                className="card-house style-default hover-image style-2"
                                data-id={property.id}
                            >
                                <div className="img-style mb_20">
                                    <Image
                                        src={property.imgSrc}
                                        width={379}
                                        height={278}
                                        alt="home"
                                    />
                                    <div className="wrap-tag d-flex gap_8 mb_12">
                                        <div
                                            className={`tag ${
                                                property.type === "Sale"
                                                    ? "sale"
                                                    : property.type === "Rent"
                                                    ? "rent"
                                                    : property.type
                                            }  text-button-small fw-6 text_primary-color`}
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
                                <div className="content">
                                    <h4
                                        className="price mb_12"
                                        suppressHydrationWarning
                                    >
                                        ${property.price.toLocaleString()}
                                        <span className="text_secondary-color text-body-default">
                                            {property.type === "Sale"
                                                ? "/Sqft"
                                                : "/month"}
                                        </span>
                                    </h4>
                                    <Link
                                        href={`/property-details-1/${property.id}`}
                                        className="title mb_8 h5 link text_primary-color line-clamp-1"
                                    >
                                        {property.title}
                                    </Link>
                                    <p>{property.address}</p>
                                    <ul className="info d-flex">
                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                            <i className="icon-Bed"></i>
                                            {property.beds} Bed
                                        </li>
                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                            <i className="icon-Bathtub"></i>
                                            {property.baths} Bath
                                        </li>
                                        <li
                                            className="d-flex align-items-center gap_8 text-title text_primary-color fw-6 "
                                            suppressHydrationWarning
                                        >
                                            <i className="icon-Ruler"></i>
                                            {property.sqft
                                                ? property.sqft.toLocaleString()
                                                : "0"}{" "}
                                            Sqft
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="sw-dots  sw-pagination-layout justify-content-center d-flex mt_24 d-md-none"></div>
            </div>
        </div>
    );
}
