import React from "react";
import type { ListingDetail } from "@/types/listing";

type Props = {
    listing: ListingDetail;
};

export default function PropertiesTitle({ listing }: Props) {
    const formattedPrice = listing.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap_12">
                <div>
                    <div className="wrap-tag d-flex gap_8 mb_12">
                        <div
                            className={`tag ${
                                listing.type === "Sale"
                                    ? "sale"
                                    : listing.type === "Rent"
                                    ? "rent"
                                    : listing.type
                            } text-button-small fw-6 text_primary-color`}
                        >
                            For {listing.type}
                        </div>
                        <div className="tag categoreis text-button-small fw-6 text_primary-color">
                            {listing.categories}
                        </div>
                    </div>
                    <h4>{listing.title}</h4>
                </div>
                <h4 className="price" suppressHydrationWarning>
                    {formattedPrice}
                    {listing.type !== "Sale" && (
                        <span className="text_secondary-color text-body-1">/month</span>
                    )}
                </h4>
            </div>
            <div className="wrap-info d-flex justify-content-between align-items-end">
                <div>
                    <div className="text-body-default mb_12">Features:</div>
                    <ul className="info d-flex">
                        <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                            <i className="icon-Bed"></i>
                            {listing.beds} Beds
                        </li>
                        <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                            <i className="icon-Bathtub"></i>
                            {listing.baths} Baths
                        </li>
                        {listing.sqft > 0 && (
                            <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6" suppressHydrationWarning>
                                <i className="icon-Ruler"></i>
                                {listing.sqft.toLocaleString()} sqft
                            </li>
                        )}
                    </ul>
                </div>
                <ul className="list-action d-flex gap_16">
                    <li>
                        <a href="#" aria-label="Compare">
                            <i className="icon-ArrowsLeftRight"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="Save">
                            <span className="icon icon-Heart"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" aria-label="Share">
                            <i className="icon-ShareNetwork"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
