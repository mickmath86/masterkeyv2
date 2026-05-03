import React from "react";

export default function Overview2() {
    return (
        <>
            <h5 className="properties-title mb_20 ">Overview</h5>
            <div className="wrap-overview">
                <div className="item d-flex gap_16">
                    <i className="icon icon-HouseSimple"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">ID:</span>
                        <span className="text-title fw-6 text_primary-color">
                            423146
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-SlidersHorizontal"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Type:</span>
                        <span className="text-title fw-6 text_primary-color">
                            Villa
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Bed"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Bedrooms:</span>
                        <span className="text-title fw-6 text_primary-color">
                            3 Rooms
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Shower"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Bathrooms:</span>
                        <span className="text-title fw-6 text_primary-color">
                            3 Rooms
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Warehouse"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Garages:</span>
                        <span className="text-title fw-6 text_primary-color">
                            Yes
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Ruler"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Size:</span>
                        <span className="text-title fw-6 text_primary-color">
                            3,200 SqFt
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Crop"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Land area:</span>
                        <span className="text-title fw-6 text_primary-color">
                            4,200 SqFt
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-CalendarBlank"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Year Built:</span>
                        <span className="text-title fw-6 text_primary-color">
                            2024
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
