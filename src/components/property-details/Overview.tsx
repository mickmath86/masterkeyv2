import React from "react";
import type { ListingDetail } from "@/types/listing";

type Props = {
    listing?: ListingDetail;
};

function formatValue(val: string | number | null | undefined, fallback = "N/A"): string {
    if (val === null || val === undefined || val === "" || val === "None") return fallback;
    return String(val);
}

function humanize(str: string): string {
    // Convert camelCase/PascalCase API values to readable text
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/,/g, ", ")
        .replace(/_/g, " ")
        .trim();
}

export default function Overview({ listing }: Props) {
    if (!listing) return null;
    const garageText = listing.garages > 0 ? `${listing.garages} Space${listing.garages > 1 ? "s" : ""}` : "None";
    const lotText = listing.lotSqft ? `${listing.lotSqft.toLocaleString()} SqFt` : "N/A";
    const sqftText = listing.sqft ? `${listing.sqft.toLocaleString()} SqFt` : "N/A";
    const parkingText = listing.numParkingSpaces ? `${listing.numParkingSpaces} Spaces` : (listing.garages > 0 ? garageText : "N/A");
    const hoaText = listing.hoaFee ? `$${Number(listing.hoaFee).toLocaleString()}/mo` : "None";

    return (
        <div>
            <h5 className="properties-title mb_20">Overview</h5>
            <div className="tf-grid-layout tf-col-2 xl-col-4 md-col-3">
                <div className="item d-flex gap_16">
                    <i className="icon icon-HouseSimple"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">MLS #:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {listing.mlsNumber}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-SlidersHorizontal"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Type:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {listing.categories}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Bed"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Bedrooms:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {listing.beds > 0 ? `${listing.beds} Bed${listing.beds > 1 ? "s" : ""}` : "N/A"}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Shower"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Bathrooms:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {listing.baths > 0 ? `${listing.baths} Bath${listing.baths > 1 ? "s" : ""}` : "N/A"}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Warehouse"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Garage:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {garageText}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Ruler"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Living Area:</span>
                        <span className="text-title fw-6 text_primary-color" suppressHydrationWarning>
                            {sqftText}
                        </span>
                    </div>
                </div>
                {listing.lotSqft && (
                    <div className="item d-flex gap_16">
                        <i className="icon icon-Crop"></i>
                        <div className="d-flex flex-column gap">
                            <span className="text-body-default">Lot Size:</span>
                            <span className="text-title fw-6 text_primary-color" suppressHydrationWarning>
                                {lotText}
                            </span>
                        </div>
                    </div>
                )}
                {listing.yearBuilt && (
                    <div className="item d-flex gap_16">
                        <i className="icon icon-CalendarBlank"></i>
                        <div className="d-flex flex-column gap">
                            <span className="text-body-default">Year Built:</span>
                            <span className="text-title fw-6 text_primary-color">
                                {listing.yearBuilt}
                            </span>
                        </div>
                    </div>
                )}
                <div className="item d-flex gap_16">
                    <i className="icon icon-Car"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Parking:</span>
                        <span className="text-title fw-6 text_primary-color">
                            {parkingText}
                        </span>
                    </div>
                </div>
                {listing.hoaFee !== undefined && listing.hoaFee !== null && (
                    <div className="item d-flex gap_16">
                        <i className="icon icon-Buildings"></i>
                        <div className="d-flex flex-column gap">
                            <span className="text-body-default">HOA Fee:</span>
                            <span className="text-title fw-6 text_primary-color">
                                {hoaText}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
