"use client";
import React, { useEffect } from "react";
import Overview from "./Overview";
import Description from "./Description";
import PropertiesUtility from "./Utility";
import Video from "./Video";
import Caculator from "./Caculator";
import Floor from "./Floor";
import Location from "./Location";
import Nearby from "./Nearby";
import FormComments from "../common/FormComments";
import BoxSeller1 from "./BoxSeller1";
import BoxFilter from "./BoxFilter";
import Hero from "./Hero";
import Comment from "../common/Comment";

type Property = {
    id: number;
    imgSrc: string;
    imgSrc2?: string;
    imgSrc3?: string;
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
    filterOptions?: string[];
    features?: string[];
    price: number;
    coordinates: [number, number];
    garages: number;
    city: string;
};

function useOneNavOnePage() {
    useEffect(() => {
        const sectionOnepage = document.querySelector(".section-onepage");
        if (!sectionOnepage) return;

        const navLinks = Array.from(
            document.querySelectorAll<HTMLAnchorElement>(".nav_link")
        );
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>(".section")
        );

        const handleClick = (e: Event) => {
            e.preventDefault();
            const target = (e.currentTarget as HTMLAnchorElement).getAttribute(
                "href"
            );
            if (target) {
                const el = document.querySelector(target);
                if (el) {
                    window.scrollTo({
                        top: el.getBoundingClientRect().top + window.scrollY,
                        behavior: "auto",
                    });
                }
            }
        };

        navLinks.forEach((link) => {
            link.addEventListener("click", handleClick);
        });

        const updateActiveMenu = () => {
            const scrollTop = window.scrollY;
            let current = "";
            sections.forEach((section) => {
                const top = section.offsetTop - 200;
                const bottom = top + section.offsetHeight;
                if (scrollTop >= top && scrollTop < bottom) {
                    current = section.id;
                }
            });
            navLinks.forEach((link) => {
                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        };

        window.addEventListener("scroll", updateActiveMenu);
        updateActiveMenu();

        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener("click", handleClick);
            });
            window.removeEventListener("scroll", updateActiveMenu);
        };
    }, []);
}
export default function PropertyDetails3({ property }: { property: Property }) {
    useOneNavOnePage();
    return (
        <div className="section-onepage">
            <div className="properties-details">
                <div className="properties-hero">
                    <Hero property={property}/>
                </div>
                <div className="properties-menut-list">
                    <div className="tf-container">
                        <ul className="tab-slide overflow-x-auto" id="navbar">
                            <li className="text-button nav-tab-item text_primary-color active">
                                <a href="#overview" className="nav_link">
                                    Overview
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a
                                    href="#property-utility"
                                    className="nav_link"
                                >
                                    Property Utility
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#video" className="nav_link">
                                    Video
                                </a>
                            </li>

                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#loan-calculator" className="nav_link">
                                    Loan Calculator
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#floor-plans" className="nav_link">
                                    Floor Plans
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#location" className="nav_link">
                                    Location
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#nearby" className="nav_link">
                                    What’s Nearby?
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a
                                    href="#customer-reviews"
                                    className="nav_link"
                                >
                                    Customer Reviews
                                </a>
                            </li>
                            <li className="text-button nav-tab-item text_primary-color">
                                <a href="#reviews" className="nav_link">
                                    Reviews
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tf-container tf-spacing-7">
                    <div className="row">
                        <div className="col-lg-8">
                            <div id="overview" className="section tf-spacing-9">
                                <div className="properties-overview v3 properties-2  tf-spacing-8">
                                    <Overview />
                                </div>
                                <div className="tf-spacing-9">
                                    <div className="properties-description properties-2">
                                        <Description />
                                    </div>
                                </div>
                            </div>
                            <div
                                id="property-utility"
                                className="tf-spacing-9 section"
                            >
                                <div className="properties-utility tf-spacing-8 properties-2">
                                    <PropertiesUtility />
                                </div>
                            </div>

                            <div id="video" className="tf-spacing-9 section">
                                <div className="properties-video properties-2">
                                    <Video property={property} />
                                </div>
                            </div>

                            <div
                                id="loan-calculator"
                                className="properties-calculator v2 section tf-spacing-9"
                            >
                                <div className="properties-calculator">
                                    <Caculator />
                                </div>
                            </div>

                            <div
                                id="floor-plans"
                                className="section tf-spacing-9"
                            >
                                <div className="properties-floor properties-2">
                                    <Floor />
                                </div>
                            </div>

                            <div
                                id="location"
                                className="section  tf-spacing-9"
                            >
                                <div className="properties-location v2 properties-2">
                                    <Location property={property} />
                                </div>
                            </div>
                            <div id="nearby" className="section tf-spacing-9">
                                <div className="properties-nearby properties-2">
                                    <Nearby />
                                </div>
                            </div>

                            <div className="tf-spacing-9">
                                <div className="properties-2 ">
                                    <div
                                        id="customer-reviews"
                                        className="section"
                                    >
                                        <Comment />
                                    </div>
                                    <div id="reviews" className="section">
                                        <FormComments />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 tf-spacing-9">
                            <div className="wrap-sidebar-right">
                                <div className="box-sellers style-no-border  mb_30">
                                    <BoxSeller1 />
                                </div>
                                <div className="tf-filter-sidebar ms-lg-auto style-2">
                                    <BoxFilter />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
