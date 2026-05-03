"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "../common/ModalVideo";

export default function GallerySection() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <PhotoSwipeGallery>
                <div className="tf-grid-layout md-col-2 gap_20">
                    <Item
                        original="/assets/images/section/properties-gallery-1.jpg"
                        thumbnail="/assets/images/section/properties-gallery-1.jpg"
                        width={635}
                        height={635}
                    >
                        {({ ref, open }) => (
                            <div className="img-style position-relative">
                                <a onClick={open} data-fancybox="gallery">
                                    <Image
                                        src="/assets/images/section/properties-gallery-1.jpg"
                                        width={635}
                                        ref={ref}
                                        height={635}
                                        alt="gallery"
                                    />
                                </a>
                                <div className="wrap-btn d-flex gap_10">
                                    <div className="widget-video">
                                        <a
                                           onClick={() => setIsOpen(true)}
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

                    <div>
                        <div className="wrap-img d-flex gap_20 mb_20">
                            <Item
                                original="/assets/images/section/properties-gallery-2.jpg"
                                thumbnail="/assets/images/section/properties-gallery-2.jpg"
                                width={308}
                                height={308}
                            >
                                {({ ref, open }) => (
                                    <div className="img-style position-relative">
                                        <a
                                            onClick={open}
                                            data-fancybox="gallery"
                                        >
                                            <Image
                                                src="/assets/images/section/properties-gallery-2.jpg"
                                                width={308}
                                                ref={ref}
                                                height={308}
                                                alt="gallery"
                                            />
                                        </a>
                                    </div>
                                )}
                            </Item>

                            <Item
                                original="/assets/images/section/properties-gallery-3.jpg"
                                thumbnail="/assets/images/section/properties-gallery-3.jpg"
                                width={308}
                                height={308}
                            >
                                {({ ref, open }) => (
                                    <div className="img-style position-relative">
                                        <a
                                            onClick={open}
                                            data-fancybox="gallery"
                                        >
                                            <Image
                                                src="/assets/images/section/properties-gallery-3.jpg"
                                                width={308}
                                                ref={ref}
                                                height={308}
                                                alt="gallery"
                                            />
                                        </a>
                                    </div>
                                )}
                            </Item>
                        </div>
                        <div className="wrap-img d-flex gap_20">
                        <Item
                                original="/assets/images/section/properties-gallery-4.jpg"
                                thumbnail="/assets/images/section/properties-gallery-4.jpg"
                                width={308}
                                height={308}
                            >
                                {({ ref, open }) => (
                                    <div className="img-style position-relative">
                                        <a
                                            onClick={open}
                                            data-fancybox="gallery"
                                        >
                                            <Image
                                                src="/assets/images/section/properties-gallery-4.jpg"
                                                width={308}
                                                ref={ref}
                                                height={308}
                                                alt="gallery"
                                            />
                                        </a>
                                    </div>
                                )}
                            </Item>
                            <Item
                                original="/assets/images/section/properties-gallery-5.jpg"
                                thumbnail="/assets/images/section/properties-gallery-5.jpg"
                                width={308}
                                height={308}
                            >
                                {({ ref, open }) => (
                                    <div className="img-style position-relative">
                                        <a
                                            onClick={open}
                                            data-fancybox="gallery"
                                        >
                                            <Image
                                                src="/assets/images/section/properties-gallery-5.jpg"
                                                width={308}
                                                ref={ref}
                                                height={308}
                                                alt="gallery"
                                            />
                                        </a>
                                    </div>
                                )}
                            </Item>
                        </div>
                    </div>
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
