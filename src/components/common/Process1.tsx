"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import OdometerCounter from "@/components/common/Odometer";

type Tab = {
    id: string;
    title: string;
    content: string;
    image: string;
};

const tabs: Tab[] = [
    {
        id: "tab1",
        title: "Step 1: Discover Your Dream Home",
        content:
            "Browse through a curated selection of properties tailored to your lifestyle and budget.",
        image: "/assets/images/section/process-1.jpg",
    },
    {
        id: "tab2",
        title: "Step 2: Schedule A Viewing",
        content:
            "Book a tour at your convenience and explore the space in person or virtually.",
        image: "/assets/images/section/process-2.jpg",
    },
    {
        id: "tab3",
        title: "Step 3: Seal The Deal",
        content:
            "Get expert guidance to finalize paperwork and move into your new home with confidence.",
        image: "/assets/images/section/process-3.jpg",
    },
];

export default function Process1() {
    const [activeTab, setActiveTab] = useState("tab1");
    let hoverTimer: ReturnType<typeof setTimeout>;

    const handleMouseEnter = useCallback((tabId: string) => {
        hoverTimer = setTimeout(() => {
            setActiveTab(tabId);
        }, 100);
    }, []);

    const handleMouseLeave = useCallback(() => {
        clearTimeout(hoverTimer);
    }, []);

    return (
        <div className="section-process tf-spacing-1">
            <div className="tf-container">
                <div className="row tabs-hover-wrap align-items-center">
                    <div className="col-lg-5">
                        <div className="heading-section mb_48">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                Our Process
                            </span>
                            <h3 className="split-text effect-blur-fade">
                                Homebuying Steps
                            </h3>
                        </div>
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`process-item item scrolling-effect effectLeft ${
                                    activeTab === tab.id ? "active" : ""
                                }`}
                                onMouseEnter={() => handleMouseEnter(tab.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="line"></span>
                                <div className="content">
                                    <h5 className="title mb_8">{tab.title}</h5>
                                    <p>{tab.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-7">
                        <div className="tab-content-wrap">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    id={tab.id}
                                    className={`tab-content ${
                                        activeTab === tab.id ? "active" : ""
                                    }`}
                                >
                                    <div className="img-style">
                                        <Image
                                            loading="lazy"
                                            src={tab.image}
                                            width={690}
                                            height={518}
                                            alt="process"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="split-text effect-blur-fade">
                        Trusted By Thousands
                    </h3>
                    <div className="wrap-counter">
                        {[
                            { number: 112, label: "Awards Received" },
                            { number: 85, label: "Satisfied Clients" },
                            { number: 66, label: "Monthly Traffic" },
                            { number: 143, label: "Properties Sold" },
                        ].map((item, idx) => (
                            <div
                                className="counter-item style-default"
                                key={idx}
                            >
                                <div className="counter-number h1">
                                    <OdometerCounter value={item.number} />
                                </div>
                                <h6 className="text_secondary-color">
                                    {item.label}
                                </h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
