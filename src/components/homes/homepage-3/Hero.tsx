import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";
import Image from "next/image";
import React from "react";

export default function Hero() {
    return (
        <div className="page-title style-3">
            <div className="thumbs">
                <Image
                    src="/assets/images/page-title/page-title-6.jpg"
                    width={1920}
                    height={1000}
                    alt="page-title"
                    priority
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h1 className="title text_primary-color fw-5 mb_25 split-text split-words-scale">
                        Find The Best Place
                    </h1>
                    <p className="h6 text_secondary-color split-text split-lines-transform">
                        This stunning coastal villa in Malibu offers panoramic
                        ocean views, open-
                        <br />
                        concept living, and elegant modern design.
                    </p>
                </div>
            </div>
            <SidebarFilterDefault />
        </div>
    );
}
