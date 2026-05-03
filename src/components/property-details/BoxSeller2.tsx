import Image from "next/image";
import React from "react";

export default function BoxSeller2() {
    return (
        <>
            <h5 className="mb_24">Contact Sellers</h5>
            <div className="author  mb_28">
                <div className="avatar  mb_28">
                    <Image
                        src="/assets/images/section/agent-3.jpg"
                        width={354}
                        height={354}
                        alt="avatar"
                    />
                </div>
                <div className="author-info d-flex flex-column">
                    <h6 className="mb_4">Jorge R.</h6>
                    <p className="mb_8">Senior Property Manager</p>
                    <p>
                        Jorge R. is an experienced agent known for friendly
                        service, local expertise, reliable property guidance
                        across and nearby areas.
                    </p>
                </div>
            </div>
            <div className="mb_28">
                <h6 className="mb_16">Infomation</h6>
                <ul className="info ">
                    <li className="item d-flex gap_12 mb_20">
                        <i className="icon icon-MapPin"></i>
                        <div>
                            <p className="text_primary-color mb_4">
                                6205 Peachtree Dunwoody Rd, <br />
                                Atlanta, GA 30328
                            </p>
                            <a
                                href="#"
                                className="hover-underline-link text-button fw-7 text_primary-color"
                            >
                                Get Directions
                            </a>
                        </div>
                    </li>
                    <li className="item d-flex gap_12 align-items-center">
                        <i className="icon icon-PhoneCall"></i>
                        <div>
                            <p className="text_primary-color">1-555-678-8888</p>
                            <p className="text_primary-color ">
                                1-555-678-8888
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <a href="#" className="tf-btn btn-bg-1 w-full mb_12">
                <span className="d-flex align-items-center gap_8">
                    <i className="icon-PhoneCall"></i>Call To Dealer
                </span>
                <span className="bg-effect"></span>
            </a>
            <a href="#" className="tf-btn w-full">
                <span className="d-flex align-items-center gap_8">
                    <i className="icon-ChatCircleDots"></i>Chat via WhatsApp
                </span>
                <span className="bg-effect"></span>
            </a>
        </>
    );
}
