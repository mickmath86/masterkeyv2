import React from "react";
import type { ListingDetail } from "@/types/listing";

type Props = {
    listing?: ListingDetail;
};

type UtilityItem = {
    icon: string;
    title: string;
    value: string;
};

function humanize(str: string): string {
    if (!str) return "N/A";
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/,/g, ", ")
        .replace(/_/g, " ")
        .trim();
}

function isPresent(val: string | null | undefined): boolean {
    return !!val && val !== "None" && val !== "No";
}

function buildUtilityItems(listing: ListingDetail): UtilityItem[] {
    const items: UtilityItem[] = [];

    // Heating
    if (isPresent(listing.heating)) {
        items.push({
            icon: "icon-Thermometer",
            title: "Heating",
            value: humanize(listing.heating!),
        });
    }

    // Air Conditioning
    if (isPresent(listing.airConditioning)) {
        items.push({
            icon: "icon-Snowflake",
            title: "Air Conditioning",
            value: humanize(listing.airConditioning!),
        });
    }

    // Swimming Pool
    if (isPresent(listing.swimmingPool)) {
        items.push({
            icon: "icon-Drop",
            title: "Swimming Pool",
            value: humanize(listing.swimmingPool!),
        });
    }

    // Fireplace
    if (listing.numFireplaces && listing.numFireplaces > 0) {
        items.push({
            icon: "icon-Fire",
            title: "Fireplace",
            value: `${listing.numFireplaces} Fireplace${listing.numFireplaces > 1 ? "s" : ""}`,
        });
    }

    // Flooring
    if (isPresent(listing.flooringType)) {
        items.push({
            icon: "icon-Rows",
            title: "Flooring",
            value: humanize(listing.flooringType!),
        });
    }

    // Roof
    if (isPresent(listing.roofMaterial)) {
        items.push({
            icon: "icon-HouseSimple",
            title: "Roof",
            value: humanize(listing.roofMaterial!),
        });
    }

    // Foundation
    if (isPresent(listing.foundationType)) {
        items.push({
            icon: "icon-Columns",
            title: "Foundation",
            value: humanize(listing.foundationType!),
        });
    }

    // Patio / Balcony
    const patio = listing.patio || listing.balcony;
    if (isPresent(patio)) {
        items.push({
            icon: "icon-Door",
            title: "Patio / Outdoor",
            value: humanize(patio!),
        });
    }

    // Waterfront
    if (isPresent(listing.waterfront)) {
        items.push({
            icon: "icon-Waves",
            title: "Waterfront",
            value: humanize(listing.waterfront!),
        });
    }

    // Laundry
    if (isPresent(listing.laundryLevel)) {
        items.push({
            icon: "icon-WashingMachine",
            title: "Laundry",
            value: humanize(listing.laundryLevel!),
        });
    }

    // Parking
    if (listing.numParkingSpaces && listing.numParkingSpaces > 0) {
        items.push({
            icon: "icon-Car",
            title: "Parking Spaces",
            value: String(listing.numParkingSpaces),
        });
    }

    // Garage
    if (listing.garages > 0) {
        items.push({
            icon: "icon-Warehouse",
            title: "Garage Spaces",
            value: String(listing.garages),
        });
    }

    // Extras (appliances, inclusions): e.g. "GasWaterHeater,Dryer,Washer"
    if (isPresent(listing.extras)) {
        listing.extras!.split(",").forEach((extra) => {
            const label = humanize(extra.trim());
            if (label) {
                items.push({
                    icon: "icon-Lightning",
                    title: label,
                    value: "Included",
                });
            }
        });
    }

    // Condo amenities
    if (listing.condominium?.amenities?.length) {
        listing.condominium.amenities.forEach((amenity) => {
            items.push({
                icon: "icon-Buildings",
                title: humanize(amenity),
                value: "Yes",
            });
        });
    }

    // Lot features
    if (isPresent(listing.lotFeatures)) {
        items.push({
            icon: "icon-Tree",
            title: "Lot Features",
            value: humanize(listing.lotFeatures!),
        });
    }

    return items;
}

export default function PropertyUtility({ listing }: Props) {
    if (!listing) return null;
    const items = buildUtilityItems(listing);

    if (items.length === 0) return null;

    const mid = Math.ceil(items.length / 2);
    const left = items.slice(0, mid);
    const right = items.slice(mid);

    const renderColumn = (col: UtilityItem[]) => (
        <div className="col-utility">
            {col.map((item, i) => (
                <div className="item d-flex justify-content-between" key={i}>
                    <div className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                        <i className={item.icon}></i>
                        {item.title}
                    </div>
                    <span className="text-button text_primary-color">{item.value}</span>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <h5 className="properties-title mb_20">Property Features</h5>
            <div className="tf-grid-layout md-col-2">
                {renderColumn(left)}
                {renderColumn(right)}
            </div>
        </>
    );
}
