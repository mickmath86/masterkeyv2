import { NextRequest, NextResponse } from "next/server";

const REPLIERS_API_KEY = process.env.REPLIERS_API_KEY;
const REPLIERS_BASE_URL = "https://api.repliers.io";

// The only cities we serve — always enforced server-side.
const VENTURA_COUNTY_CITIES = [
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

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // ── Scalar params (passed through as-is) ──────────────────────────
    const scalarParams = [
        "state", "area", "neighborhood", "zip",
        "minPrice", "maxPrice", "minBedrooms", "maxBedrooms",
        "minBaths", "maxBaths", "minSqft", "maxSqft",
        "propertyType", "class", "style", "type", "status",
        "sortBy", "pageNum", "resultsPerPage", "fields",
        "search", "lat", "long", "radius", "hasImages",
    ];

    // Build query string manually so we can repeat keys for array params
    const parts: string[] = [];

    // ── City filtering — always enforced ──────────────────────────────
    // Repliers expects repeated city params: city=X&city=Y&city=Z
    const requestedCity = searchParams.get("city");
    const isValidCity =
        requestedCity &&
        requestedCity !== "All Cities" &&
        VENTURA_COUNTY_CITIES.some(
            (c) => c.toLowerCase() === requestedCity.toLowerCase()
        );

    if (isValidCity) {
        // Single valid city requested
        parts.push(`city=${encodeURIComponent(requestedCity)}`);
    } else {
        // No city, "All Cities", or unknown city → use all 10
        for (const city of VENTURA_COUNTY_CITIES) {
            parts.push(`city=${encodeURIComponent(city)}`);
        }
    }

    // Always lock to CA
    parts.push("state=CA");

    // ── Scalar params ─────────────────────────────────────────────────
    for (const key of scalarParams) {
        if (key === "state") continue; // already added above
        const val = searchParams.get(key);
        if (val) parts.push(`${key}=${encodeURIComponent(val)}`);
    }

    // ── Defaults ──────────────────────────────────────────────────────
    if (!searchParams.get("status")) parts.push("status=A");
    if (!searchParams.get("type")) parts.push("type=sale");
    if (!searchParams.get("resultsPerPage")) parts.push("resultsPerPage=20");
    if (!searchParams.get("fields")) {
        parts.push("fields=mlsNumber%2ClistPrice%2Caddress%2Cdetails%2Cimages%5B1%5D%2Cmap%2Cbeds%2Cbaths");
    }

    const queryString = parts.join("&");
    const url = `${REPLIERS_BASE_URL}/listings?${queryString}`;

    try {
        const response = await fetch(url, {
            headers: {
                "REPLIERS-API-KEY": REPLIERS_API_KEY || "",
                "Content-Type": "application/json",
            },
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Repliers API error:", response.status, errorText);
            return NextResponse.json(
                { error: "Failed to fetch listings", status: response.status },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Listings fetch error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
