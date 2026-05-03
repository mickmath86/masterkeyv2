import React from 'react'

export default function Footer2() {
  return (
    <footer className="footer style-1">
      <div className="tf-container ">
        <div className="footer-body">
          <div className="footer-infor justify-content-between">
            <div className="item">
              <span className="d-block text_color-1 text-title mb_8">Phone Number:</span>
              <h4 className="text_white">315-666-6688</h4>
              <h4 className="text_white">315-888-8899</h4>
            </div>
            <div className="item">
              <span className="d-block text_color-1 text-title mb_8">Our Address:</span>
              <p className="text_white h4">101 E 129th St, Chicago, New York</p>
            </div>
            <div className="item">
              <span className="d-block text_color-1 text-title mb_8">Email Address:</span>
              <a href="#" className="link text_white text-body-3">themesflat@gmail.com</a>
              <a href="#" className="link text_white text-body-3">info@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom d-flex align-items-center justify-content-between">
          <p className="text_muted-color">
            ©2025 <a href="#" className="text_white hover-underline-link">Luminor.</a>
            All Rights Reserved.
          </p>
          <ul className="social d-flex gap_24">
            <li><a href="#" className="icon-FacebookLogo"></a></li>
            <li><a href="#" className="icon-XLogo"></a></li>
            <li><a href="#" className="icon-TiktokLogo"></a></li>
            <li><a href="#" className="icon-InstagramLogo"></a></li>
            <li><a href="#" className="icon-YoutubeLogo"></a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
