import Image from "next/image";
import React from "react";

// ── City data — top-priced active residential listing per city, confirmed image ──
// Images are served from cdn.repliers.io and already allowlisted in next.config.ts

const CDN = "https://cdn.repliers.io";

const CITIES = [
    {
        city: "Thousand Oaks",
        mls: "226001520",
        price: 34900000,
        count: 87,
        img: `${CDN}/crmls/IMG-226001520_1.jpg?class=large`,
    },
    {
        city: "Camarillo",
        mls: "25553301",
        price: 7395000,
        count: 206,
        img: `${CDN}/crmls/IMG-25553301_1.jpg?class=large`,
    },
    {
        city: "Westlake Village",
        mls: "26635229",
        price: 14995000,
        count: 9,
        img: `${CDN}/crmls/IMG-26635229_1.jpg?class=large`,
    },
    {
        city: "Ventura",
        mls: "V1-29710",
        price: 7900000,
        count: 211,
        img: `${CDN}/crmls/IMG-V1-29710_1.jpg?class=large`,
    },
    {
        city: "Oxnard",
        mls: "V1-33422",
        price: 6995000,
        count: 209,
        img: `${CDN}/crmls/IMG-V1-33422_1.jpg?class=large`,
    },
    {
        city: "Newbury Park",
        mls: "226001943",
        price: 3875000,
        count: 93,
        img: `${CDN}/crmls/IMG-226001943_1.jpg?class=large`,
    },
    {
        city: "Simi Valley",
        mls: "V1-29390",
        price: 4799000,
        count: 149,
        img: `${CDN}/crmls/IMG-V1-29390_1.jpg?class=large`,
    },
    {
        city: "Moorpark",
        mls: "V1-35585",
        price: 12750000,
        count: 33,
        img: `${CDN}/crmls/IMG-V1-35585_1.jpg?class=large`,
    },
    {
        city: "Agoura Hills",
        mls: "25615621",
        price: 7950000,
        count: 55,
        img: `${CDN}/crmls/IMG-25615621_1.jpg?class=large`,
    },
    {
        city: "Calabasas",
        mls: "26653489",
        price: 16799000,
        count: 79,
        img: `${CDN}/crmls/IMG-26653489_1.jpg?class=large`,
    },
];

// ── Card ──────────────────────────────────────────────────────────────────

function CityCard({
    city,
    img,
    count,
    wide = false,
    delay = "0.2",
}: {
    city: string;
    img: string;
    count: number;
    wide?: boolean;
    delay?: string;
}) {
    const href = `/listing-half-map-grid?city=${encodeURIComponent(city)}`;

    return (
        <div
            className="location-item hover-image scrolling-effect effectFade"
            data-delay={delay}
            style={wide ? undefined : { flex: "1 1 0", minWidth: 0 }}
        >
            <a href={href} className="img-style mb_18">
                <div style={{ position: "relative", width: "100%", height: 300, borderRadius: 12, overflow: "hidden" }}>
                    <Image
                        src={img}
                        alt={`${city}, CA homes for sale`}
                        fill
                        unoptimized
                        sizes={wide ? "630px" : "300px"}
                        style={{ objectFit: "cover", objectPosition: "center" }}
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
    const [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9] = CITIES;

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
                    {/* Row 1: [small, small] | [wide] */}
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <CityCard {...c0} delay="0.2" />
                            <CityCard {...c1} delay="0.3" />
                        </div>
                        <CityCard {...c2} wide delay="0.4" />
                    </div>

                    {/* Row 2: [wide] | [small, small] */}
                    <div className="tf-grid-layout lg-col-2">
                        <CityCard {...c3} wide delay="0.4" />
                        <div className="d-flex gap_30">
                            <CityCard {...c4} delay="0.3" />
                            <CityCard {...c5} delay="0.2" />
                        </div>
                    </div>

                    {/* Row 3: [small, small] | [wide] */}
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <CityCard {...c6} delay="0.2" />
                            <CityCard {...c7} delay="0.3" />
                        </div>
                        <CityCard {...c8} wide delay="0.4" />
                    </div>

                    {/* Row 4: [wide] | spacer */}
                    <div className="tf-grid-layout lg-col-2">
                        <CityCard {...c9} wide delay="0.4" />
                        <div className="d-flex gap_30" style={{ visibility: "hidden", pointerEvents: "none" }}>
                            <div style={{ flex: "1 1 0" }} />
                            <div style={{ flex: "1 1 0" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
