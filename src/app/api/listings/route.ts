import { NextRequest, NextResponse } from "next/server";

const REPLIERS_API_KEY = process.env.REPLIERS_API_KEY;
const REPLIERS_BASE_URL = "https://api.repliers.io";

// The only cities we serve — always enforced, never overrideable from the client.
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

    const params: Record<string, string> = {};

    // Pass through all supported query params
    const supportedParams = [
        "city", "state", "area", "neighborhood", "zip",
        "minPrice", "maxPrice", "minBedrooms", "maxBedrooms",
        "minBaths", "maxBaths", "minSqft", "maxSqft",
        "propertyType", "class", "style", "type", "status",
        "sortBy", "pageNum", "resultsPerPage", "fields",
        "search", "lat", "long", "radius", "hasImages",
    ];

    for (const key of supportedParams) {
        const val = searchParams.get(key);
        if (val) params[key] = val;
    }

    // ── City filtering — always enforced ──────────────────────────────
    // If a specific city was requested, make sure it's one of our cities.
    // If it's not in our list (or is "All Cities"), replace with the full allow-list.
    const requestedCity = params.city;
    const isValidCity =
        requestedCity &&
        requestedCity !== "All Cities" &&
        VENTURA_COUNTY_CITIES.some(
            (c) => c.toLowerCase() === requestedCity.toLowerCase()
        );

    if (isValidCity) {
        // Keep the specific city — it's in our list
        params.city = requestedCity;
    } else {
        // No city filter or unknown city — scope to all our cities
        // Repliers supports comma-separated city lists
        params.city = VENTURA_COUNTY_CITIES.join(",");
    }

    // Always lock state to CA so nothing outside California slips through
    params.state = "CA";

    // Defaults
    if (!params.status) params.status = "A";
    if (!params.type) params.type = "sale";
    if (!params.resultsPerPage) params.resultsPerPage = "20";
    if (!params.fields) {
        params.fields = "mlsNumber,listPrice,address,details,images[1],map,beds,baths";
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `${REPLIERS_BASE_URL}/listings?${queryString}`;

    try {
        const response = await fetch(url, {
            headers: {
                "REPLIERS-API-KEY": REPLIERS_API_KEY || "",
                "Content-Type": "application/json",
            },
            next: { revalidate: 300 }, // cache for 5 minutes
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
