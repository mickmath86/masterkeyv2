import Link from 'next/link'
import React from 'react'

export default function About() {
  return (
    <>
         <div className="section-about-1 tf-spacing-1">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="heading-section mb_20">
                                <span
                                    className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">About
                                    Us</span>
                                <h3 className="split-text effect-blur-fade">Building Dreams, One Home At A Time</h3>
                            </div>
                            <p className="text-body-2 split-text split-lines-transform">Our mission goes beyond real estate
                                — it’s about guiding you through
                                one of life’s
                                biggest
                                milestones with heart, expertise, and unwavering commitment.</p>
                            <Link href={'/listing-half-map-grid'} className="tf-btn btn-bg-1 btn-px-32">
                                <span>View Properties</span>
                                <span className="bg-effect"></span>
                            </Link>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <ul className="list">
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">01.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Buy A New Home</h5>
                                        <p>Discover your dream home effortlessly. Explore diverse properties and expert
                                            guidance for a seamless buying experience.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">02.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Rent A Home</h5>
                                        <p>Discover your perfect rental effortlessly. Explore a diverse variety of
                                            listings tailored precisely to suit your unique lifestyle needs.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">03.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Sell A Home</h5>
                                        <p>Sell confidently with expert guidance and effective strategies, showcasing
                                            your property&apos;s best features for a successful sale.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
