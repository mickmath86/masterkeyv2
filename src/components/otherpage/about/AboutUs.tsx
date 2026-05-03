import React from "react";
import OdometerCounter from "@/components/common/Odometer";
export default function AboutUs() {
    return (
        <div className="tf-container section-about">
            <div className="heading-section justify-content-center text-center mb_48">
                <span className="sub text-uppercase fw-6">About Us</span>
                <h3 className="split-text split-lines-rotation-x">
                    Your Reliable Partner In Real <br /> Estate Success
                </h3>
            </div>
            <div
                className="parallaxie"
                style={{
                    background:
                        'url("/assets/images/section/section-about.jpg")',
                }}
            >
                <div className="content">
                    <div className="wrap d-flex flex-column">
                        <div className="tf-box-icon style-1">
                            <div className="heading d-flex justify-content-between mb_19">
                                <div className="counter-item style-default h2">
                                    <OdometerCounter value={112} />
                                </div>
                                <div className="icon">
                                    <i className="icon-Certificate"></i>
                                </div>
                            </div>
                            <h6 className="text_secondary-color sub">
                                Awards Received
                            </h6>
                        </div>
                        <div className="d-flex gap_12 bot">
                            <div className="tf-box-icon style-1">
                                <div className="heading d-flex justify-content-between mb_19">
                                    <div className="counter-item style-default h2">
                                        <OdometerCounter value={85} />
                                    </div>
                                    <div className="icon">
                                        <i className="icon-BuildingOffice"></i>
                                    </div>
                                </div>
                                <h6 className="text_secondary-color sub">
                                    Satisfied Clients
                                </h6>
                            </div>
                            <div className="tf-box-icon style-1">
                                <div className="heading d-flex justify-content-between mb_19">
                                    <div className="counter-item style-default h2">
                                        <OdometerCounter value={66} />
                                    </div>
                                    <div className="icon">
                                        <i className="icon-ChartDonut"></i>
                                    </div>
                                </div>
                                <h6 className="text_secondary-color sub">
                                    Monthly Traffic
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tf-grid-layout md-col-2">
                <div className="box">
                    <h4 className="title d-flex gap_12 align-items-center mb_20">
                        <i className="icon-Crown"></i>
                        Our Mission
                    </h4>
                    <p className="mb_8">
                        To simplify the real estate journey by connecting people
                        with the right properties through trust, transparency,
                        and technology.
                    </p>
                    <p>
                        We are committed to delivering personalized experiences,
                        whether you&#39;re buying, selling, or renting. We
                        embrace new technologies and market trends to deliver
                        smarter, faster, and more efficient property solutions.
                    </p>
                </div>
                <div className="box">
                    <h4 className="title d-flex gap_12 align-items-center mb_20">
                        <i className="icon-Target"></i>
                        Our Vision
                    </h4>
                    <p className="mb_8">
                        To become the most trusted real estate partner by
                        redefining how people discover, evaluate, and engage
                        with properties.
                    </p>
                    <p>
                        We envision a future where every individual can find
                        their ideal home or investment with confidence,
                        supported by innovation, integrity, and a deep
                        understanding of market needs.
                    </p>
                </div>
            </div>
        </div>
    );
}
