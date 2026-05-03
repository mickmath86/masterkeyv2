import React from "react";
type Property = {
    id: number;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    categories: string;
    type: string;
    price: number;
};

export default function PropertiesTitle2({ property }: { property: Property }) {
    return (
        <div>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap_12">
                <div>
                    <div className="wrap-tag d-flex gap_8 mb_12">
                        <div
                            className={`tag ${
                                property.type === "Sale"
                                    ? "sale"
                                    : property.type === "Rent"
                                    ? "rent"
                                    : property.type
                            }  text-button-small fw-6 text_primary-color`}
                        >
                            For {property.type}
                        </div>
                        <div className="tag categoreis text-button-small fw-6 text_primary-color">
                            {property.categories}
                        </div>
                    </div>
                    <h4>{property.title}</h4>
                </div>
                <h3 className="price">
                    ${property.price}
                    <span className="text_secondary-color text-body-1">
                        {property.type === "Sale" ? "/Sqft" : "/month"}
                    </span>
                </h3>
            </div>
            <div className="wrap-info d-flex justify-content-between align-items-end">
                <div>
                    <div className="text-body-default mb_12">Features:</div>
                    <ul className="info d-flex">
                        <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                            <i className="icon-Bed"></i>
                            {property.beds}
                            Beds
                        </li>
                        <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                            <i className="icon-Bathstub"></i>
                            {property.baths} Baths
                        </li>
                        <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                            <i className="icon-Ruler"></i>
                            {property.sqft} sqft
                        </li>
                    </ul>
                </div>
                <div className="location">
                    <div className="text-body-default mb_12">Location:</div>
                    <h6 className="d-flex align-items-center gap_8">
                        <i className="icon-MapPin"></i>{property.address}
                    </h6>
                </div>
                <ul className="list-action d-flex gap_16">
                    <li>
                        <a href="#" className="">
                            <i className="icon-ArrowsLeftRight"></i>
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
        </div>
    );
}
