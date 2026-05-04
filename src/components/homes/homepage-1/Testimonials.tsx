"use client";
import React from "react";
import { SwiperClass, Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Controller } from "swiper/modules";

type Testimonial = {
    name: string;
    title: string;
    source: string;
    text: string;
    rating: number;
    initials: string;
    color: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Maria LaCanfora",
        title: "First-Time Home Buyer",
        source: "Instagram",
        text: "My husband and I had an absolutely amazing experience working with Mark at MasterKey. From the very beginning, Mark went above and beyond to understand our needs and find a home that was the perfect fit for us. As first-time home buyers, we started out feeling overwhelmed, but Mark quickly put us at ease. He walked us through every step, explaining things clearly and thoughtfully. What could have been a stressful experience turned into an exciting and positive journey.",
        rating: 5,
        initials: "ML",
        color: "#7c3aed",
    },
    {
        name: "Eric Etebari",
        title: "Property Owner · Malibu / Ventura County",
        source: "Facebook",
        text: "Working with Mark, Mike, and Keith at MasterKey has been a great experience. Navigating a sale in Malibu can feel overwhelming, but their team has made everything clear and easy to understand. They came in with a thoughtful strategy, strong local knowledge, and communication that actually makes you feel supported. They know what they're doing and genuinely care about getting the best outcome.",
        rating: 5,
        initials: "EE",
        color: "#2563eb",
    },
    {
        name: "Todd Shillington",
        title: "Property Owner",
        source: "LinkedIn",
        text: "MasterKey is an amazing company. Their talent extends well past property management into construction and Real Estate Brokerage as well. They gave me all the consulting I needed to help me get the highest return I could ask for on my property. Highly recommend!!",
        rating: 5,
        initials: "TS",
        color: "#0891b2",
    },
    {
        name: "Steve Scherer",
        title: "Real Estate Client",
        source: "Google",
        text: "I always got the information I needed, and they were totally upfront about everything. Plus, their honesty and integrity made the whole process so much smoother. I highly recommend them!",
        rating: 5,
        initials: "SS",
        color: "#16a34a",
    },
    {
        name: "Samir Akhter",
        title: "Real Estate Client",
        source: "Google",
        text: "Mark was very professional to work with. Always responsive and straightforward. It was a pleasure working with the team. Would highly recommend.",
        rating: 5,
        initials: "SA",
        color: "#b45309",
    },
    {
        name: "Olivia Sellers",
        title: "Property Owner",
        source: "Google",
        text: "The team was quick to respond and handle maintenance issues and kept the property in great shape.",
        rating: 5,
        initials: "OS",
        color: "#be185d",
    },
    {
        name: "Kevin Marsden",
        title: "Real Estate Client",
        source: "LinkedIn",
        text: "Professional and excellent service. I highly recommend. The Mathias team can help you out with all your real estate and management needs.",
        rating: 5,
        initials: "KM",
        color: "#0f766e",
    },
    {
        name: "Javier Aguilera",
        title: "Property Management Client",
        source: "Google",
        text: "I highly recommend them not only as property managers but as brokers as well.",
        rating: 5,
        initials: "JA",
        color: "#7c3aed",
    },
    {
        name: "Mark Foley",
        title: "Long-Term Stay · Ventura",
        source: "Instagram",
        text: "Mark was incredibly kind and helpful during our long stay in Ventura. He was quick to answer any questions we had and offer suggestions for areas to explore. The apartment was clean and well-stocked with all we could need for a 6-month stay. I highly recommend working with Mark!",
        rating: 5,
        initials: "MF",
        color: "#2563eb",
    },
];

// Source badge icon
function SourceBadge({ source }: { source: string }) {
    const map: Record<string, { label: string; color: string; bg: string }> = {
        Google: { label: "Google", color: "#4285F4", bg: "#eff6ff" },
        LinkedIn: { label: "LinkedIn", color: "#0a66c2", bg: "#eff6ff" },
        Facebook: { label: "Facebook", color: "#1877f2", bg: "#eff6ff" },
        Instagram: { label: "Instagram", color: "#e1306c", bg: "#fff0f5" },
    };
    const s = map[source] || { label: source, color: "#6b7280", bg: "#f3f4f6" };
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: s.bg,
                color: s.color,
                borderRadius: 999,
                padding: "3px 12px",
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 20,
            }}
        >
            ★ {s.label}
        </span>
    );
}

// Avatar initials circle
function Avatar({ initials, color, size = 56 }: { initials: string; color: string; size?: number }) {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: size * 0.32,
                flexShrink: 0,
                letterSpacing: "0.03em",
            }}
        >
            {initials}
        </div>
    );
}

export default function Testimonials() {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(null);
    const [mainSwiper, setMainSwiper] = React.useState<SwiperClass | null>(null);

    return (
        <div className="section-testimonials">
            <div className="tf-container">
                <div className="testimonial-item style-1 flat-thumbs-tes">
                    <div className="row">
                        {/* Left — text content */}
                        <div className="col-lg-6">
                            <Swiper
                                modules={[Thumbs, Pagination, Controller]}
                                onSwiper={setThumbsSwiper}
                                controller={{ control: mainSwiper }}
                                pagination={{
                                    el: ".sw-pagination-tes",
                                    clickable: true,
                                }}
                                spaceBetween={10}
                                className="tf-thumb-tes"
                            >
                                {testimonials.map((t, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="content">
                                            <div className="heading mb_28">
                                                <span className="sub text-label text_secondary-color-2 text-uppercase">
                                                    Testimonials
                                                </span>
                                                <p className="h3 text_primary-color" style={{ marginBottom: 4 }}>
                                                    {t.name}
                                                </p>
                                                <p>{t.title}</p>
                                            </div>
                                            <SourceBadge source={t.source} />
                                            <ul className="ratings d-flex mb_28">
                                                {Array.from({ length: t.rating }).map((_, i) => (
                                                    <li key={i}>
                                                        <i className="icon-favorite_major"></i>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="desc text_primary-color fw-5 h5">
                                                &ldquo;{t.text}&rdquo;
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Right — avatar cards */}
                        <div className="col-lg-6">
                            <Swiper
                                modules={[Navigation, Thumbs, Controller]}
                                onSwiper={setMainSwiper}
                                controller={{ control: thumbsSwiper }}
                                navigation={{
                                    nextEl: ".nav-next-tes",
                                    prevEl: ".nav-prev-tes",
                                }}
                                spaceBetween={10}
                                className="tf-tes-main"
                            >
                                {testimonials.map((t, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div
                                            className="img-style"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "100%",
                                                minHeight: 360,
                                                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                                                borderRadius: 16,
                                            }}
                                        >
                                            <div style={{ textAlign: "center", padding: "48px 40px" }}>
                                                <Avatar initials={t.initials} color={t.color} size={96} />
                                                <div style={{ marginTop: 20 }}>
                                                    <div
                                                        style={{
                                                            fontWeight: 800,
                                                            fontSize: 20,
                                                            color: "#111827",
                                                            marginBottom: 6,
                                                        }}
                                                    >
                                                        {t.name}
                                                    </div>
                                                    <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
                                                        {t.title}
                                                    </div>
                                                    {/* Stars */}
                                                    <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 16 }}>
                                                        {Array.from({ length: t.rating }).map((_, i) => (
                                                            <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <SourceBadge source={t.source} />
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="sw-button style-border nav-prev-tes xl-hide">
                            <i className="icon-CaretLeft"></i>
                        </div>
                        <div className="sw-button style-border nav-next-tes xl-hide">
                            <i className="icon-CaretRight"></i>
                        </div>
                    </div>
                    <div className="sw-dots style-1 sw-pagination-tes justify-content-center mt_24"></div>
                </div>
            </div>
        </div>
    );
}
