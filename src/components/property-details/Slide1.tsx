"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "photoswipe/dist/photoswipe.css";
import "swiper/css/navigation";
import ModalVideo from "../common/ModalVideo";
import type { ListingDetail } from "@/types/listing";

type Props = {
    listing: ListingDetail;
};

function extractYouTubeId(url: string): string | null {
    if (!url) return null;
    // handles youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
    const patterns = [
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pat of patterns) {
        const match = url.match(pat);
        if (match) return match[1];
    }
    return null;
}

export default function Slide1({ listing }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const images = listing.images?.length
        ? listing.images
        : [listing.imgSrc || "/assets/images/home/home-1.jpg"];

    const videoId = listing.videoUrl ? extractYouTubeId(listing.videoUrl) : null;
    const hasVideo = !!videoId;

    return (
        <>
            <Gallery>
                <div className="properties-thumbs-main position-relative">
                    <Swiper
                        className="swiper tf-sw-location"
                        centeredSlides={true}
                        loop={images.length > 1}
                        breakpoints={{
                            1200: { slidesPerView: 2.04, spaceBetween: 10 },
                            992:  { slidesPerView: 1.6,  spaceBetween: 10 },
                            576:  { slidesPerView: 1.3,  spaceBetween: 10 },
                            0:    { slidesPerView: 1.1,  spaceBetween: 10 },
                        }}
                        modules={[Pagination, Navigation]}
                        pagination={{ clickable: true, el: ".spb18" }}
                        navigation={{
                            prevEl: ".nav-prev-layout",
                            nextEl: ".nav-next-layout",
                        }}
                    >
                        {images.map((src, index) => (
                            <SwiperSlide key={index}>
                                <Item
                                    original={src}
                                    thumbnail={src}
                                    width={930}
                                    height={620}
                                >
                                    {({ ref, open }) => (
                                        <>
                                            <a
                                                onClick={open}
                                                data-fancybox="gallery"
                                                className="box-img-detail d-block"
                                                tabIndex={0}
                                                role="button"
                                                aria-label={`Open image ${index + 1} in gallery`}
                                            >
                                                <div ref={ref}>
                                                    <Image
                                                        alt={listing.alt || `Property image ${index + 1}`}
                                                        src={src}
                                                        width={930}
                                                        height={620}
                                                        priority={index === 0}
                                                        unoptimized
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                </div>
                                            </a>
                                            {/* Buttons only render on the first slide */}
                                            {index === 0 && (
                                                <div className="wrap-btn d-flex gap_10">
                                                    {hasVideo && (
                                                        <div className="widget-video">
                                                            <a
                                                                onClick={() => setIsOpen(true)}
                                                                className="tf-btn tf-btn btn-bg-1 popup-youtube"
                                                                role="button"
                                                            >
                                                                <span className="d-flex align-items-center gap_8">
                                                                    <i className="icon-PlayCircle"></i>
                                                                    Play Video
                                                                </span>
                                                                <span className="bg-effect"></span>
                                                            </a>
                                                        </div>
                                                    )}
                                                    <a
                                                        onClick={open}
                                                        data-fancybox="gallery"
                                                        className="tf-btn btn-bg-1"
                                                        role="button"
                                                    >
                                                        <span className="d-flex align-items-center gap_8">
                                                            <i className="icon-Image"></i>
                                                            View All {images.length} Photos
                                                        </span>
                                                        <span className="bg-effect"></span>
                                                    </a>
                                                </div>
                                            )}
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

            {hasVideo && videoId && (
                <ModalVideo
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    videoId={videoId}
                />
            )}
        </>
    );
}
