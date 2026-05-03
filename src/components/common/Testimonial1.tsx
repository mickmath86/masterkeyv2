"use client";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AutoRepeatMarquee from "./AutoRepeatMarquee";
import Image from "next/image";

export default function Testimonial1() {
    const testimonial = [
        {
            id: 1,
            rating: 5,
            text: "“This platform made property investing so much easier. I found two great rentals in just a few months and both are already performing better than expected.”",
            avatar: "/assets/images/avatar/avatar-4.jpg",
            name: "Liam Anderson",
            position: "CEO Digital Avitex",
        },
        {
            id: 2,
            rating: 5,
            text: "“As a first-time buyer, I felt guided every step of the way. Found my dream home fast and the support team was always there to answer my questions.”",
            avatar: "/assets/images/avatar/avatar-5.jpg",
            name: "Adam Will",
            position: "CEO Agency Avitex",
        },
        {
            id: 3,
            rating: 5,
            text: "“My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation.”",
            avatar: "/assets/images/avatar/avatar-6.jpg",
            name: "Liam Anderson",
            position: "CEO Digital Avitex",
        },
        {
            id: 4,
            rating: 5,
            text: "“Professional, reliable, and efficient. They guided me through every step and made the entire process stress-free.”",
            avatar: "/assets/images/avatar/avatar-7.jpg",
            name: "Liam Anderson",
            position: "CEO Digital Avitex",
        },
    ];

    const brands = [
        { src: "/assets/images/logo/brand-1.png", alt: "brand 1" },
        { src: "/assets/images/logo/brand-2.png", alt: "brand 2" },
        { src: "/assets/images/logo/brand-3.png", alt: "brand 3" },
        { src: "/assets/images/logo/brand-4.png", alt: "brand 4" },
        { src: "/assets/images/logo/brand-5.png", alt: "brand 5" },
        { src: "/assets/images/logo/brand-6.png", alt: "brand 6" }, 
    ];

    return (
        <>
            <div className="heading-section justify-content-center text-center mb_40">
                <span className="sub text-uppercase fw-6 text_secondary-color-2">
                    Our Testimonials
                </span>
                <h3 className="split-text effect-blur-fade">What’s People Say’s</h3>
            </div>
            <div className="tf-container">
                <Swiper
                    className="swiper tf-sw-location"
                    slidesPerView={3}
                    spaceBetween={10}
                    breakpoints={{
                        991: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    pagination={{
                        clickable: true,
                        el: ".sw-pagination-layout",
                    }}
                >
                    {testimonial.map((tes) => (
                        <SwiperSlide key={tes.id}>
                            <div className="testimonial-item">
                                <div>
                                    <ul className="ratings d-flex mb_12">
                                        {[...Array(tes.rating)].map((_, i) => (
                                            <li key={i}>
                                                <i className="icon-favorite_major"></i>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text_primary-color text-body-1 mb_23">
                                        {tes.text}
                                    </p>
                                </div>
                                <div className="author d-flex gap_12 align-items-center">
                                    <div className="avatar">
                                        <Image
                                            src={tes.avatar}
                                            width={60}
                                            height={60}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="info">
                                        <a
                                            href="#"
                                            className="h6 text_primary-color name link mb_4"
                                        >
                                            {tes.name}
                                        </a>
                                        <p>{tes.position}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="sw-dots style-1 sw-pagination-layout justify-content-center d-flex mt_24"></div>
            </div>
            <div className="wrap-infiniteslide">
                <AutoRepeatMarquee  speed={50} pauseOnHover>
                    {brands.map((brand, idx) => (
                        <div className="marquee-item" key={idx}>
                            <div className="brand">
                                <img src={brand.src} alt={brand.alt} />
                            </div>
                        </div>
                    ))}
                </AutoRepeatMarquee>
            </div>
        </>
    );
}
