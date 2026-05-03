/**
 * Ventura County city showcase — async Server Component.
 *
 * For each city we show:
 *  - Cover photo from the most expensive active residential listing that has images
 *  - Live active listing count
 *  - Link to /listing-half-map-grid?city=<city>
 *
 * If the cover-photo fetch ever fails we fall back to a CSS gradient placeholder.
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
    displayName: string;
    coverImageUrl: string | null;
    mlsNumber: string | null;
    count: number;
};

// ── Helpers ────────────────────────────────────────────────────────────────

function cdnUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${CDN_BASE}/${path}?class=large`;
}

async function fetchCityData(city: string): Promise<CityData> {
    const base: CityData = { city, displayName: city, coverImageUrl: null, mlsNumber: null, count: 0 };

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
            ...base,
            count: data.count ?? 0,
            mlsNumber: listing?.mlsNumber ?? null,
            coverImageUrl: imagePath ? cdnUrl(imagePath) : null,
        };
    } catch {
        return base;
    }
}

// ── Layout helpers ─────────────────────────────────────────────────────────

// The original layout has two rows:
//   Row 1: [small, small] | [wide]
//   Row 2: [wide]         | [small, small]
// We'll keep this exact same structure with 10 cities across the two rows.

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
    const countLabel = data.count > 0 ? `${data.count} ${data.count === 1 ? "Property" : "Properties"}` : "View Listings";

    return (
        <div
            className="location-item hover-image scrolling-effect effectFade"
            data-delay={delay}
            style={{ flex: wide ? undefined : "1 1 0" }}
        >
            <a href={href} className="img-style mb_18" style={{ display: "block", overflow: "hidden" }}>
                {data.coverImageUrl ? (
                    <Image
                        src={data.coverImageUrl}
                        alt={`${data.displayName} homes`}
                        width={wide ? 630 : 300}
                        height={300}
                        unoptimized
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    /* Gradient placeholder when no photo is available */
                    <div
                        style={{
                            width: "100%",
                            height: 300,
                            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #e4e95b 100%)",
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
                            {data.displayName}
                        </span>
                    </div>
                )}
            </a>
            <div className="content">
                <a href={href} className="mb_4 link h5 text_primary-color">
                    {data.displayName}, CA
                </a>
                <p>{countLabel}</p>
            </div>
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default async function Location() {
    // Fetch all 10 cities in parallel
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

    const cityData = await Promise.all(cities.map(fetchCityData));

    // Row 1: indices 0,1 (small pair) + index 2 (wide)
    // Row 2: index 3 (wide) + indices 4,5 (small pair)
    // Row 3: indices 6,7 (small pair) + index 8 (wide)  — extra row for 10 cities
    // Row 4: index 9 (wide, centered)
    const [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9] = cityData;

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
                    {/* Row 1: two smalls + one wide */}
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <CityCard data={c0} delay="0.2" />
                            <CityCard data={c1} delay="0.3" />
                        </div>
                        <CityCard data={c2} wide delay="0.4" />
                    </div>

                    {/* Row 2: one wide + two smalls */}
                    <div className="tf-grid-layout lg-col-2">
                        <CityCard data={c3} wide delay="0.4" />
                        <div className="d-flex gap_30">
                            <CityCard data={c4} delay="0.3" />
                            <CityCard data={c5} delay="0.2" />
                        </div>
                    </div>

                    {/* Row 3: two smalls + one wide */}
                    <div className="tf-grid-layout lg-col-2" style={{ marginTop: "var(--gap-30, 30px)" }}>
                        <div className="d-flex gap_30">
                            <CityCard data={c6} delay="0.2" />
                            <CityCard data={c7} delay="0.3" />
                        </div>
                        <CityCard data={c8} wide delay="0.4" />
                    </div>

                    {/* Row 4: last city, full-width */}
                    <div style={{ marginTop: "var(--gap-30, 30px)" }}>
                        <CityCard data={c9} wide delay="0.2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
