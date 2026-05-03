import Image from "next/image";
import React, { useState } from "react";
import { Autoplay, EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "../common/ModalVideo";

export default function Slide2() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const images = [
        {
            src: "/assets/images/section/properties-details-11.jpg",
            alt: "images",
            width: 1200,
            height: 675,
        },
        {
            src: "/assets/images/section/properties-details-12.jpg",
            alt: "images",
            width: 1200,
            height: 675,
        },
        {
            src: "/assets/images/section/properties-details-13.jpg",
            alt: "images",
            width: 1200,
            height: 675,
        },
        {
            src: "/assets/images/section/properties-details-14.jpg",
            alt: "images",
            width: 1200,
            height: 675,
        },
        {
            src: "/assets/images/section/properties-details-15.jpg",
            alt: "images",
            width: 1200,
            height: 675,
        },
    ];
    const thumbnails = [
        {
            src: "/assets/images/section/tbumb-pagi-1.jpg",
            alt: "images",
            width: 100,
            height: 100,
        },
        {
            src: "/assets/images/section/tbumb-pagi-2.jpg",
            alt: "images",
            width: 100,
            height: 100,
        },
        {
            src: "/assets/images/section/tbumb-pagi-3.jpg",
            alt: "images",
            width: 100,
            height: 100,
        },
        {
            src: "/assets/images/section/tbumb-pagi-4.jpg",
            alt: "images",
            width: 100,
            height: 100,
        },
        {
            src: "/assets/images/section/tbumb-pagi-5.jpg",
            alt: "images",
            width: 100,
            height: 100,
        },
    ];
    const thumbProps = {
        spaceBetween: 14,
        slidesPerView: "auto" as const,
        freeMode: true,
        watchSlidesProgress: true,
        direction: "vertical" as const,
        breakpoints: {
            375: {
                slidesPerView: 3,
                spaceBetween: 14,
            },
            500: {
                slidesPerView: "auto" as const,
            },
        },
    };
    const props = {
        spaceBetween: 16,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 500,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
    };
    return (
        <>
            <PhotoSwipeGallery>
                <div className="wrap-thumb">
                    <Swiper
                        modules={[Thumbs, Autoplay, EffectFade, Navigation]}
                        thumbs={{ swiper: thumbsSwiper }}
                        navigation={{
                            prevEl: ".sw-thumbs-prev",
                            nextEl: ".sw-thumbs-next",
                        }}
                        className="swiper sw-single"
                        {...props}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="thumb-main">
                                    <Item
                                        original={image.src}
                                        thumbnail={image.src}
                                        width={1200}
                                        height={675}
                                    >
                                        {({ ref, open }) => (
                                            <div className="thumb-main">
                                                <a
                                                    onClick={open}
                                                    data-fancybox="gallery"
                                                >
                                                    <Image
                                                        alt={image.alt}
                                                        src={image.src}
                                                        ref={ref}
                                                        width={image.width}
                                                        height={image.height}
                                                        priority
                                                    />
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
                                            </div>
                                        )}
                                    </Item>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="sw-button sw-thumbs-prev lg-hide">
                    <i className="icon-CaretLeft"></i>
                </div>
                <div className="sw-button sw-thumbs-next lg-hide">
                    <i className="icon-CaretRight"></i>
                </div>
                <div className="wrap-pagi">
                    <Swiper
                        {...thumbProps}
                        modules={[Thumbs]}
                        onSwiper={(swiper) => setThumbsSwiper(swiper)}
                        className="swiper thumbs-sw-pagi"
                    >
                        {thumbnails.map((thumb, index) => (
                            <SwiperSlide key={index}>
                                <div className="image-detail">
                                    <Image
                                        alt={thumb.alt}
                                        src={thumb.src}
                                        width={thumb.width}
                                        height={thumb.height}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </PhotoSwipeGallery>
            <ModalVideo
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                videoId={"XHOmBV4js_E"}
            />
        </>
    );
}
