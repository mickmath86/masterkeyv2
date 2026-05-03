import Image from "next/image";
import React from "react";

export default function BoxSeller3() {
    return (
        <>
            <h5 className="properties-title mb_24">Contact Sellers</h5>
            <div className="box-sellers style-2">
                <div className="wrap-author">
                    <div className="author d-flex align-items-start">
                        <div className="avatar">
                            <Image
                                src="/assets/images/avatar/avatar-10.jpg"
                                width={100}
                                height={100}
                                alt="avatar"
                            />
                        </div>
                        <div className="author-info d-flex flex-column">
                            <h6 className="mb_8">Jorge R.</h6>
                            <span className="text-body-default">
                                1-555-678-8888
                            </span>
                            <a
                                href="#"
                                className="text_secondary-color text-body-default link"
                            >
                                themesflat@gmail.com
                            </a>
                        </div>
                    </div>
                    <ul className="info ">
                        <li className="item d-flex gap_12">
                            <i className="icon icon-MapPin"></i>
                            <div>
                                <p className="text_primary-color mb_4">
                                    6205 Peachtree Dunwoody <br /> Rd, Atlanta,
                                    GA 30328
                                </p>
                                <a
                                    href="#"
                                    className="hover-underline-link text-button fw-7 text_primary-color"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </li>
                        <li className="item d-flex gap_12">
                            <i className="icon icon-PhoneCall"></i>
                            <div>
                                <p className="text_primary-color">
                                    1-555-678-8888
                                </p>
                                <p className="text_primary-color">
                                    1-555-678-8888
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="wrap-btn">
                    <a href="#" className="tf-btn btn-bg-1 w-full mb_12">
                        <span className="d-flex align-items-center gap_8">
                            <i className="icon-PhoneCall"></i>Call To Dealer
                        </span>
                        <span className="bg-effect"></span>
                    </a>
                    <a href="#" className="tf-btn w-full">
                        <span className="d-flex align-items-center gap_8">
                            <i className="icon-ChatCircleDots"></i>Chat via
                            WhatsApp
                        </span>
                        <span className="bg-effect"></span>
                    </a>
                </div>
            </div>
        </>
    );
}
