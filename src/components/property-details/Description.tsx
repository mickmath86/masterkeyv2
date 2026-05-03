"use client";
import React, { useState } from "react";
import type { ListingDetail } from "@/types/listing";

const TRUNCATE_LENGTH = 400;

type Props = {
    listing?: ListingDetail;
};

export default function Description({ listing }: Props) {
    const [expanded, setExpanded] = useState(false);
    const text = listing?.description || "";
    const isLong = text.length > TRUNCATE_LENGTH;
    const displayText = isLong && !expanded ? text.slice(0, TRUNCATE_LENGTH) + "…" : text;

    if (!text) return null;

    return (
        <div>
            <h5 className="properties-title mb_20">Description</h5>
            <p className="mb_8 text-body-2">{displayText}</p>
            {isLong && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="hover-underline-link text_primary-color text-button"
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                >
                    {expanded ? "Show Less" : "View More"}
                </button>
            )}
        </div>
    );
}
