/**
 * Ventura County city showcase — async Server Component.
 *
 * Bento grid layout:
 *   Row 1: [small 300×300] [small 300×300]  |  [wide 630×300]
 *   Row 2: [wide 630×300]                   |  [small 300×300] [small 300×300]
 *   Row 3: [small 300×300] [small 300×300]  |  [wide 630×300]
 *   Row 4: [wide 630×300]                   |  [small 300×300] [small 300×300]
 *
 * Each image is constrained to its card's exact dimensions via a
 * position:relative wrapper + objectFit:cover so the bento proportions
 * are always preserved regardless of source image dimensions.
 */

import Image from "next/image";
import React from "react";

const REPLIERS_API_KEY = process.env.REPLIERS_API_KEY ?? "";
const REPLIERS_BASE = "https://api.repliers.io";
const CDN_BASE = "https://cdn.repliers.io";
const REVALIDATE = 3600; // 1 hour

// ── Types ──────────────────────────────────────────────────────────────────

type CityData = {
    city: string;
    coverImageUrl: string | null;
    count: number;
};

// ── Helpers ────────────────────────────────────────────────────────────────

function cdnUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${CDN_BASE}/${path}?class=large`;
}

async function fetchCityData(city: string): Promise<CityData> {
    const base: CityData = { city, coverImageUrl: null, count: 0 };
    try {
        const params = new URLSearchParams({
            city,
            state: "CA",
            status: "A",
            type: "sale",
            propertyType: "Residential",
            hasImages: "true",
            sortBy: "listPriceDesc",
            fields: "mlsNumber,listPrice,images[1]",
            resultsPerPage: "1",
        });
        const res = await fetch(`${REPLIERS_BASE}/listings?${params}`, {
            headers: { "REPLIERS-API-KEY": REPLIERS_API_KEY, "Content-Type": "application/json" },
            next: { revalidate: REVALIDATE },
        });
        if (!res.ok) return base;
        const data = await res.json();
        const listing = data.listings?.[0];
        const imagePath = listing?.images?.[0];
        return {
            city,
            count: data.count ?? 0,
            coverImageUrl: imagePath ? cdnUrl(imagePath) : null,
        };
    } catch {
        return base;
    }
}

// ── Card component ─────────────────────────────────────────────────────────

/**
 * wide=false → 300×300 square card
 * wide=true  → 630×300 landscape card (fills the full column)
 */
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

    // Card pixel dimensions — match original template exactly
    const W = wide ? 630 : 300;
    const H = 300;

    return (
        <div
            className="location-item hover-image scrolling-effect effectFade"
            data-delay={delay}
            // Each small card must stretch to fill its flex slot
            style={wide ? undefined : { flex: "1 1 0", minWidth: 0 }}
        >
            <a href={href} className="img-style mb_18">
                {/* Fixed-size image container — img fills and crops to exactly W×H */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: H,
                        overflow: "hidden",
                        borderRadius: 12,
                    }}
                >
                    {data.coverImageUrl ? (
                        <Image
                            src={data.coverImageUrl}
                            alt={`${data.city} homes`}
                            fill
                            unoptimized
                            sizes={`${W}px`}
                            style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    ) : (
                        /* Branded gradient placeholder */
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

// ── Main Component ─────────────────────────────────────────────────────────

export default async function Location() {
    const cities = [
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

    const [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9] =
        await Promise.all(cities.map(fetchCityData));

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
                    {/* ── Row 1: [small, small] | [wide] ── */}
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <CityCard data={c0} delay="0.2" />
                            <CityCard data={c1} delay="0.3" />
                        </div>
                        <CityCard data={c2} wide delay="0.4" />
                    </div>

                    {/* ── Row 2: [wide] | [small, small] ── */}
                    <div className="tf-grid-layout lg-col-2">
                        <CityCard data={c3} wide delay="0.4" />
                        <div className="d-flex gap_30">
                            <CityCard data={c4} delay="0.3" />
                            <CityCard data={c5} delay="0.2" />
                        </div>
                    </div>

                    {/* ── Row 3: [small, small] | [wide] ── */}
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <CityCard data={c6} delay="0.2" />
                            <CityCard data={c7} delay="0.3" />
                        </div>
                        <CityCard data={c8} wide delay="0.4" />
                    </div>

                    {/* ── Row 4: [wide] | [small, small] ── */}
                    <div className="tf-grid-layout lg-col-2">
                        <CityCard data={c9} wide delay="0.4" />
                        {/* Two invisible spacer cards to keep grid symmetrical */}
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
