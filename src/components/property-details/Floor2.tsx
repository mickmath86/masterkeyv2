import Image from "next/image";
import React from "react";

export default function Floor2() {
    return (
        <>
            <h5 className="properties-title mb_20">Floor Plans</h5>
            <ul className="box-floor d-grid gap_20 mb_20" id="parent-floor">
                <li className="floor-item">
                    <div
                        role="button"
                        className="floor-header d-flex align-items-center justify-content-between"
                        data-bs-target="#floor-one"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="floor-one"
                    >
                        <div className="inner-left d-flex gap_8 align-items-center text_primary-color">
                            <i className="icon icon-CaretDown"></i>
                            <span className="text-button fw-7">
                                First Floor
                            </span>
                        </div>
                        <ul className="inner-right d-flex gap_20">
                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                <i className="icon icon-Bed"></i>3 Beds
                            </li>
                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                <i className="icon icon-Bathstub"></i>2 Baths
                            </li>
                        </ul>
                    </div>
                    <div
                        id="floor-one"
                        className="collapse show"
                        data-bs-parent="#parent-floor"
                    >
                        <div className="contnet">
                            <div className="box-img">
                                <Image
                                    src="/assets/images/section/floor-2.png"
                                    alt="img-floor"
                                    width={850}
                                    height={652}
                                />
                            </div>
                        </div>
                    </div>
                </li>
                <li className="floor-item">
                    <div
                        className="floor-header d-flex align-items-center justify-content-between collapsed"
                        role="button"
                        data-bs-target="#floor-two"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="floor-two"
                    >
                        <div className="inner-left d-flex gap_8 align-items-center text_primary-color">
                            <i className="icon icon-CaretDown"></i>
                            <span className="text-button fw-7">
                                Second Floor
                            </span>
                        </div>
                        <ul className="inner-right d-flex gap_20">
                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                <i className="icon icon-Bed"></i>3 Beds
                            </li>
                            <li className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                                <i className="icon icon-Bathstub"></i>2 Baths
                            </li>
                        </ul>
                    </div>
                    <div
                        id="floor-two"
                        className="collapse"
                        data-bs-parent="#parent-floor"
                    >
                        <div className="contnet">
                            <div className="box-img">
                                <Image
                                    src="/assets/images/section/floor-2.png"
                                    alt="img-floor"
                                    width={850}
                                    height={652}
                                />
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="wrap-download">
                <a
                    href="#"
                    target="_blank"
                    className="attachments-item d-flex align-items-center gap_12 text-button fw-7 text_primary-color effect-icon"
                >
                    <div className="icon">
                        <i className="icon-FilePdf"></i>
                    </div>
                    <span>Villa-Document.Pdf</span>
                    <i className="icon-DownloadSimple"></i>
                </a>
                <a
                    href="#"
                    target="_blank"
                    className="attachments-item d-flex align-items-center gap_12 text-button fw-7 text_primary-color effect-icon"
                >
                    <div className="icon">
                        <i className="icon-FileDoc"></i>
                    </div>
                    <span>Villa-Document.Pdf</span>
                    <i className="icon-DownloadSimple"></i>
                </a>
            </div>
        </>
    );
}
