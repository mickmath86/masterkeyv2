"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import ModalVideo from "../common/ModalVideo";
import type { ListingDetail } from "@/types/listing";

type Props = {
    listing?: ListingDetail;
};

function extractYouTubeId(url: string): string | null {
    if (!url) return null;
    const patterns = [
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pat of patterns) {
        const match = url.match(pat);
        if (match) return match[1];
    }
    return null;
}

export default function Video({ listing }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const videoId = listing?.videoUrl ? extractYouTubeId(listing.videoUrl) : null;

    // Hide entire section if no video
    if (!videoId) return null;

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const handleVideoClick = useCallback(() => setIsOpen(true), []);

    return (
        <>
            <div className="properties-video tf-spacing-8">
                <h5 className="properties-title mb_20">Video Tour</h5>
                <div className="widget-video" style={{ position: "relative" }}>
                    <Image
                        src={thumbnailUrl}
                        alt="Video thumbnail"
                        width={850}
                        height={480}
                        unoptimized
                        style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                    <div
                        onClick={handleVideoClick}
                        className="btn-video popup-youtube"
                        aria-label="Play Video"
                        role="button"
                        style={{ cursor: "pointer" }}
                    >
                        <img src="/assets/icons/play.svg" alt="play" />
                    </div>
                </div>
            </div>
            <ModalVideo setIsOpen={setIsOpen} isOpen={isOpen} videoId={videoId} />
        </>
    );
}
