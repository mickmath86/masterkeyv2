"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";

const slides = [
    {
        src: "/assets/images/page-title/page-title-7.jpg",
        alt: "page-title",
    },
    {
        src: "/assets/images/page-title/page-title-8.jpg",
        alt: "page-title",
    },
    {
        src: "/assets/images/page-title/page-title-9.jpg",
        alt: "page-title",
    },
];

export default function Hero() {
    return (
        <div className="page-title style-4 sw-layout">
            <div className="page-inner">
                <div className="thumbs">
                    <Swiper
                        modules={[Navigation, Autoplay, EffectFade]}
                        navigation={{
                            prevEl: ".nav-prev-layout",
                            nextEl: ".nav-next-layout",
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        effect="fade"
                        loop
                        className="effect-content-slide"
                    >
                        {slides.map((slide, idx) => (
                            <SwiperSlide key={idx}>
                                <div
                                    className={`slide-inner${
                                        idx === 0 ? "" : ""
                                    } effect-img-zoom `}
                                >
                                    <Image
                                        className="img-zoom"
                                        src={slide.src}
                                        width={960}
                                        height={902}
                                        alt={slide.alt}
                                        priority
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="sw-button nav-prev-layout">
                            <i className="icon-CaretLeft"></i>
                        </div>
                        <div className="sw-button nav-next-layout">
                            <i className="icon-CaretRight"></i>
                        </div>
                    </Swiper>
                </div>
                <div className="content">
                    <h5 className="mb_12 split-text effect-right">
                        1325 Oakwood Drive, Austin, TX 78703
                    </h5>
                    <h1 className="fw-5  title mb_20 split-text split-lines-rotation-x">
                        Casa Lomas De Machali Villa
                    </h1>
                    <div className="info mb_20">
                        <div className="info-item">
                            <h5 className="mb_4 d-flex gap_8 align-items-center">
                                <i className="icon-Ruler"></i>1,900 SqFt
                            </h5>
                            <p>Land Size</p>
                        </div>
                        <div className="info-item">
                            <h5 className="mb_4 d-flex gap_8 align-items-center">
                                <i className="icon-Bed"></i>4 Room
                            </h5>
                            <p>Bed Room</p>
                        </div>
                        <div className="info-item">
                            <h5 className="mb_4 d-flex gap_8 align-items-center">
                                <i className="icon-Bathstub"></i>3 Room
                            </h5>
                            <p>Bath Room</p>
                        </div>
                        <div className="info-item">
                            <h5 className="mb_4 d-flex gap_8 align-items-center">
                                <i className="icon-CalendarBlank"></i>2023
                            </h5>
                            <p>Year Built</p>
                        </div>
                    </div>
                    <p className="text-body-1 desc mb_20">
                        This luxurious coastal villa in Malibu boasts sweeping
                        ocean views, modern open-concept design, and refined
                        elegance throughout.
                    </p>
                    <h3 className="price">
                        $450,00
                        <span className="text_secondary-color text-body-1 fw-4">
                            /month
                        </span>
                    </h3>
                    <a
                        href="property-details-1.html"
                        className="tf-btn btn-bg-1 btn-px-32"
                    >
                        <span>View Properties</span>
                        <span className="bg-effect"></span>
                    </a>
                </div>
            </div>
        </div>
    );
}
