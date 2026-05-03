"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type CityData = {
    city: string;
    coverImageUrl: string | null;
    count: number;
};

// ── Cities ─────────────────────────────────────────────────────────────────

const CITIES = [
    "Thousand Oaks",
    "Camarillo",
    "Westlake Village",
    "Ventura",
    "Oxnard",
    "Newbury Park",
    "Simi Valley",
    "Moorpark",
    "Agoura Hills",
    "Calabasas",
];

// ── Fetch one city via the existing /api/listings proxy ────────────────────

async function fetchCity(city: string): Promise<CityData> {
    try {
        const params = new URLSearchParams({
            city,
            state: "CA",
            status: "A",
            type: "sale",
            propertyType: "Residential",
            hasImages: "true",
            sortBy: "listPriceDesc",
            resultsPerPage: "1",
            fields: "mlsNumber,listPrice,images[1]",
        });

        const res = await fetch(`/api/listings?${params.toString()}`);
        if (!res.ok) return { city, coverImageUrl: null, count: 0 };

        const data = await res.json();
        const listing = data.listings?.[0];
        const imagePath: string | undefined = listing?.images?.[0];

        let coverImageUrl: string | null = null;
        if (imagePath) {
            coverImageUrl = imagePath.startsWith("http")
                ? imagePath
                : `https://cdn.repliers.io/${imagePath}?class=large`;
        }

        return {
            city,
            coverImageUrl,
            count: data.count ?? 0,
        };
    } catch {
        return { city, coverImageUrl: null, count: 0 };
    }
}

// ── Skeleton card shown while loading ──────────────────────────────────────

function SkeletonCard({ wide = false }: { wide?: boolean }) {
    return (
        <div
            style={{
                flex: wide ? undefined : "1 1 0",
                minWidth: 0,
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: 300,
                    borderRadius: 12,
                    background: "linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.4s infinite",
                    marginBottom: 18,
                }}
            />
            <div style={{ height: 20, width: "60%", borderRadius: 6, background: "#e8e8e8", marginBottom: 8 }} />
            <div style={{ height: 14, width: "40%", borderRadius: 6, background: "#f0f0f0" }} />
            <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        </div>
    );
}

// ── Single city card ───────────────────────────────────────────────────────

function CityCard({
    data,
    wide = false,
    delay = "0.2",
}: {
    data: CityData;
    wide?: boolean;
    delay?: string;
}) {
    const href = `/listing-half-map-grid?city=${encodeURIComponent(data.city)}`;
    const countLabel =
        data.count > 0
            ? `${data.count} ${data.count === 1 ? "Property" : "Properties"}`
            : "View Listings";

    return (
        <div
            className="location-item hover-image scrolling-effect effectFade"
            data-delay={delay}
            style={wide ? undefined : { flex: "1 1 0", minWidth: 0 }}
        >
            <a href={href} className="img-style mb_18">
                {/* Fixed-height container — image fills and is cropped to fit */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: 300,
                        borderRadius: 12,
                        overflow: "hidden",
                    }}
                >
                    {data.coverImageUrl ? (
                        <Image
                            src={data.coverImageUrl}
                            alt={`${data.city} homes`}
                            fill
                            unoptimized
                            sizes={wide ? "630px" : "300px"}
                            style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                background:
                                    "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span
                                style={{
                                    color: "#e4e95b",
                                    fontSize: 18,
                                    fontWeight: 700,
                                    fontFamily: "Manrope, sans-serif",
                                    letterSpacing: "0.04em",
                                    textAlign: "center",
                                    padding: "0 16px",
                                }}
                            >
                                {data.city}
                            </span>
                        </div>
                    )}
                </div>
            </a>
            <div className="content">
                <a href={href} className="mb_4 link h5 text_primary-color">
                    {data.city}, CA
                </a>
                <p>{countLabel}</p>
            </div>
        </div>
    );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function Location() {
    const [cityData, setCityData] = useState<CityData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all(CITIES.map(fetchCity))
            .then(setCityData)
            .finally(() => setLoading(false));
    }, []);

    const [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9] = cityData;

    // ── Loading skeleton ──
    if (loading) {
        return (
            <div className="section-location tf-spacing-1">
                <div className="tf-container">
                    <div className="heading-section justify-content-center text-center mb_48">
                        <span className="sub text-uppercase fw-6 text_secondary-color-2">
                            Explore Cities
                        </span>
                        <h3>Our Location For You</h3>
                    </div>
                    <div className="wrap-location">
                        <div className="tf-grid-layout lg-col-2">
                            <div className="d-flex gap_30">
                                <SkeletonCard />
                                <SkeletonCard />
                            </div>
                            <SkeletonCard wide />
                        </div>
                        <div className="tf-grid-layout lg-col-2">
                            <SkeletonCard wide />
                            <div className="d-flex gap_30">
                                <SkeletonCard />
                                <SkeletonCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                            <CityCard data={c0} delay="0.2" />
                            <CityCard data={c1} delay="0.3" />
                        </div>
                        <CityCard data={c2} wide delay="0.4" />
                    </div>

                    {/* Row 2: [wide] | [small, small] */}
                    <div className="tf-grid-layout lg-col-2">
                        <CityCard data={c3} wide delay="0.4" />
                        <div className="d-flex gap_30">
                            <CityCard data={c4} delay="0.3" />
                            <CityCard data={c5} delay="0.2" />
                        </div>
                    </div>

                    {/* Row 3: [small, small] | [wide] */}
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <CityCard data={c6} delay="0.2" />
                            <CityCard data={c7} delay="0.3" />
                        </div>
                        <CityCard data={c8} wide delay="0.4" />
                    </div>

                    {/* Row 4: [wide] | spacer */}
                    <div className="tf-grid-layout lg-col-2">
                        <CityCard data={c9} wide delay="0.4" />
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
