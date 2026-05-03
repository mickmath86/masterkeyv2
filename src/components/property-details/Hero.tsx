import React from "react";
import PropertiesTitle3 from "./PropertiesTitle3";
import Slide2 from "./Slide2";

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
    price: number;
};

export default function Hero({ property }: { property: Property }) {
    return (
        <>
            <div className="properties-title">
                <PropertiesTitle3 property={property} />
            </div>
            <div className="right">
                <Slide2 />
            </div>
        </>
    );
}
