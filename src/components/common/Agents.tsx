"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type Agent = {
  id: number;
  name: string;
  img: string;
  socials: { icon: string; href: string }[];
};

const agents: Agent[] = [
  {
    id: 1,
    name: "Jessica Lane",
    img: "/assets/images/section/agent-1.jpg",
    socials: [
      { icon: "icon-FacebookLogo", href: "#" },
      { icon: "icon-XLogo", href: "#" },
      { icon: "icon-InstagramLogo", href: "#" },
      { icon: "icon-YoutubeLogo", href: "#" },
    ],
  },
  {
    id: 2,
    name: "Michael Smith",
    img: "/assets/images/section/agent-2.jpg",
    socials: [
      { icon: "icon-FacebookLogo", href: "#" },
      { icon: "icon-XLogo", href: "#" },
      { icon: "icon-InstagramLogo", href: "#" },
      { icon: "icon-YoutubeLogo", href: "#" },
    ],
  },
  {
    id: 3,
    name: "Jessica Lane",
    img: "/assets/images/section/agent-1.jpg",
    socials: [
      { icon: "icon-FacebookLogo", href: "#" },
      { icon: "icon-XLogo", href: "#" },
      { icon: "icon-InstagramLogo", href: "#" },
      { icon: "icon-YoutubeLogo", href: "#" },
    ],
  },
  {
    id: 4,
    name: "Michael Smith",
    img: "/assets/images/section/agent-2.jpg",
    socials: [
      { icon: "icon-FacebookLogo", href: "#" },
      { icon: "icon-XLogo", href: "#" },
      { icon: "icon-InstagramLogo", href: "#" },
      { icon: "icon-YoutubeLogo", href: "#" },
    ],
  },
];

export default function Agents() {
  return (
    <div className="tf-container ">
      <div className="row align-items-center">
        <div className="col-lg-4">
          <div className="box">
            <div className="heading-section mb_32">
              <span className="sub text-uppercase fw-6 text_secondary-color-2">
                Top Agents
              </span>
              <h3>Jessica Lane</h3>
            </div>
            <div className="content mb_32">
              <h6 className="mb_12">
                Total Sales Volume: $48M+ in Closed Sales
              </h6>
              <p className="text-body-2">
                With over a decade of real estate experience in luxury coastal
                properties, Jessica is known for her integrity, deep market
                knowledge.
              </p>
            </div>
            <a href="#" className="tf-btn btn-bg-1 btn-px-24">
              <span>View Agent</span>
              <span className="bg-effect"></span>
            </a>
          </div>
        </div>
        <div className="col-lg-7 offset-xl-1 sw-layout">
          <Swiper
            className="swiper"
            modules={[Navigation]}
            slidesPerView={2}
            spaceBetween={20}
            navigation={{
              prevEl: ".nav-prev-layout",
              nextEl: ".nav-next-layout",
            }}
            breakpoints={{
              1200: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
            }}
          >
            {agents.map((agent) => (
              <SwiperSlide key={agent.id}>
                <div className="agent-item">
                  <a href="#" className="img-style">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={agent.img}
                      width={360}
                      height={360}
                      alt="agent"
                    />
                  </a>
                  <ul className="social">
                    {agent.socials.map((social, idx) => (
                      <li key={idx}>
                        <a href={social.href} className={social.icon}></a>
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-button nav-prev-layout">
              <i className="icon-CaretLeft"></i>
            </div>
            <div className="sw-button nav-next-layout">
              <i className="icon-CaretRight"></i>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
