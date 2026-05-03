"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import type { MappedProperty } from "@/lib/repliers";
import { mapListingToProperty } from "@/lib/repliers";

export default function Properties2() {
    const [activeTab, setActiveTab] = useState("");
    const [properties, setProperties] = useState<MappedProperty[]>([]);
    const [loading, setLoading] = useState(true);
    let hoverTimer: ReturnType<typeof setTimeout>;

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const res = await fetch(
                    "/api/listings?resultsPerPage=5&sortBy=listPriceDesc&fields=mlsNumber,listPrice,address,details,images%5B1%5D,map"
                );
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();
                const mapped: MappedProperty[] = (data.listings || []).map(mapListingToProperty).slice(0, 5);
                setProperties(mapped);
                if (mapped.length > 0) setActiveTab(mapped[0].mlsNumber);
            } catch (err) {
                console.error("Properties2 fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchFeatured();
    }, []);

    const handleMouseEnter = (id: string) => {
        hoverTimer = setTimeout(() => setActiveTab(id), 100);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimer);
    };

    if (loading || properties.length === 0) return null;

    return (
        <div className="section-features-property tf-spacing-1">
            <div className="tf-container">
                <div className="tf-grid-layout lg-col-2 tabs-hover-wrap align-items-center">
                    <div className="box">
                        {properties.map((property) => (
                            <div
                                key={property.mlsNumber}
                                className={`process-item item scrolling-effect effectLeft${
                                    activeTab === property.mlsNumber ? " active" : ""
                                }`}
                                onMouseEnter={() => handleMouseEnter(property.mlsNumber)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="property-item">
                                    <div className="dots"></div>
                                    <div className="content">
                                        <h4 className="title mb_8">
                                            <Link
                                                href={`/property-details-1/${property.mlsNumber}`}
                                                className="link"
                                            >
                                                {property.title}
                                            </Link>
                                        </h4>
                                        <p>{property.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="tab-content-wrap">
                        {properties.map((property) => (
                            <div
                                key={property.mlsNumber}
                                className={`tab-content${
                                    activeTab === property.mlsNumber ? " active" : ""
                                }`}
                            >
                                <Link
                                    href={`/property-details-1/${property.mlsNumber}`}
                                    className="img-style"
                                >
                                    <Image
                                        src={property.imgSrc}
                                        width={645}
                                        height={645}
                                        alt={property.alt || "property"}
                                        unoptimized
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
