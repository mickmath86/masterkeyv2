import Image from 'next/image'
import React from 'react'

export default function About() {
  return (
    <div className="tf-container tf-spacing-1">
      <div className="heading-section justify-content-center text-center mb_48">
        <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
          About Us
        </span>
        <h3 className="split-text effect-blur-fade">
          Building Dreams, One Home At A Time
        </h3>
      </div>
      <div className="tf-grid-layout md-col-3">
        <div className="card-about item-1 scrolling-effect effectBottom">
          <div className="img-style">
            <Image
              src="/assets/images/section/card-about-1.jpg"
              width={410}
              height={480}
              alt="card-about"
            />
          </div>
          <div className="content">
            <h2 className="text_white mb_8">1.</h2>
            <div>
              <h4 className="text_white mb_8">Buy A New Home</h4>
              <p className="text_white mb_20">
                Find your perfect rental. Browse listings tailored to fit your
                lifestyle with ease, comfort, and total peace of mind.
              </p>
              <a
                href="#"
                className="hover-underline-link text_white text-button fw-7"
              >
                View Property
              </a>
            </div>
          </div>
        </div>
        <div className="card-about scrolling-effect effectBottom">
          <div className="img-style">
            <Image
              src="/assets/images/section/card-about-2.jpg"
              width={410}
              height={480}
              alt="card-about"
            />
          </div>
          <div className="content">
            <div>
              <h2 className="mb_12">2.</h2>
              <h4 className="mb_8">Rent A Home</h4>
              <p className="text_primary-color mb_20">
                Sell with confidence using expert guidance and strategies to
                highlight your property and attract serious buyers.
              </p>
              <a
                href="about-us.html"
                className="hover-underline-link text_primary-color text-button fw-7"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
        <div className="card-about item-2 scrolling-effect effectBottom">
          <div className="content">
            <h2 className="text_white mb_12">3.</h2>
            <div>
              <h4 className="mb_8 text_white">Sell A Home</h4>
              <p className="mb_20 text_white">
                Discover your dream home. Explore with expert guidance for a
                smooth experience, from start to finish confidently.
              </p>
              <a
                href="constacts.html"
                className="hover-underline-link text_white text-button fw-7"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
