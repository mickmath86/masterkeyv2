import { populor } from "@/data/properties";
import Image from "next/image";
import React from "react";

export default function Populor() {
    return (
        <div className="section-popular tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Popular Properties
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Find Your Dream Home
                    </h3>
                </div>
                <div className="wrap-property">
                    {populor.map((property, idx) => (
                        <div
                            className={`card-house style-default hover-image item-${idx + 1}`}
                            key={property.id}
                        >
                            <div className="img-style mb_20">
                                <Image
                                    src={property.imgSrc}
                                    width={property.imgWidth}
                                    height={property.imgHeight}
                                    alt="home"
                                />
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
                                <a
                                    href={`/property-details-1/${property.id}`}
                                    className="overlay-link"
                                ></a>
                                <div className="wishlist">
                                    <div className="hover-tooltip tooltip-left box-icon">
                                        <span className="icon icon-Heart"></span>
                                        <span className="tooltip">
                                            Add to Wishlist
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                <h4 className="price mb_12">
                                    {property.price}
                                    <span className="text_secondary-color text-body-default">
                                        {property.type === "Sale"
                                            ? "/Sqft"
                                            : "/month"}
                                    </span>
                                </h4>
                                <a
                                    href={`/property-details-1/${property.id}`}
                                    className="title mb_8 h5 link text_primary-color"
                                >
                                    {property.title}
                                </a>
                                <p>{property.address}</p>
                                <ul className="info d-flex">
                                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                        <i className="icon-Bed"></i>
                                        {property.beds} Beds
                                    </li>
                                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                        <i className="icon-Bathstub"></i>
                                        {property.baths} Baths
                                    </li>
                                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                        <i className="icon-Ruler"></i>
                                        {property.sqft}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                <a
                    href="listing-topmap-grid.html"
                    className="tf-btn btn-bg-1 mx-auto btn-px-32 scrolling-effect effectBottom"
                >
                    <span>View All Properties</span>
                    <span className="bg-effect"></span>
                </a>
            </div>
        </div>
    );
}
