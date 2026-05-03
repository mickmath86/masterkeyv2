"use client";
import { properties } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Properties() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <div className="section-features-property-3 tf-spacing-1">
            <div className="heading-section justify-content-center text-center mb_48">
                <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                    Featured Properties
                </span>
                <h3 className="split-text effect-blur-fade">
                    Find Your Dream Home
                </h3>
            </div>
            <div className="tf-container">
                {isMobile ? (
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={15}
                        slidesPerView={1}
                        pagination={{ clickable: true, el: ".sw-dots" }}
                        className="tf-sw-mobile bg_1"
                    >
                        {properties.slice(0, 4).map((property, idx) => (
                            <SwiperSlide key={idx}>
                                <div
                                    key={property.id}
                                    className="card-house style-default hover-image"
                                    data-id={property.id}
                                >
                                    <div className="img-style mb_20">
                                        <Image
                                            src={property.imgSrc}
                                            width={410}
                                            height={308}
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
                                            className="title mb_8 h5 link text_primary-color"
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
                        <div className="sw-dots style-1 sw-pagination-mb mt_24 justify-content-center d-flex d-md-none"></div>
                    </Swiper>
                ) : (
                    <div className="tf-sw-mobile bg_1">
                        <div className="tf-grid-layout-md md-col-2">
                            {properties.slice(0, 4).map((property, idx) => (
                                <div className="swiper-slide" key={idx}>
                                    <div
                                        key={property.id}
                                        className="card-house style-default hover-image"
                                        data-id={property.id}
                                    >
                                        <div className="img-style mb_20">
                                            <Image
                                                src={property.imgSrc}
                                                width={410}
                                                height={308}
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
                                                $
                                                {property.price.toLocaleString()}
                                                <span className="text_secondary-color text-body-default">
                                                    {property.type === "Sale"
                                                        ? "/Sqft"
                                                        : "/month"}
                                                </span>
                                            </h4>
                                            <Link
                                                href={`/property-details-1/${property.id}`}
                                                className="title mb_8 h5 link text_primary-color"
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
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <a
                    href="listing-topmap-grid.html"
                    className="tf-btn btn-bg-1 mx-auto btn-px-32 scrolling-effect effectBottom"
                >
                    <span>View All Properties</span>
                    <span className="bg-effect"></span>
                </a>
            </div>
        </div>
    );
}
