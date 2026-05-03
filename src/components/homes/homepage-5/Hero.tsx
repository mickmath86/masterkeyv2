"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";

type HeroSlide = {
    id: number;
    imgSrc: string;
    type: "Rent" | "Sale";
    category: string;
    price: string;
    priceUnit: string;
    title: string;
    address: string;
    beds: number;
    baths: number;
    sqft: string;
};

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        imgSrc: "/assets/images/page-title/page-title-10.jpg",
        type: "Rent",
        category: "Studio",
        price: "$5280,00",
        priceUnit: "/month",
        title: "Coastal Serenity Cottage",
        address: "918 Maple Avenue, Brooklyn, NY 11215",
        beds: 4,
        baths: 2,
        sqft: "2,600 Sqft",
    },
    {
        id: 2,
        imgSrc: "/assets/images/page-title/page-title-11.jpg",
        type: "Sale",
        category: "Studio",
        price: "$6130,00",
        priceUnit: "/SqFT",
        title: "Sunset Heights Estate",
        address: "245 Elm Street, San Francisco, CA 94102",
        beds: 3,
        baths: 2,
        sqft: "1,600 Sqft",
    },
];

export default function Hero() {
    // Check if there are slides to display
    if (!heroSlides || heroSlides.length === 0) {
        return null;
    }

    return (
        <div className="page-title style-5 sw-layout">
            <div className="page-inner position-relative">
                <Swiper
                    className="effect-content-slide"
                    loop={true}
                    modules={[Navigation, Autoplay, EffectFade]}
                    navigation={{
                        prevEl: ".swbp-02",
                        nextEl: ".swbn-02",
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    effect="fade"
                >
                    {heroSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="slide-inner">
                                <div className="thumbs effect-img-zoom ">
                                    <Image
                                        className="img-zoom"
                                        src={slide.imgSrc}
                                        width={1920}
                                        height={760}
                                        alt="page-title"
                                        priority
                                    />
                                </div>
                                <div className="content effect-left effect-item effect-1">
                                    <div className="tf-container">
                                        <div className="row justify-content-end">
                                            <div className="col-lg-5 col-sm-9">
                                                <div className="content-inner">
                                                    <div className="wrap-tag d-flex gap_8 mb_12 effect-left effect-item effect-3">
                                                        <div
                                                            className={`tag ${
                                                                slide.type ===
                                                                "Sale"
                                                                    ? "sale"
                                                                    : "rent"
                                                            } text-button-small fw-6 text_primary-color`}
                                                        >
                                                            For {slide.type}
                                                        </div>
                                                        <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                            {slide.category}
                                                        </div>
                                                    </div>
                                                    <h4 className="price mb_12 effect-left effect-item effect-4">
                                                        {slide.price}
                                                        <span className="text_secondary-color text-body-default fw-4">
                                                            {slide.priceUnit}
                                                        </span>
                                                    </h4>
                                                    <h4 className="title mb_8 effect-left effect-item effect-5">
                                                        {slide.title}
                                                    </h4>
                                                    <p className="effect-left effect-item effect-6">
                                                        {slide.address}
                                                    </p>
                                                    <ul className="info d-flex effect-up effect-item effect-7">
                                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                            <i className="icon-Bed"></i>
                                                            {slide.beds} Beds
                                                        </li>
                                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                            <i className="icon-Bathstub"></i>
                                                            {slide.baths} Baths
                                                        </li>
                                                        <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                            <i className="icon-Ruler"></i>
                                                            {slide.sqft}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="sw-button nav-prev-layout lg-hide swbp-02">
                    <i className="icon-CaretLeft"></i>
                </div>
                <div className="sw-button nav-next-layout lg-hide swbn-02">
                    <i className="icon-CaretRight"></i>
                </div>
            </div>
            <SidebarFilterDefault />
        </div>
    );
}
