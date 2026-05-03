import React from "react";

export default function Nearby() {
    return (
        <>
            <h5 className="properties-title mb_20">What’s Nearby?</h5>
            <p className="text-body-2">
                Whether you&apos;re raising a family or enjoying a peaceful
                retreat, you&#39;ll appreciate the close proximity to essential
                services, green spaces, and entertainment options.
            </p>
            <div className="wrap ">
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">School:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.7 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Supermarket:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Clinic:</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.6 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Park:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.1 Km
                        </span>
                    </li>
                </ul>
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">
                            Sports Stadium:
                        </span>
                        <span className="text-button fw-7 text_primary-color">
                            0.4 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Pharmacy:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.8 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Café:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Shopping:</span>
                        <span className="text-button fw-7 text_primary-color">
                            2.1 Km
                        </span>
                    </li>
                </ul>
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">Center::</span>
                        <span className="text-button fw-7 text_primary-color">
                            0.4 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">City Center:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.8 Km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Vineyard:</span>
                        <span className="text-button fw-7 text_primary-color">
                            1.3 Km
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
}
