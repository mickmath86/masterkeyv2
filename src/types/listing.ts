/**
 * Full listing type passed to all property-details sub-components.
 * Derived from the Repliers API + our mapListingToProperty() output.
 */
export type ListingDetail = {
    // Core IDs
    mlsNumber: string;
    id: string;

    // Price
    price: number;
    type: string; // "Sale" | "Rent"

    // Address
    address: string;
    title: string;
    city: string;
    state?: string;
    zip?: string;

    // Specs
    beds: number;
    baths: number;
    sqft: number;
    garages: number;
    categories: string;
    yearBuilt?: string;
    lotSqft?: number;

    // Map
    lat?: number;
    long?: number;
    coordinates: [number, number];

    // Images — full CDN URLs
    images: string[];
    imgSrc: string; // first image (fallback)
    alt?: string;

    // Video
    videoUrl?: string;       // details.alternateURLVideoLink (YouTube, Vimeo etc.)
    virtualTourUrl?: string; // details.virtualTourUrl

    // Description
    description?: string;

    // Utility fields from details
    heating?: string;
    airConditioning?: string;
    swimmingPool?: string;
    extras?: string;          // comma-separated appliance/feature list
    flooringType?: string;
    foundationType?: string;
    roofMaterial?: string;
    patio?: string;
    parking?: string;
    numFireplaces?: number | null;
    numParkingSpaces?: number;
    hoaFee?: string | null;
    waterfront?: string | null;
    laundryLevel?: string | null;
    balcony?: string | null;
    condominium?: {
        amenities?: string[];
        stories?: string;
        parkingType?: string;
    };
    lotFeatures?: string; // lot.features

    // Floor plans (Repliers doesn't natively return these, future-proof)
    floorPlans?: { label: string; imageUrl: string; beds?: number; baths?: number }[];
    documents?: { label: string; url: string; type: "pdf" | "doc" | "other" }[];

    // Legacy shape support
    features?: string[];
    filterOptions?: string[];
};
