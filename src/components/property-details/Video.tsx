"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import ModalVideo from "../common/ModalVideo";

type Property = {
    id: number;
    imgSrc: string;
};

export default function Video({ property }: { property: Property }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleVideoClick = useCallback(() => {
        setIsOpen(true);
    }, []);

    return (
        <>
            <h5 className="properties-title mb_20">Video</h5>
            <div className="widget-video" style={{ position: "relative" }}>
                <Image
                    data-src={property.imgSrc}
                    src={property.imgSrc}
                    alt={property.imgSrc}
                    width={850}
                    height={400}
                />

                <div
                    onClick={handleVideoClick}
                    data-fancybox="gallery2"
                    className="btn-video popup-youtube"
                    aria-label="Play Video"
                >
                    <img src="/assets/icons/play.svg" alt="play" />
                </div>
            </div>
            <ModalVideo
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                videoId={"XHOmBV4js_E"}
            />
        </>
    );
}
