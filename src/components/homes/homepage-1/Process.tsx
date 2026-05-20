import React from "react";

export default function Process() {
    return (
        <div className="section-process-1">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/lynn-ranch-banner.png") center center / cover no-repeat',
                    position: 'relative',
                }}
            >
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2))',
                        pointerEvents: 'none',
                    }}
                />
                <div className="tf-container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="box scrolling-effect effectFade">
                        <div className="heading-section mb_32">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                Our Process
                            </span>
                            <h3>Homebuying Steps</h3>
                        </div>
                        <div className="wrap-process">
                            <div className="process-item style-1">
                                <span className="number h5">01.</span>
                                <div className="content">
                                    <h5 className="mb_8">
                                        Discover Your Dream Home
                                    </h5>
                                    <p>
                                        Browse through a curated selection of
                                        properties tailored to your lifestyle
                                        and budget.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">02.</span>
                                <div className="content">
                                    <h5 className="mb_8">Schedule A Viewing</h5>
                                    <p>
                                        Book a tour at your convenience and
                                        explore the space in person or
                                        virtually.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">03.</span>
                                <div className="content">
                                    <h5 className="mb_8">Seal The Deal</h5>
                                    <p>
                                        Get expert guidance to finalize
                                        paperwork and move into your new home
                                        with confidence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
