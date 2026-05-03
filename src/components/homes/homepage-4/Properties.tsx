"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { properties } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import type Isotope from "isotope-layout";

const filters = [
    { label: "View All", value: "*" },
    { label: "Apartment", value: ".apartment" },
    { label: "Villa", value: ".villa" },
    { label: "Studio", value: ".studio" },
    { label: "House", value: ".house" },
    { label: "Office", value: ".office" },
];

export default function Properties() {
    const isotope = useRef<Isotope | null>(null);
    const grid = useRef<HTMLDivElement>(null);
    const [filterKey, setFilterKey] = useState<string>("*");

    const handleFilterClick = useCallback((filterValue: string) => {
        setFilterKey(filterValue);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const initIsotope = async () => {
            if (grid.current) {
                const IsotopeModule = (await import("isotope-layout")).default;
                if (isMounted && grid.current) {
                    isotope.current = new IsotopeModule(grid.current, {
                        itemSelector: ".item-filter",
                        layoutMode: "fitRows",
                    });
                }
            }
        };

        initIsotope();

        return () => {
            isMounted = false;
            isotope.current?.destroy();
            isotope.current = null;
        };
    }, []);

    useEffect(() => {
        if (isotope.current) {
            isotope.current.arrange({ filter: filterKey });
        }
    }, [filterKey]);

    return (
        <div className="tf-spacing-5 section-features-property-4">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_32">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text split-text effect-rotate">
                        Featured Properties
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Find Your Dream Home
                    </h3>
                </div>

                <div className="tf-filters gap_10 mb_48 overflow-x-auto">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            className={`btn-fillter text-button${
                                filterKey === filter.value ? " active" : ""
                            }`}
                            type="button"
                            onClick={() => handleFilterClick(filter.value)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="fillters-wrap" ref={grid}>
                    {properties.slice(0, 6).map((property) => (
                        <div
                            key={property.id}
                            className={`item-filter card-house style-default hover-image ${
                                property.categories
                                    ?.toLowerCase()
                                    .replace(/\s+/g, "") || ""
                            }`}
                        >
                            <div className="img-style mb_20">
                                <Image
                                    src={property.imgSrc}
                                    width={410}
                                    height={308}
                                    alt="home"
                                />
                                <div className="wrap-tag d-flex gap_8 mb_12">
                                    <div
                                        className={`tag ${property.type.toLowerCase()} text-button-small fw-6 text_primary-color`}
                                    >
                                        For {property.type}
                                    </div>
                                    <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                        {property.categories}
                                    </div>
                                </div>
                                <Link
                                    href={`/property-details-1/${property.id}`}
                                    className="overlay-link"
                                ></Link>
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
                                <h4
                                    className="price mb_12"
                                    suppressHydrationWarning
                                >
                                    ${property.price.toLocaleString()}
                                    <span className="text_secondary-color text-body-default">
                                        {property.type === "Sale"
                                            ? "/Sqft"
                                            : "/month"}
                                    </span>
                                </h4>
                                <Link
                                    href={`/property-details-1/${property.id}`}
                                    className="title mb_8 h5 link text_primary-color"
                                >
                                    {property.title}
                                </Link>
                                <p>{property.address}</p>
                                <ul className="info d-flex">
                                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                        <i className="icon-Bed"></i>
                                        {property.beds} Bed
                                    </li>
                                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                        <i className="icon-Bathtub"></i>
                                        {property.baths} Bath
                                    </li>
                                    <li
                                        className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"
                                        suppressHydrationWarning
                                    >
                                        <i className="icon-Ruler"></i>
                                        {property.sqft
                                            ? property.sqft.toLocaleString()
                                            : "0"}{" "}
                                        Sqft
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <a
                    href="listing-topmap-grid.html"
                    className="tf-btn btn-bg-1 mx-auto btn-px-32"
                >
                    <span>View All Properties</span>
                    <span className="bg-effect"></span>
                </a>
            </div>
        </div>
    );
}
