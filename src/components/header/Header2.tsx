"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import Offcanvas from "../common/Offcanvas";

export default function Header2() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <header className="header style-1 header-fixed">
                <div className="tf-container w-lg">
                    <div className="header-inner">
                        <div
                            className="mobile-button d-xl-none"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <div className="burger">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <Nav />
                        <div className="header-right d-flex align-items-center gap_20">
                            <Link
                                href={"/login"}
                                className="link text-button text_white"
                            >
                                Login/Regiser
                            </Link>
                            <a
                                href="#"
                                className="tf-btn btn-bg-primary-2 sm-hide"
                            >
                                <span>Submit Property</span>
                                <span className="bg-effect"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Offcanvas menu */}
            <div className="mobile-nav-wrap">
                <Offcanvas
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                >
                    <div className="offcanvas-header top-nav-mobile">
                        <div className="offcanvas-title">
                            <Link href="/" className="site-logo">
                                <Image
                                    src="/assets/images/logo/logo.png"
                                    alt="logo"
                                    className="main-logo"
                                    width={193}
                                    height={44}
                                />
                            </Link>
                        </div>
                        <div
                            className="btn-close-menu"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="icon-times-solid"></i>
                        </div>
                    </div>
                    <div className="offcanvas-body inner-mobile-nav">
                        <div className="mb-body">
                            <MobileMenu />
                            <div className="support">
                                <a href="#" className="tf-btn ">
                                    <span>Submit Property</span>
                                    <span className="bg-effect"></span>
                                </a>
                                <a href="#" className="text-need">
                                    {" "}
                                    Need help?
                                </a>
                                <ul className="mb-info">
                                    <li>
                                        Call Us Now:{" "}
                                        <span className="number">
                                            +1 666 8888
                                        </span>
                                    </li>
                                    <li>
                                        Support 24/7:{" "}
                                        <a href="#" className="link">
                                            themesflat@gmail.com
                                        </a>
                                    </li>
                                    <li>
                                        <div className="wrap-social">
                                            <p>Follow us:</p>
                                            <ul className="social align-items-center d-flex gap_24">
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-FacebookLogo"
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-XLogo"
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-TiktokLogo"
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-InstagramLogo"
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="icon-YoutubeLogo"
                                                    ></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Offcanvas>
            </div>
        </>
    );
}
