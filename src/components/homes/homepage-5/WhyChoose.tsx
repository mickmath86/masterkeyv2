import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WhyChoose() {
    return (
        <div className="section-why-1 tf-spacing-1">
            <div className="tf-container">
                <div className="box-why">
                    <div className="tf-grid-layout lg-col-2 align-items-center">
                        <div className="thumbs tf-animate-1">
                            <Image
                                src="/assets/images/section/section-why.jpg"
                                width={610}
                                height={813}
                                alt="section-why"
                            />
                            <div
                                className="text-center item tf-animate-2 scroll-tranform"
                                data-distance="20%"
                            >
                                <div className="h1 mb_6">16</div>
                                <h5>Years Of Experience</h5>
                            </div>
                        </div>
                        <div className="content-inner">
                            <div className="heading-section mb_48">
                                <span className="sub text-uppercase fw-6 split-text effect-rotate">
                                    Why CHoose Us
                                </span>
                                <h3 className="split-text effect-blur-fade">
                                    Experience The Difference With Our Solutions
                                </h3>
                            </div>
                            <div className="wrap-icon">
                                <div className="tf-box-icon style-2 v2 effect-icon scrolling-effect effectLeft ">
                                    <div className="icon">
                                        <i className="icon-Lifebuoy"></i>
                                    </div>
                                    <div className="content">
                                        <h5 className="mb_8">
                                            Personalized Support
                                        </h5>
                                        <p className="text_secondary-color-2">
                                            Receive tailored assistance from our
                                            experienced team to ensure every
                                            step fits your specific needs and
                                            goals.
                                        </p>
                                    </div>
                                </div>
                                <div className="tf-box-icon style-2 v2 effect-icon scrolling-effect effectLeft ">
                                    <div className="icon">
                                        <i className="icon-ClockCountdown"></i>
                                    </div>
                                    <div className="content">
                                        <h5 className="mb_8">
                                            Time-Saving Process
                                        </h5>
                                        <p className="text_secondary-color-2">
                                            From quick callbacks to streamlined
                                            procedures, we value your time and
                                            help you move forward without
                                            delays.
                                        </p>
                                    </div>
                                </div>
                                <div className="tf-box-icon style-2 v2 effect-icon scrolling-effect effectLeft ">
                                    <div className="icon">
                                        <i className="icon-SketchLogo"></i>
                                    </div>
                                    <div className="content">
                                        <h5 className="mb_8">
                                            Trusted Expertise
                                        </h5>
                                        <p className="text_secondary-color-2">
                                            Work with professionals who bring
                                            deep industry knowledge and proven
                                            strategies to guide your decisions
                                            confidently.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href={"/about-us"}
                                className="tf-btn btn-bg-1 btn-px-32 scrolling-effect effectBottom"
                            >
                                <span>About Us</span>
                                <span className="bg-effect"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
