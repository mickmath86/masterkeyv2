"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { sendContact } from "@/actions/contactAction";

export default function FormContact() {
    const { pending } = useFormStatus();

    return (
        <div className="row tf-spacing-1 pb-0">
            <div className="col-md-6">
                <div className="box-contact">
                    <div className="heading mb_23">
                        <h4 className="mb_8">Reach Out To Us</h4>
                        <p>
                            We’re here to assist with any questions, concerns,
                            or inquiries—contact us today!
                        </p>
                    </div>
                    <ul className="info d-grid gap_20 mb_36">
                        <li>
                            <i className="icon icon-MapPin"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    Our Address:
                                </div>
                                <p>
                                    101 E 129th St, East Chicago, 2nd Floor, NY
                                </p>
                            </div>
                        </li>
                        <li>
                            <i className="icon icon-PhoneCall"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    Contact Us
                                </div>
                                <p>1-555-678-8888</p>
                            </div>
                        </li>
                        <li>
                            <i className="icon icon-Alarm"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    Email Address:
                                </div>
                                <a
                                    href="mailto:themesflat@gmail.com"
                                    className="link text_secondary-color text-body-default"
                                >
                                    themesflat@gmail.com
                                </a>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <h5 className="mb_12">Follow Us:</h5>
                        <ul className="tf-social d-flex gap_24">
                            <li>
                                <a href="#" className="icon-FacebookLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-XLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-TiktokLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-InstagramLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-YoutubeLogo"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <form className="form-contact" action={sendContact}>
                    <div className="heading mb_24">
                        <h4 className="mb_8">Get In Touch</h4>
                        <p>
                            We&apos;d love to hear from you! If you have any
                            questions
                        </p>
                    </div>

                    <div className="wrap mb_24">
                        <div className="tf-grid-layout md-col-2 mb_20">
                            <fieldset>
                                <label
                                    htmlFor="firstName"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label
                                    htmlFor="lastName"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    required
                                />
                            </fieldset>
                        </div>

                        <div className="tf-grid-layout md-col-2 mb_20">
                            <fieldset>
                                <label
                                    htmlFor="email"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    name="email"
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label
                                    htmlFor="phone"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    name="phone"
                                />
                            </fieldset>
                        </div>

                        <fieldset>
                            <label
                                htmlFor="message"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                placeholder="Your Message"
                                name="message"
                                required
                            ></textarea>
                        </fieldset>
                    </div>

                    <button
                        className="tf-btn btn-bg-1 btn-px-28 w-full"
                        type="submit"
                        disabled={pending}
                    >
                        <span>{pending ? "Sending..." : "Send Message"}</span>
                        <span className="bg-effect"></span>
                    </button>
                </form>
            </div>
        </div>
    );
}
