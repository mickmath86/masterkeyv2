import Image from "next/image";
import React from "react";

export default function Location() {
    return (
        <div className="section-location tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Explore Cities
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Our Location For You
                    </h3>
                </div>
                <div className="wrap-location">
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href="#" className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/location-1.jpg"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href="#"
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Los Angeles, CA
                                    </a>
                                    <p>221 Property</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href="#" className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/location-2.jpg"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href="#"
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        New York City, NY
                                    </a>
                                    <p>128 Property</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href="#" className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/assets/images/section/location-3.jpg"
                                    alt="location"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href="#"
                                    className="mb_4 link h5 text_primary-color"
                                >
                                    Miami, FL
                                </a>
                                <p>234 Property</p>
                            </div>
                        </div>
                    </div>
                    <div className="tf-grid-layout lg-col-2">
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href="#" className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/assets/images/section/location-4.jpg"
                                    alt="location"
                                />
                            </a>
                            <div className="content">
                                <a
                                    href="#"
                                    className="mb_4 link h5 text_primary-color"
                                >
                                    Chicago, IL
                                </a>
                                <p>231 Property</p>
                            </div>
                        </div>
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href="#" className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/location-5.jpg"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href="#"
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        San Francisco, CA
                                    </a>
                                    <p>221 Property</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href="#" className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/location-6.jpg"
                                        alt="location"
                                    />
                                </a>
                                <div className="content">
                                    <a
                                        href="#"
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Boston, MA
                                    </a>
                                    <p>128 Property</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
