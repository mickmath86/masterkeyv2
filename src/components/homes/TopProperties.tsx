"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { topProperties } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";

export default function TopProperties() {
    return (
        <div className="sw-layout section-top-properties tf-spacing-3">
            <div className="tf-container w-1830">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Top Properties
                    </span>
                    <h3 className="text_white split-text effect-blur-fade">
                        Best Property Value
                    </h3>
                </div>
                <Swiper
                    modules={[Navigation, Pagination, EffectFade]}
                    slidesPerView={3}
                    spaceBetween={45}
                    loop={true}
                    pagination={{
                        el: ".sw-progress-layout",
                        type: "progressbar",
                        clickable: true,
                    }}
                    navigation={{
                        prevEl: ".swp1",
                        nextEl: ".swn1",
                    }}
                    onInit={(swiper) => {
                        const fractionEl = document.querySelector(
                            ".sw-fraction-layout"
                        );
                        const swiperContainer =
                            document.querySelector(".sw-layout .swiper");

                        if (fractionEl && swiperContainer) {
                            const updateFraction = () => {
                                const current = String(
                                    swiper.realIndex + 1
                                ).padStart(2, "0");
                                const totalSlides = String(
                                    swiper.slides.filter(
                                        (slide) =>
                                            !slide.classList.contains(
                                                "swiper-slide-duplicate"
                                            )
                                    ).length
                                ).padStart(2, "0");

                                fractionEl.innerHTML = `<span class="current">${current}</span> / <span class="total">${totalSlides}</span>`;
                            };

                            swiper.on("init", updateFraction);
                            swiper.on("slideChange", updateFraction);
                            updateFraction();
                        }
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 15 },
                        768: { slidesPerView: 2, spaceBetween: 20 },
                        1200: { slidesPerView: 3, spaceBetween: 45 },
                    }}
                    className="scrolling-effect effectRight"
                >
                    {topProperties.slice(0, 6).map((property) => (
                        <SwiperSlide key={property.id}>
                            <div className="card-house style-default dark hover-image">
                                <div className="img-style mb_20">
                                    <Image
                                        src={property.imgSrc}
                                        width={570}
                                        height={427}
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
                                    <div className="wishlist style-1">
                                        <div className="hover-tooltip tooltip-left box-icon">
                                            <span className="icon icon-Heart"></span>
                                            <span className="tooltip">
                                                Add to Wishlist
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="content">
                                    <h4 className="price mb_12">
                                        {property.price}
                                        <span className="text_secondary-color text-body-default">
                                            {property.type === "Sale"
                                                ? "/Sqft"
                                                : "/month"}
                                        </span>
                                    </h4>
                                    <a
                                        href={`/property-details-1/${property.id}`}
                                        className="title mb_8 h5 link text_primary-color"
                                    >
                                        {property.title}
                                    </a>
                                    <p>{property.address}</p>
                                    <ul className="info d-flex">
                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                            <i className="icon-Bed"></i>
                                            {property.beds} Beds
                                        </li>
                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                            <i className="icon-Bathstub"></i>
                                            {property.baths} Baths
                                        </li>
                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                            <i className="icon-Ruler"></i>
                                            {property.sqft}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="wrap-nav">
                        <div className="sw-fraction-layout h4"></div>
                        <div className="sw-progress-layout"></div>
                        <div className="wrap-sw-button">
                            <div className="sw-button nav-prev-layout swp1">
                                <i className="icon-CaretLeft"></i>
                            </div>
                            <div className="sw-button nav-next-layout swn1">
                                <i className="icon-CaretRight"></i>
                            </div>
                        </div>
                    </div>
                </Swiper>
            </div>
        </div>
    );
}
