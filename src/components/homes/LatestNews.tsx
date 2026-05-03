"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { latestNews } from "@/data/blog";
import Link from "next/link";

export default function LatestNews() {
    return (
        <div className="sw-layout tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Latest New
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Helpful Luminor Guides
                    </h3>
                </div>
                <Swiper
                    className="mySwiper"
                    data-wow-delay=".2s"
                    spaceBetween={15}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Pagination]}
                    pagination={{ clickable: true, el: ".spb7" }}
                >
                    {latestNews.slice(0, 3).map((item, ind) => (
                        <SwiperSlide className="swiper-slide" key={ind}>
                            <div
                                className="blog-article-item style-default hover-image-translate loadItem"
                                key={item.id}
                            >
                                <div className="article-thumb image-wrap mb_24">
                                    <Image
                                        loading="lazy"
                                        src={item.imgSrc}
                                        width={850}
                                        height={478}
                                        alt={item.alt}
                                    />
                                    <Link
                                        href={`/blog-post-1/${item.id}`}
                                        className="tag text-label text text_primary-color text-uppercase"
                                    >
                                        {item.category}
                                    </Link>
                                    <Link
                                        href={`/blog-post-1/${item.id}`}
                                        className="overlay-link"
                                    ></Link>
                                </div>
                                <div className="article-content">
                                    <div className="meta-post d-flex align-items-center mb_12">
                                        <div className="item text_secondary-color text-caption-1">
                                            Post By{" "}
                                            <Link
                                                href="#"
                                                className="link text_primary-color"
                                            >
                                                {item.author}
                                            </Link>
                                        </div>
                                        <div className="item text_secondary-color text-caption-1">
                                            {item.date}
                                        </div>
                                    </div>
                                    <h5 className="title mb_12">
                                        <Link
                                            href={`/blog-post-1/${item.id}`}
                                            className="hover-line-text"
                                        >
                                            {item.title}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="sw-pagination spb7 sw-dots style-1 text-center mt_24" />
                </Swiper>
            </div>
        </div>
    );
}
