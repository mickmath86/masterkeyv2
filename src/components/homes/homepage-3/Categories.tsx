import Image from "next/image";
import React from "react";

type Category = {
    name: string;
    image: string;
    width: number;
    height: number;
    properties: number;
    delay: string;
    grid: "3" | "2";
};

const categories: Category[] = [
    {
        name: "Apartment",
        image: "/assets/images/section/category-1.png",
        width: 410,
        height: 410,
        properties: 263,
        delay: "0.1",
        grid: "3",
    },
    {
        name: "Townhouse",
        image: "/assets/images/section/category-2.png",
        width: 410,
        height: 410,
        properties: 263,
        delay: "0.2",
        grid: "3",
    },
    {
        name: "Villa",
        image: "/assets/images/section/category-3.png",
        width: 410,
        height: 410,
        properties: 263,
        delay: "0.3",
        grid: "3",
    },
    {
        name: "Office",
        image: "/assets/images/section/category-4.png",
        width: 630,
        height: 410,
        properties: 263,
        delay: "0.5",
        grid: "2",
    },
    {
        name: "Penthouse",
        image: "/assets/images/section/category-5.png",
        width: 630,
        height: 410,
        properties: 263,
        delay: "0.4",
        grid: "2",
    },
];

export default function Categories() {
    const grid3 = categories.filter((cat) => cat.grid === "3");
    const grid2 = categories.filter((cat) => cat.grid === "2");

    return (
        <div className="section-categories tf-spacing-1">
            <div className="tf-container">
                <div className="wrap-heading-section d-flex justify-content-between align-items-end mb_48">
                    <div className="heading-section ">
                        <span className="sub text-uppercase fw-6 split-text effect-rotate">
                            Filter by Type
                        </span>
                        <h3 className="split-text effect-blur-fade">
                            Properties By Type
                        </h3>
                    </div>
                    <a
                        href="#"
                        className="hover-underline-link text-button fw-7 text_primary-color split-text split-lines-transform"
                    >
                        View All Type
                    </a>
                </div>
                <div className="tf-grid-layout md-col-3 gap_30 mb_30">
                    {grid3.map((cat, idx) => (
                        <div
                            className="category-item scrolling-effect effectFade"
                            data-delay={cat.delay}
                            key={idx}
                        >
                            <a href="#" className="img-style">
                                <Image
                                    src={cat.image}
                                    width={cat.width}
                                    height={cat.height}
                                    alt="category"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href="#"
                                    className="mb_8 h5 text_primary-color"
                                >
                                    {cat.name}
                                </a>
                                <p>{cat.properties} properties</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="tf-grid-layout md-col-2 gap_30">
                    {grid2.map((cat, idx) => (
                        <div
                            className="category-item scrolling-effect effectFade"
                            data-delay={cat.delay}
                            key={idx}
                        >
                            <a href="#" className="img-style">
                                <Image
                                    src={cat.image}
                                    width={cat.width}
                                    height={cat.height}
                                    alt="category"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href="#"
                                    className="mb_8 h5 text_primary-color"
                                >
                                    {cat.name}
                                </a>
                                <p>{cat.properties} properties</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
