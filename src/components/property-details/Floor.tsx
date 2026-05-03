import Image from "next/image";
import React from "react";
import type { ListingDetail } from "@/types/listing";

type Props = {
    listing?: ListingDetail;
};

export default function Floor({ listing }: Props) {
    const hasFloorPlans = listing?.floorPlans && listing.floorPlans.length > 0;
    const hasDocuments = listing?.documents && listing.documents.length > 0;

    // Hide the entire section if there's nothing to show
    if (!hasFloorPlans && !hasDocuments) return null;

    const getDocIcon = (type: string) => {
        if (type === "pdf") return "icon-FilePdf";
        if (type === "doc") return "icon-FileDoc";
        return "icon-File";
    };

    return (
        <div className="properties-floor tf-spacing-8">
            {hasFloorPlans && (
                <>
                    <h5 className="properties-title mb_20">Floor Plans</h5>
                    <ul className="box-floor d-grid gap_20 mb_20" id="parent-floor">
                        {listing.floorPlans!.map((plan, index) => (
                            <li className="floor-item" key={index}>
                                <div
                                    role="button"
                                    className={`floor-header d-flex align-items-center justify-content-between${index > 0 ? " collapsed" : ""}`}
                                    data-bs-target={`#floor-${index}`}
                                    data-bs-toggle="collapse"
                                    aria-expanded={index === 0 ? "true" : "false"}
                                    aria-controls={`floor-${index}`}
                                >
                                    <div className="inner-left d-flex gap_8 align-items-center text_primary-color">
                                        <i className="icon icon-CaretDown"></i>
                                        <span className="text-button fw-7">{plan.label}</span>
                                    </div>
                                    <ul className="inner-right d-flex gap_20">
                                        {plan.beds !== undefined && (
                                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                                <i className="icon icon-Bed"></i>{plan.beds} Beds
                                            </li>
                                        )}
                                        {plan.baths !== undefined && (
                                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                                <i className="icon icon-Bathtub"></i>{plan.baths} Baths
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div
                                    id={`floor-${index}`}
                                    className={`collapse${index === 0 ? " show" : ""}`}
                                    data-bs-parent="#parent-floor"
                                >
                                    <div className="contnet">
                                        <div className="box-img">
                                            <Image
                                                src={plan.imageUrl}
                                                alt={plan.label}
                                                width={850}
                                                height={652}
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {hasDocuments && (
                <div className="wrap-download">
                    {listing.documents!.map((doc, index) => (
                        <a
                            key={index}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="attachments-item d-flex align-items-center gap_12 text-button fw-7 text_primary-color effect-icon"
                        >
                            <div className="icon">
                                <i className={getDocIcon(doc.type)}></i>
                            </div>
                            <span>{doc.label}</span>
                            <i className="icon-DownloadSimple"></i>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
