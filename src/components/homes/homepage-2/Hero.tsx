"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";


const heroSlides = [
    {
        image: "/assets/images/page-title/page-title-4.jpg",
        title: "Your Perfect Home Awaits",
        description:
            "From cozy bedrooms to open-concept living areas, Luminor offers thoughtfully designed spaces tailored to fit your lifestyle and dreams.",
        buttons: [
            {
                href: "/listing-topmap-grid",
                className: "tf-btn btn-bg-1 btn-px-32",
                label: "View Properties",
            },
            {
                href: "/contacts",
                className: "tf-btn btn-bg-white btn-px-32",
                label: "Contact Us",
            },
        ],
    },
    {
        image: "/assets/images/page-title/page-title-5.jpg",
        title: "Your Perfect Home Awaits",
        description:
            "From cozy bedrooms to open-concept living areas, Luminor offers thoughtfully designed spaces tailored to fit your lifestyle and dreams.",
        buttons: [
            {
                href: "/listing-topmap-grid",
                className: "tf-btn btn-bg-1 btn-px-32",
                label: "View Properties",
            },
            {
                href: "/contacts",
                className: "tf-btn btn-bg-white btn-px-32",
                label: "Contact Us",
            },
        ],
    },
];

export default function Hero() {
    return (
        <div className="page-title style-2 sw-layout">
            <Swiper
                className="effect-content-slide"
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                navigation={{
                    nextEl: ".nav-next-layout",
                    prevEl: ".nav-prev-layout",
                }}
                pagination={{
                    el: ".sw-pagination-layout",
                    clickable: true,
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                effect="fade"
                loop
            >
                {heroSlides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="slide-inner">
                            <div className="thumbs effect-img-zoom ">
                                <Image
                                    className="img-zoom"
                                    src={slide.image}
                                    width="1920"
                                    height="720"
                                    alt="image"
                                    priority
                                />
                            </div>
                            <div className="content">
                                <div className="tf-container ">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h1 className="title text_white mb_24 fw-5 effect-item effect-1 effect-up ">
                                                {slide.title}
                                            </h1>
                                            <p className="h6 text_white effect-item effect-2 effect-left ">
                                                {slide.description}
                                            </p>
                                            <div className="wrap-btn d-flex effect-item effect-3 effect-right">
                                                {slide.buttons.map((btn, bidx) => (
                                                    <a
                                                        key={bidx}
                                                        href={btn.href}
                                                        className={btn.className}
                                                    >
                                                        <span>{btn.label}</span>
                                                        <span className="bg-effect"></span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="sw-button nav-prev-layout xxl-hide">
                    <i className="icon-CaretLeft"></i>
                </div>
                <div className="sw-button nav-next-layout xxl-hide">
                    <i className="icon-CaretRight"></i>
                </div>
                <div className="sw-dots sw-pagination-layout justify-content-center d-flex"></div>
            </Swiper>
            <SidebarFilterDefault />
        </div>
    );
}
