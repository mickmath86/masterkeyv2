import React from "react";

const pricingData = [
    {
        name: "Basic Plan",
        subtitle: "Ideal for first-time sellers.",
        price: "$55",
        buttonClass: "tf-btn btn-border w-full",
        description: "Perfect for individuals exploring the market.",
        features: [
            "5 property listings/month",
            "Email support",
            "Basic analytics dashboard",
            "Profile customization",
        ],
        featureGap: "gap_6",
        center: false,
        tag: null,
    },
    {
        name: "Standard Plan",
        subtitle: "Balanced service for serious sellers.",
        price: "$95",
        buttonClass: "tf-btn btn-bg-1 w-full",
        description: "Ideal for active buyers or small investors.",
        features: [
            "15 property listings/month",
            "Priority email support",
            "Advanced market insights",
            "Save & compare properties",
        ],
        featureGap: "gap_8",
        center: true,
        tag: {
            icon: "icon-FacebookLogo",
            text: "Most popular",
            className:
                "tag d-flex gap_4 text_primary-color text-button-small align-items-center",
        },
    },
    {
        name: "Enterprise Plan",
        subtitle: "Maximum visibility and full support.",
        price: "$129",
        buttonClass: "tf-btn btn-border w-full",
        description: "Tailored for agencies and large-scale investors.",
        features: [
            "Unlimited listings with premium",
            "Dedicated account manager",
            "API access & integrations",
            "White-label branding options",
        ],
        featureGap: "gap_6",
        center: false,
        tag: null,
    },
];

export default function OurPricing() {
    return (
        <div className="tf-container tf-spacing-1">
            <div className="heading-section justify-content-center text-center mb_48">
                <span className="sub text-label text-uppercase fw-6 text_secondary-color-2">
                    Pricing
                </span>
                <h3>
                    Guaranteed Press Coverage <br />
                    Or Your Money Back
                </h3>
            </div>
            <div className="tf-grid-layout lg-col-3">
                {pricingData.map((plan, idx) => (
                    <div
                        className={`pricing-item${
                            plan.center ? " center" : ""
                        }`}
                        key={idx}
                    >
                        {plan.tag && (
                            <div className={plan.tag.className}>
                                <i className={plan.tag.icon}></i>
                                {plan.tag.text}
                            </div>
                        )}
                        <div className="heading d-grid gap_8 mb_24">
                            <h5>{plan.name}</h5>
                            <p>{plan.subtitle}</p>
                            <h3>{plan.price}</h3>
                        </div>
                        <a href="#" className={plan.buttonClass}>
                            <span>Choose The Package</span>
                            <span className="bg-effect"></span>
                        </a>
                        <div className="content">
                            <div className="text-title fw-6 text_primary-color text-capitalize mb_19">
                                {plan.description}
                            </div>
                            <ul className="list">
                                {plan.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className={`d-flex align-items-center ${plan.featureGap} text_primary-color text-body-default`}
                                    >
                                        <i className="icon-CheckCircle"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
