"use client";

import React, { useEffect } from "react";
import Location from "./Location";
import Floor2 from "./Floor2";
import GallerySection from "./Gallery";
function updateTabSlideEffect() {
    const tabSlide = document.querySelector(".tab-slide");
    if (!tabSlide) return;

    const activeTab = tabSlide.querySelector("li.active") as HTMLElement | null;
    const effect = tabSlide.querySelector(
        ".item-slide-effect"
    ) as HTMLElement | null;

    if (activeTab && effect) {
        const width = activeTab.offsetWidth;
        const left = activeTab.offsetLeft;
        effect.style.width = `${width}px`;
        effect.style.transform = `translateX(${left}px)`;
    }
}

// Custom hook to handle tab slide effect
function useTabSlide() {
    useEffect(() => {
        const tabSlide = document.querySelector(".tab-slide");
        if (!tabSlide) return;

        const tabItems = Array.from(
            tabSlide.querySelectorAll("li.nav-tab-item")
        );

        function handleTabClick(this: HTMLElement) {
            tabItems.forEach((item) => item.classList.remove("active"));
            this.classList.add("active");
            updateTabSlideEffect();
        }

        tabItems.forEach((item) => {
            item.addEventListener("click", handleTabClick as EventListener);
        });

        window.addEventListener("resize", updateTabSlideEffect);

        // Initial update
        updateTabSlideEffect();

        // Cleanup
        return () => {
            tabItems.forEach((item) => {
                item.removeEventListener(
                    "click",
                    handleTabClick as EventListener
                );
            });
            window.removeEventListener("resize", updateTabSlideEffect);
        };
    }, []);
}

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
    lat?: number;
    long?: number;
    price: number;
    coordinates: [number, number];
    garages: number;
    city: string;
};

export default function MenuTab({ property }: { property: Property }) {
    useTabSlide();
    return (
        <div className="properties-menutab">
            <div className="tab-slide  mb_28">
                <ul
                    className="menu-tab d-flex align-items-center"
                    role="tablist"
                >
                    <li className="item-slide-effect"></li>
                    <li className="nav-tab-item " role="presentation">
                        <a
                            href="#gallery"
                            className="h5 tab-link active"
                            data-bs-toggle="tab"
                        >
                            Gallery
                        </a>
                    </li>
                    <li className="nav-tab-item" role="presentation">
                        <a
                            href="#floor-plans"
                            className="h5 tab-link "
                            data-bs-toggle="tab"
                        >
                            Floor Plans
                        </a>
                    </li>
                    <li className="nav-tab-item active" role="presentation">
                        <a
                            href="#location"
                            className="h5 tab-link "
                            data-bs-toggle="tab"
                        >
                            Location
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content">
                <div
                    className="tab-pane "
                    id="gallery"
                    role="tabpanel"
                >
                    <div className="properties-gallery">
                       <GallerySection />
                    </div>
                </div>
                <div className="tab-pane" id="floor-plans" role="tabpanel">
                    <div className="properties-floor">
                        <Floor2 />
                    </div>
                </div>
                <div className="tab-pane active show" id="location" role="tabpanel">
                    <div className="properties-location">
                        <Location property={property}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
