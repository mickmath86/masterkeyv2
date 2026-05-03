import React from "react";

export default function Banner1() {
    return (
        <div className="banner">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/section/banner.jpg")',
                }}
            >
                <div className="tf-container z-5">
                    <h2 className="text_white mb_20">
                        Find Your Property, <br />
                        Start Your Homeownership Journey Today
                    </h2>
                    <p className="text_white text-body-1">
                        Connect with your Designer in minutes
                    </p>
                </div>
            </div>
        </div>
    );
}
