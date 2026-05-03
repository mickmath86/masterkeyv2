"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import ModalVideo from "../common/ModalVideo";

const hoverActive = (): void => {
    const containers = document.querySelectorAll<HTMLElement>(
        ".wrap-box-hover-active"
    );
    containers.forEach((container, index) => {
        const containerId = `hover-container-${index}`;
        container.setAttribute("data-hover-id", containerId);
        const hoverItems =
            container.querySelectorAll<HTMLElement>(".item-hover");

        if (
            container.querySelectorAll(".item-hover.is-active").length === 0 &&
            hoverItems.length > 0
        ) {
            hoverItems[0].classList.add("is-active");
        }

        hoverItems.forEach((item) => {
            item.addEventListener("mouseenter", function () {
                const activeItem = container.querySelector<HTMLElement>(
                    ".item-hover.is-active"
                );
                if (activeItem && activeItem !== item) {
                    activeItem.classList.remove("is-active");
                }
                item.classList.add("is-active");
            });
        });
    });
};

export default function Gallery2() {
    const [isOpen, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setTimeout(() => {
                hoverActive();
            }, 0);
        }
    }, [isMobile]);

    const images = [
        {
            src: "/assets/images/section/properties-details-5.jpg",
            alt: "images",
            width: 620,
            height: 465,
        },
        {
            src: "/assets/images/section/properties-details-6.jpg",
            alt: "images",
            width: 620,
            height: 465,
        },
        {
            src: "/assets/images/section/properties-details-7.jpg",
            alt: "images",
            width: 620,
            height: 465,
        },
        {
            src: "/assets/images/section/properties-details-8.jpg",
            alt: "images",
            width: 620,
            height: 465,
        },
        {
            src: "/assets/images/section/properties-details-9.jpg",
            alt: "images",
            width: 620,
            height: 465,
        },
        {
            src: "/assets/images/section/properties-details-10.jpg",
            alt: "images",
            width: 620,
            height: 465,
        },
    ];

    return (
        <>
            <PhotoSwipeGallery>
                <div className="wrap-thumbs">
                    {isMobile ? (
                        <div>
                            <Swiper
                                modules={[Pagination]}
                                pagination={{
                                    el: ".sw-pagination-mb",
                                    clickable: true,
                                }}
                                className="wrap-box-hover-active"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className="thumb-main-2 swiper-slide item-hover"
                                    >
                                        <GalleryItem
                                            image={image}
                                            setOpen={setOpen}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="sw-dots style-1 sw-pagination-mb justify-content-center d-flex mt_24 d-md-none"></div>
                        </div>
                    ) : (
                        <div className="wrap-box-hover-active d-flex grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="thumb-main-2 item-hover"
                                >
                                    <GalleryItem
                                        image={image}
                                        setOpen={setOpen}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </PhotoSwipeGallery>

            <ModalVideo
                setIsOpen={setOpen}
                isOpen={isOpen}
                videoId={"XHOmBV4js_E"}
            />
        </>
    );
}

interface GalleryImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const GalleryItem = ({
    image,
    setOpen,
}: {
    image: GalleryImage;
    setOpen: (open: boolean) => void;
}) => (
    <Item original={image.src} thumbnail={image.src} width={620} height={465}>
        {({ ref, open }) => (
            <div>
                <a onClick={open} data-fancybox="gallery" className="img-style">
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
                            onClick={() => setOpen(true)}
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
);
