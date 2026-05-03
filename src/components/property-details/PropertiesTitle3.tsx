import React from "react";

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
export default function PropertiesTitle3({ property }: { property: Property }) {
    return (
        <>
            <div>
                <div className="wrap-tag d-flex gap_12 mb_16">
                    <div
                        className={`tag ${
                            property.type === "Sale"
                                ? "sale"
                                : property.type === "Rent"
                                ? "rent"
                                : property.type
                        }  text-title fw-6 text_primary-color`}
                    >
                        For {property.type}
                    </div>
                    <div className="tag categoreis text-title fw-6 text_primary-color">
                        {property.categories}
                    </div>
                </div>
                <h2>{property.title}</h2>
                <ul className="list-action d-flex gap_16">
                    <li className="compare">
                        <a href="#" className="gap_8">
                            <i className="icon-ArrowsLeftRight"></i>
                            <span className="text-button">Compare</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon icon-Heart"></span>
                        </a>
                    </li>
                    <li>
                        {" "}
                        <a href="#" className="">
                            <i className="icon-ShareNetwork"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <h5 className="mb_16">Price:</h5>
                <h2 className="price">
                    {property.price}
                    <span className="text_secondary-color text-body-1">
                        {property.type === "Sale" ? "/Sqft" : "/month"}
                    </span>
                </h2>
            </div>
        </>
    );
}
