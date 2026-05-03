import DropdownSelect2 from "@/components/common/DropdownSelect2";
import Image from "next/image";
import React from "react";
import { submitCallback } from "@/actions/callbackAction";

export default function CallBack() {
    return (
        <div className="section-call-back tf-spacing-6">
            <div className="tf-container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="left">
                            <div className="heading-section mb_40">
                                <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                                    Get A Call Back
                                </span>
                                <h3 className="split-text effect-blur-fade">
                                    Need Help? We’ll Call You
                                </h3>
                                <p className="text-body-2 split-text split-lines-transform">
                                    Have questions or need assistance? Just
                                    leave your details and our team will get in
                                    touch shortly to help you out.
                                </p>
                            </div>
                            <div className="info tf-grid-layout md-col-2">
                                <div className="item effect-icon scrolling-effect effectBottom">
                                    <div className="icon">
                                        <i className="icon-PhoneCall"></i>
                                    </div>
                                    <div>
                                        <div className="text-title fw-6 text_primary-color mb_4">
                                            Contact Us
                                        </div>
                                        <p>1-555-678-8888</p>
                                    </div>
                                </div>
                                <div
                                    className="item effect-icon  scrolling-effect effectBottom"
                                    data-delay="0.2"
                                >
                                    <div className="icon">
                                        <i className="icon-Alarm"></i>
                                    </div>
                                    <div>
                                        <div className="text-title fw-6 text_primary-color mb_4">
                                            Email Address:
                                        </div>
                                        <a
                                            href="#"
                                            className="link text_secondary-color text-body-default"
                                        >
                                            themesflat@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <form
                            className="form-call-back scrolling-effect effectRight"
                            action={submitCallback}
                        >
                            <div className="tf-grid-layout sm-col-2 gap_20 mb_20">
                                <fieldset>
                                    <label
                                        htmlFor="fullName"
                                        className="text-button text_primary-color fw-7 mb_8"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        className=""
                                        id="fullName"
                                        type="text"
                                        placeholder="Full Name"
                                        name="text"
                                        tabIndex={2}
                                        aria-required={true}
                                        required
                                    />
                                </fieldset>
                                <fieldset>
                                    <label
                                        htmlFor="email"
                                        className="text-button text_primary-color fw-7 mb_8"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className=""
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        name="email"
                                        tabIndex={2}
                                        aria-required={true}
                                        required
                                    />
                                </fieldset>
                            </div>
                            <div className="tf-grid-layout sm-col-2 gap_20 mb_24">
                                <fieldset>
                                    <label
                                        htmlFor="phone"
                                        className="text-button text_primary-color fw-7 mb_8"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        className=""
                                        id="phone"
                                        type="number"
                                        placeholder="Enter your phone number"
                                        name="text"
                                        tabIndex={2}
                                        aria-required={true}
                                        required
                                    />
                                </fieldset>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        How Can We Help You?
                                    </div>
                                    <DropdownSelect2
                                        options={[
                                            "Investing in Real Estate",
                                            "Buying a Home",
                                            "Selling a Property",
                                            "Financing Options",
                                            "Other",
                                        ]}
                                    />
                                </div>
                            </div>
                            <button
                                className="tf-btn btn-bg-1 btn-px-28 w-full"
                                type="submit"
                            >
                                <span>Get A Call Back</span>
                                <span className="bg-effect"></span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="banner">
                    <Image
                        src="/assets/images/section/banner-4.jpg"
                        width={1290}
                        height={660}
                        alt="banner"
                    />
                </div>
            </div>
        </div>
    );
}
