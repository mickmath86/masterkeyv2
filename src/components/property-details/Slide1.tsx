"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "photoswipe/dist/photoswipe.css";
import "swiper/css/navigation";
import ModalVideo from "../common/ModalVideo";

type PropertyImage = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

const propertyImages: PropertyImage[] = [
    {
        src: "/assets/images/section/properties-details-1.jpg",
        alt: "img-property",
        width: 930,
        height: 620,
    },
    {
        src: "/assets/images/section/properties-details-2.jpg",
        alt: "img-property",
        width: 930,
        height: 620,
    },
    {
        src: "/assets/images/section/properties-details-3.jpg",
        alt: "img-property",
        width: 930,
        height: 620,
    },
    {
        src: "/assets/images/section/properties-details-1.jpg",
        alt: "img-property",
        width: 930,
        height: 620,
    },
    {
        src: "/assets/images/section/properties-details-2.jpg",
        alt: "img-property",
        width: 930,
        height: 620,
    },
    {
        src: "/assets/images/section/properties-details-3.jpg",
        alt: "img-property",
        width: 930,
        height: 620,
    },
];

export default function Slide1() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Gallery>
                <div className="properties-thumbs-main position-relative">
                    <Swiper
                        className="swiper tf-sw-location"
                        slidesPerView={3}
                        spaceBetween={10}
                        centeredSlides={true}
                        loop={true}
                        breakpoints={{
                            1200: {
                                slidesPerView: 2.04,
                                spaceBetween: 10,
                            },
                            992: {
                                slidesPerView: 1.6,
                                spaceBetween: 10,
                            },
                            576: {
                                slidesPerView: 1.3,
                                spaceBetween: 10,
                            },
                            0: {
                                slidesPerView: 1.1,
                                spaceBetween: 10,
                            },
                        }}
                        modules={[Pagination, Navigation]}
                        pagination={{ clickable: true, el: ".spb18" }}
                        navigation={{
                            prevEl: ".nav-prev-layout",
                            nextEl: ".nav-next-layout",
                        }}
                    >
                        {propertyImages.map((image, index) => (
                            <SwiperSlide key={index}>
                                <Item
                                    original={image.src}
                                    thumbnail={image.src}
                                    width={image.width}
                                    height={image.height}
                                >
                                    {({ ref, open }) => (
                                        <>
                                            <a
                                                onClick={open}
                                                data-fancybox="gallery"
                                                className="box-img-detail d-block"
                                                tabIndex={0}
                                                role="button"
                                                aria-label={`Open image ${
                                                    index + 1
                                                } in gallery`}
                                            >
                                                <div ref={ref}>
                                                    <Image
                                                        alt={image.alt}
                                                        src={image.src}
                                                        width={image.width}
                                                        height={image.height}
                                                        priority
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            </a>
                                            <div className="wrap-btn d-flex gap_10">
                                                <div className="widget-video">
                                                    <a
                                                        onClick={() =>
                                                            setIsOpen(true)
                                                        }
                                                        data-fancybox="gallery2"
                                                        className="tf-btn tf-btn btn-bg-1 popup-youtube"
                                                    >
                                                        <span className="d-flex align-items-center gap_8">
                                                            <i className="icon-PlayCircle"></i>
                                                            Play Video
                                                        </span>
                                                        <span className="bg-effect"></span>
                                                    </a>
                                                </div>
                                                <a
                                                    onClick={open}
                                                    data-fancybox="gallery"
                                                    className="tf-btn btn-bg-1"
                                                >
                                                    <span className="d-flex align-items-center gap_8">
                                                        <i className="icon-Image"></i>
                                                        View All Photo
                                                    </span>
                                                    <span className="bg-effect"></span>
                                                </a>
                                            </div>
                                        </>
                                    )}
                                </Item>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="sw-dots style-1 spb18 justify-content-center d-flex mt_24 d-lg-none"></div>
                    <div className="sw-button nav-prev-layout lg-hide">
                        <i className="icon-CaretLeft"></i>
                    </div>
                    <div className="sw-button nav-next-layout lg-hide">
                        <i className="icon-CaretRight"></i>
                    </div>
                </div>
            </Gallery>
            <ModalVideo
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                videoId={"XHOmBV4js_E"}
            />
        </>
    );
}
