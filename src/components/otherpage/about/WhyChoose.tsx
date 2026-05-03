import React from "react";

const features = [
    {
        icon: "icon-Lifebuoy",
        title: "Personalized Support",
        description:
            "Receive tailored assistance from our experienced team to ensure every step fits your specific needs and goals.",
    },
    {
        icon: "icon-ClockCountdown",
        title: "Time-Saving Process",
        description:
            "From quick callbacks to streamlined procedures, we value your time and help you move forward without delays.",
    },
    {
        icon: "icon-SketchLogo",
        title: "Trusted Expertise",
        description:
            "Work with professionals who bring deep industry knowledge and proven strategies to guide your decisions confidently.",
    },
];

export default function WhyChoose() {
    return (
        <div className="tf-container">
            <div className="wrap-heading-section d-flex justify-content-between align-items-center mb_48">
                <div className="heading-section">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                        Why Choose Us
                    </span>
                    <h3 className="text_white split-text effect-blur-fade">
                        Experience The Difference <br />
                        With Our Solutions
                    </h3>
                </div>
                <a href="#" className="tf-btn btn-bg-white btn-px-32">
                    <span>Contact Us</span>
                    <span className="bg-effect"></span>
                </a>
            </div>
            <div className="tf-grid-layout md-col-3">
                {features.map((item, index) => (
                    <div className="tf-box-icon style-2" key={index}>
                        <div className="icon mb_24">
                            <i className={item.icon}></i>
                        </div>
                        <div className="content">
                            <h5 className="text_white mb_8">{item.title}</h5>
                            <p className="text_secondary-color-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
