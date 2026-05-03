import React from "react";
import OdometerCounter from "@/components/common/Odometer";
export default function Banner() {
    return (
        <div className="banner-2">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/section/banner-2.jpg")',
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
        </div>
    );
}
