/**
 * Repliers API types and mapper utilities.
 * Maps Repliers listing objects to the app's Property shape.
 */

export type RepliersListing = {
    mlsNumber: string;
    listPrice: number;
    address: {
        streetNumber?: string;
        streetName?: string;
        streetSuffix?: string;
        unitNumber?: string;
        city?: string;
        state?: string;
        zip?: string;
        area?: string;
        neighborhood?: string;
    };
    details: {
        numBedrooms?: number;
        numBathrooms?: number;
        numBathroomsPlus?: number;
        numGarageSpaces?: number;
        sqft?: string;
        propertyType?: string;
        style?: string;
        description?: string;
        yearBuilt?: string;
        heating?: string;
        airConditioning?: string;
        swimmingPool?: string;
        garage?: string;
        parking?: string;
        waterfront?: string;
        virtualTourUrl?: string;
        alternateURLVideoLink?: string;
        HOAFee?: string;
        extras?: string;
        flooringType?: string;
        foundationType?: string;
        roofMaterial?: string;
        patio?: string;
        numFireplaces?: number | null;
        numParkingSpaces?: number;
        laundryLevel?: string | null;
        balcony?: string | null;
    };
    map?: {
        latitude?: number;
        longitude?: number;
    };
    images?: string[];
    type?: string; // "sale" | "lease"
    // extra fields from API
    [key: string]: unknown;
};

export type RepliersSearchResponse = {
    listings: RepliersListing[];
    count: number;
    numPages: number;
    page: number;
    pageSize: number;
};

// Image base URL for Repliers CDN
const REPLIERS_IMG_BASE = "https://cdn.repliers.io";

export function getRepliersImageUrl(imagePath: string): string {
    if (!imagePath) return "/assets/images/home/home-1.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    return `${REPLIERS_IMG_BASE}/${imagePath}?class=large`;
}

export type MappedProperty = {
    id: string; // mlsNumber
    mlsNumber: string;
    imgSrc: string;
    alt: string;
    address: string;
    title: string;
    beds: number;
    baths: number;
    sqft: number;
    categories: string; // propertyType
    type: string; // "Sale" | "Rent"
    price: number;
    coordinates: [number, number];
    garages: number;
    city: string;
    description?: string;
    lat?: number;
    long?: number;
    features: string[];
    filterOptions: string[];
    yearBuilt?: string;
    state?: string;
    zip?: string;
    virtualTourUrl?: string;
};

export function mapListingToProperty(listing: RepliersListing): MappedProperty {
    const addr = listing.address || {};
    const details = listing.details || {};

    const streetParts = [
        addr.streetNumber,
        addr.streetName,
        addr.streetSuffix,
        addr.unitNumber ? `#${addr.unitNumber}` : null,
    ].filter(Boolean);

    const fullAddress = [
        streetParts.join(" "),
        addr.city,
        addr.state,
        addr.zip,
    ]
        .filter(Boolean)
        .join(", ");

    const beds = details.numBedrooms ?? 0;
    const baths = (details.numBathrooms ?? 0) + (details.numBathroomsPlus ?? 0);
    const sqft = details.sqft ? parseInt(details.sqft, 10) || 0 : 0;
    const garages = details.numGarageSpaces ?? 0;

    // Map type: "sale" -> "Sale", lease/rent -> "Rent"
    const rawType = listing.type?.toLowerCase() || "sale";
    const listingType = rawType === "lease" ? "Rent" : "Sale";

    // Map propertyType to category
    const rawPropType = details.propertyType || details.style || "Residential";
    const categories = mapPropertyType(rawPropType);

    // Build features list from available details
    const features: string[] = [];
    if (details.airConditioning && details.airConditioning !== "None") features.push("Air Condition");
    if (details.heating) features.push("Heating");
    if (details.swimmingPool && details.swimmingPool !== "None") features.push("Swimming Pool");
    if (garages > 0) features.push("Garage");
    if (details.waterfront) features.push("Waterfront");
    if (details.virtualTourUrl) features.push("Virtual Tour");

    const img = listing.images?.[0]
        ? getRepliersImageUrl(listing.images[0])
        : "/assets/images/home/home-1.jpg";

    // Build a human-friendly title from address or mls
    const streetAddr = streetParts.join(" ");
    const title = streetAddr
        ? `${streetAddr}, ${addr.city || ""}`
        : `MLS# ${listing.mlsNumber}`;

    const lat = listing.map?.latitude;
    const long = listing.map?.longitude;

    return {
        id: listing.mlsNumber,
        mlsNumber: listing.mlsNumber,
        imgSrc: img,
        alt: fullAddress || "property",
        address: fullAddress,
        title,
        beds,
        baths,
        sqft,
        categories,
        type: listingType,
        price: listing.listPrice,
        coordinates: [long ?? -118.4912, lat ?? 34.0195],
        garages,
        city: addr.city || "",
        description: details.description,
        lat,
        long,
        features,
        filterOptions: [categories],
        yearBuilt: details.yearBuilt,
        state: addr.state,
        zip: addr.zip,
        virtualTourUrl: details.virtualTourUrl,
    };
}

function mapPropertyType(raw: string): string {
    const lower = raw.toLowerCase();
    if (lower.includes("condo") || lower.includes("apartment")) return "Apartment";
    if (lower.includes("townhouse") || lower.includes("townhome")) return "Townhouse";
    if (lower.includes("villa")) return "Villa";
    if (lower.includes("studio")) return "Studio";
    if (lower.includes("commercial") || lower.includes("office")) return "Office";
    if (lower.includes("single") || lower.includes("residential") || lower.includes("house")) return "House";
    return "House";
}

// ─── Full Detail Mapper ──────────────────────────────────────────────────────

import type { ListingDetail } from "@/types/listing";

export function mapListingToDetail(listing: RepliersListing): ListingDetail {
    const base = mapListingToProperty(listing);
    const details = listing.details || {};
    const addr = listing.address || {};
    const lot = (listing as unknown as Record<string, unknown>).lot as Record<string, unknown> | undefined;
    const condo = (listing as unknown as Record<string, unknown>).condominium as Record<string, unknown> | undefined;

    // All images as full CDN URLs
    const images = (listing.images || []).map(getRepliersImageUrl);

    // Extract YouTube video ID or full URL
    const videoUrl = details.alternateURLVideoLink || undefined;

    return {
        ...base,
        images,
        videoUrl,
        virtualTourUrl: details.virtualTourUrl as string | undefined,
        yearBuilt: details.yearBuilt as string | undefined,
        lotSqft: lot?.squareFeet as number | undefined,
        heating: details.heating as string | undefined,
        airConditioning: details.airConditioning as string | undefined,
        swimmingPool: details.swimmingPool as string | undefined,
        extras: details.extras,
        flooringType: details.flooringType,
        foundationType: details.foundationType,
        roofMaterial: details.roofMaterial,
        patio: details.patio,
        numFireplaces: details.numFireplaces,
        numParkingSpaces: details.numParkingSpaces,
        hoaFee: details.HOAFee,
        waterfront: details.waterfront,
        laundryLevel: details.laundryLevel,
        balcony: details.balcony,
        lotFeatures: lot?.features as string | undefined,
        condominium: condo ? {
            amenities: (condo.amenities as string[] | undefined) || [],
            stories: condo.stories as string | undefined,
            parkingType: condo.parkingType as string | undefined,
        } : undefined,
        // Repliers doesn't natively return floor plan images or PDFs — hide sections
        floorPlans: [],
        documents: [],
    };
}
