import { propertieslist } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Properties2() {
    return (
        <div className="bg-light-color tf-spacing-1">
            <div className="tf-container w-1830">
                <div className="heading-section justify-content-center text-center mb_40">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Features Properties
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Recommended For You
                    </h3>
                </div>
                <div className="d-grid gap_30">
                    {propertieslist.map((property) => (
                        <div
                            key={property.id}
                            className="card-house style-list v1 scrolling-effect effectBottom"
                        >
                            <div className="wrap-img">
                                <Link
                                    href={`/properties-details-1/${property.id}`}
                                    className="img-style"
                                >
                                    <Image
                                        src={property.imgSrc as string}
                                        width={600}
                                        height={300}
                                        alt="home"
                                    />
                                </Link>
                                <Link
                                    href={`/properties-details-1/${property.id}`}
                                    className="img-style"
                                >
                                    <Image
                                        src={property.imgSrc2 as string}
                                        width={300}
                                        height={300}
                                        alt="home"
                                    />
                                </Link>
                                <Link
                                    href={`/properties-details-1/${property.id}`}
                                    className="img-style"
                                >
                                    <Image
                                        src={property.imgSrc3 as string}
                                        width={300}
                                        height={300}
                                        alt="home"
                                    />
                                </Link>
                            </div>
                            <div className="content">
                                <div className="d-flex align-items-center gap_12 mb_16 flex-wrap justify-content-between">
                                    <h4 className="price ">
                                        {property.price}
                                        <span className="text_secondary-color text-body-default">
                                            {property.type === "Sale"
                                                ? "/Sqft"
                                                : "/month"}
                                        </span>
                                    </h4>
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
                                </div>
                                <a
                                    href="property-details-1.html"
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
                                        {property.sqft} sqft
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
