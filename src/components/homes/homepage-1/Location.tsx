import Image from "next/image";
import React from "react";

// ── City data — static images from public folder ──

const CITIES = [
    {
        city: "Thousand Oaks",
        count: 87,
        img: "/assets/images/home/Thousand-Oaks.png",
    },
    {
        city: "Ventura",
        count: 211,
        img: "/assets/images/home/Ventura.png",
    },
    {
        city: "Westlake Village",
        count: 9,
        img: "/assets/images/home/Westlake.png",
    },
    {
        city: "Oxnard",
        count: 9,
        img: "/assets/images/home/Oxnard.png",
    },
    {
        city: "Calabasas",
        count: 9,
        img: "/assets/images/home/Calabasas.png",
    },
];


// ── Card ──────────────────────────────────────────────────────────────────

function CityCard({
    city,
    img,
    count,
    wide = false,
    delay = "0.2",
    idx = 0,
}: {
    city: string;
    img: string;
    count: number;
    wide?: boolean;
    delay?: string;
    idx?: number;
}) {
    const href = `/listing-half-map-grid?city=${encodeURIComponent(city)}`;

    return (
        <div
            className="location-item hover-image scrolling-effect effectFade"
            data-delay={delay}
        >
            <a href={href} className="img-style mb_18" style={{ display: "block" }}>
                <div style={{ 
                    position: "relative", 
                    width: "100%", 
                    height: 300,
                    minHeight: 300,
                    borderRadius: 12, 
                    overflow: "hidden",
                    backgroundColor: "#f3f4f6"
                }}>
                    <Image
                        src={img}
                        alt={`${city}, CA homes for sale`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        priority={idx === 0}
                    />
                </div>
            </a>
            <div className="content">
                <a href={href} className="mb_4 link h5 text_primary-color">
                    {city}, CA
                </a>
                <p>{count} {count === 1 ? "Property" : "Properties"}</p>
            </div>
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function Location() {
    return (
        <div className="section-location tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Explore Cities
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Our Location For You
                    </h3>
                </div>

                <div className="wrap-location">
                    <div className="tf-grid-layout lg-col-3 md-col-2">
                        {CITIES.map((city, index) => (
                            <CityCard
                                key={city.city}
                                {...city}
                                idx={index}
                                delay={`${0.2 + index * 0.1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
