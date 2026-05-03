import React from "react";
import MapComponent from "../common/Map2";

type Property = {
    id: number;
    imgSrc: string;
    alt?: string;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    categories: string;
    type: string;
    lat?: number;
    long?: number;
    price: number;
    coordinates: [number, number];
    garages: number;
    city: string;
};

export default function Location({ property }: { property: Property }) {
    return (
        <>
            <h5 className="properties-title mb_20">Location</h5>
            <div className="heading d-flex align-items-center justify-content-between flex-wrap gap_12 mb_16">
                <div className=" d-flex align-items-center gap_4 text-button fw-7 text_primary-color flex-wrap">
                    <i className="icon-MapPin"></i>4600 Sunset Blvd, Los
                    Angeles, CA 90027
                </div>
                <a
                    href="#"
                    className="hover-underline-link text-button fw-7 text_primary-color"
                >
                    Get Directions
                </a>
            </div>
            <div className="wrap-map">
                <MapComponent
                    property={{
                        ...property,
                        lat: property.lat ?? property.coordinates?.[1] ?? 0,
                        long: property.long ?? property.coordinates?.[0] ?? 0,
                    }}
                />
            </div>
        </>
    );
}
