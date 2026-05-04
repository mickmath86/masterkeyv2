"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";
import Link from "next/link";

// Placeholder avatar initials + colors matching our testimonials
const AVATARS = [
    { initials: "ML", color: "#7c3aed" },
    { initials: "EE", color: "#2563eb" },
    { initials: "TS", color: "#0891b2" },
    { initials: "SS", color: "#16a34a" },
    { initials: "SA", color: "#b45309" },
];

function AvatarGroup() {
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 999,
                padding: "10px 20px 10px 10px",
                marginBottom: 28,
            }}
        >
            {/* Avatar stack */}
            <div style={{ display: "flex", alignItems: "center" }}>
                {AVATARS.map((a, i) => (
                    <div
                        key={i}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: a.color,
                            border: "2.5px solid #fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 12,
                            marginLeft: i === 0 ? 0 : -10,
                            zIndex: AVATARS.length - i,
                            position: "relative",
                            letterSpacing: "0.02em",
                        }}
                    >
                        {a.initials}
                    </div>
                ))}
            </div>

            {/* Text + stars */}
            <div>
                {/* Stars */}
                <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: 600, lineHeight: 1.2 }}>
                    5.0 on Google · 50+ happy clients
                </div>
            </div>
        </div>
    );
}

export default function Hero() {
    return (
        <div className="page-title style-1 sw-layout">
            <div className="tf-container w-1830">
                <div className="content">
                    {/* Social proof — above the fold */}
                    <AvatarGroup />

                    <h1 className="title split-text effect-blur-fade">
                        Discover Your <br /> Perfect Living Spot
                    </h1>
                    <div>
                        <p className="h6 text_secondary-color mb_12 split-text split-lines-transform">
                            This luxurious coastal villa in Malibu boasts
                            sweeping ocean views, modern open-concept design,
                            and refined elegance throughout.
                        </p>
                        <p className="h6 text_secondary-color mb_24 split-text split-lines-transform">
                            Relax with an infinity pool, vibrant gardens, and
                            private beach access for the ultimate seaside
                            retreat.
                        </p>
                        <Link
                            href={"/listing-half-map-grid"}
                            className="tf-btn btn-px-32 btn-bg-1"
                        >
                            <span>View Properties</span>
                            <span className="bg-effect"></span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="thumbs effect-content-slide">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: ".nav-next-layout",
                        prevEl: ".nav-prev-layout",
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    spaceBetween={10}
                    loop={true}
                    className="swiper"
                >
                    <SwiperSlide>
                        <div className="slide-inner effect-img-zoom">
                            <Image
                                className="img-zoom"
                                src="/assets/images/home/ww-hero-1.png"
                                width={1920}
                                height={680}
                                alt="page-title"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-inner effect-img-zoom">
                            <Image
                                className="img-zoom"
                                src="/assets/images/home/lr-hero.png"
                                width={1920}
                                height={680}
                                alt="page-title"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                    <div className="sw-button nav-prev-layout">
                        <i className="icon-CaretLeft"></i>
                    </div>
                    <div className="sw-button nav-next-layout">
                        <i className="icon-CaretRight"></i>
                    </div>
                </Swiper>
            </div>

            <SidebarFilterDefault />
        </div>
    );
}
