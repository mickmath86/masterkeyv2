"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const propertiesData = [
    {
        id: "tab1",
        title: "Casa Lomas de Machali",
        address: "72 Sunset Avenue, Los Angeles, California",
        img: "/assets/images/section/features-properties-1.jpg",
    },
    {
        id: "tab2",
        title: "Villa Del Mar Retreat",
        address: "72 Sunset Avenue, Los Angeles, California",
        img: "/assets/images/section/features-properties-2.jpg",
    },
    {
        id: "tab3",
        title: "Rancho Vista Verde",
        address: "72 Sunset Avenue, Los Angeles, California",
        img: "/assets/images/section/features-properties-3.jpg",
    },
    {
        id: "tab4",
        title: "Sunset Heights Estate",
        address: "72 Sunset Avenue, Los Angeles, California",
        img: "/assets/images/section/features-properties-4.jpg",
    },
    {
        id: "tab5",
        title: "Coastal Serenity Cottage",
        address: "72 Sunset Avenue, Los Angeles, California",
        img: "/assets/images/section/features-properties-5.jpg",
    },
];

export default function Properties2() {
    const [activeTab, setActiveTab] = useState("tab1");
    let hoverTimer: ReturnType<typeof setTimeout>;

    const handleMouseEnter = (tabId: string) => {
        hoverTimer = setTimeout(() => {
            setActiveTab(tabId);
        }, 100);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimer);
    };

    return (
        <div className="section-features-property tf-spacing-1">
            <div className="tf-container">
                <div className="tf-grid-layout lg-col-2 tabs-hover-wrap align-items-center">
                    <div className="box">
                        {propertiesData.map((property) => (
                            <div
                                key={property.id}
                                className={`process-item item scrolling-effect effectLeft${
                                    activeTab === property.id ? " active" : ""
                                }`}
                                data-tab={property.id}
                                onMouseEnter={() =>
                                    handleMouseEnter(property.id)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="property-item">
                                    <div className="dots"></div>
                                    <div className="content">
                                        <h4 className="title mb_8">
                                            <Link
                                                href={'/property-details-1/1'}
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
                        {propertiesData.map((property) => (
                            <div
                                key={property.id}
                                id={property.id}
                                className={`tab-content${
                                    activeTab === property.id ? " active" : ""
                                }`}
                            >
                                <Link href={'/property-details-1/1'} className="img-style">
                                    <Image
                                        src={property.img}
                                        width={645}
                                        height={645}
                                        alt="process"
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
