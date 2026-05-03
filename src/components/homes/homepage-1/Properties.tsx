"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import type { MappedProperty } from "@/lib/repliers";
import { mapListingToProperty } from "@/lib/repliers";

export default function Properties() {
    const [isMobile, setIsMobile] = useState(false);
    const [properties, setProperties] = useState<MappedProperty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const res = await fetch(
                    "/api/listings?resultsPerPage=6&sortBy=updatedOnDesc&fields=mlsNumber,listPrice,address,details,images%5B1%5D,map"
                );
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                const mapped = (data.listings || []).map(mapListingToProperty);
                setProperties(mapped.slice(0, 6));
            } catch (err) {
                console.error("Error fetching featured listings:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchFeatured();
    }, []);

    if (loading) {
        return (
            <div className="section-features-property-4 tf-spacing-1 pt-0">
                <div className="tf-container">
                    <div className="heading-section justify-content-center text-center mb_46">
                        <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                            Featured Properties
                        </span>
                        <h3 className="split-text effect-blur-fade">Find Your Dream Home</h3>
                    </div>
                    <div className="d-flex justify-content-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const PropertyCard = ({ property }: { property: MappedProperty }) => (
        <div
            className="card-house style-default hover-image"
            data-id={property.mlsNumber}
        >
            <div className="img-style mb_20">
                {/* Fixed-height container keeps all cards uniform (410×308) */}
                <div style={{ position: "relative", width: "100%", height: 308, overflow: "hidden" }}>
                    <Image
                        src={property.imgSrc}
                        fill
                        alt={property.alt || "property"}
                        unoptimized
                        sizes="410px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                </div>
                <div className="wrap-tag d-flex gap_8 mb_12">
                    <div
                        className={`tag ${
                            property.type === "Sale"
                                ? "sale"
                                : property.type === "Rent"
                                ? "rent"
                                : property.type
                        } text-button-small fw-6 text_primary-color`}
                    >
                        For {property.type}
                    </div>
                    <div className="tag categoreis text-button-small fw-6 text_primary-color">
                        {property.categories}
                    </div>
                </div>
                <Link
                    href={`/property-details-1/${property.mlsNumber}`}
                    className="overlay-link"
                ></Link>
                <div className="wishlist">
                    <div className="hover-tooltip tooltip-left box-icon">
                        <span className="icon icon-Heart"></span>
                        <span className="tooltip">Add to Wishlist</span>
                    </div>
                </div>
            </div>
            <div className="content">
                <h4 className="price mb_12" suppressHydrationWarning>
                    ${property.price.toLocaleString()}
                    <span className="text_secondary-color text-body-default">
                        {property.type === "Sale" ? "" : "/month"}
                    </span>
                </h4>
                <Link
                    href={`/property-details-1/${property.mlsNumber}`}
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
                        {property.sqft ? property.sqft.toLocaleString() : "N/A"} Sqft
                    </li>
                </ul>
            </div>
        </div>
    );

    return (
        <div className="section-features-property-4 tf-spacing-1 pt-0">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_46">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Featured Properties
                    </span>
                    <h3 className="split-text effect-blur-fade">Find Your Dream Home</h3>
                </div>
                {isMobile ? (
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={15}
                        slidesPerView={1}
                        pagination={{ clickable: true, el: ".sw-dots" }}
                        className="tf-sw-mobile bg_1"
                    >
                        {properties.map((property, idx) => (
                            <SwiperSlide key={idx}>
                                <PropertyCard property={property} />
                            </SwiperSlide>
                        ))}
                        <div className="sw-dots style-1 sw-pagination-mb mt_24 justify-content-center d-flex d-md-none"></div>
                    </Swiper>
                ) : (
                    <div className="tf-sw-mobile bg_1">
                        <div className="tf-grid-layout-md lg-col-3 md-col-2">
                            {properties.map((property, idx) => (
                                <div className="swiper-slide" key={idx}>
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <Link
                    href={"/listing-half-map-grid"}
                    className="tf-btn btn-bg-1 mx-auto btn-px-32 scrolling-effect effectBottom"
                >
                    <span>View All Properties</span>
                    <span className="bg-effect"></span>
                </Link>
            </div>
        </div>
    );
}
