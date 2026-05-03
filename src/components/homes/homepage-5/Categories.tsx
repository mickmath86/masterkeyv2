"use client"
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

type Category = {
  image: string
  name: string
  properties: number
  delay: number
}

const categories: Category[] = [
  {
    image: '/assets/images/section/category-6.jpg',
    name: 'Apartment',
    properties: 263,
    delay: 0.1,
  },
  {
    image: '/assets/images/section/category-7.jpg',
    name: 'Studio',
    properties: 256,
    delay: 0.2,
  },
  {
    image: '/assets/images/section/category-8.jpg',
    name: 'Office',
    properties: 312,
    delay: 0.3,
  },
  {
    image: '/assets/images/section/category-9.jpg',
    name: 'Townhouse',
    properties: 237,
    delay: 0.4,
  },
  {
    image: '/assets/images/section/category-10.jpg',
    name: 'Commercial',
    properties: 221,
    delay: 0.5,
  },
]
    
export default function Categories() {
  return (
    <div className="sw-layout bg-dark-color tf-spacing-1">
      <div className="tf-container w-1830">
        <div className="heading-section justify-content-center text-center mb_48">
          <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
            Categories
          </span>
          <h3 className="text_white split-text effect-blur-fade">
            Properties By Type
          </h3>
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: '.sw-pagination-layout',
          }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 15 },
            480: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
            1400: { slidesPerView: 5, spaceBetween: 30 },
          }}
          className="category-swiper"
        >
          {categories.map((cat, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="category-item style-1 hover-image-translate scrolling-effect effectFade"
                data-delay={cat.delay}
              >
                <a href="#" className="img-style">
                  <Image
                    src={cat.image}
                    width={296}
                    height={296}
                    alt="category"
                  />
                </a>
                <div className="content">
                  <a href="#" className="mb_8 h5 text_primary-color link">
                    {cat.name}
                  </a>
                  <p>{cat.properties} properties</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* Swiper pagination dots */}
          <div className="sw-dots sw-pagination-layout text-center mt_24"></div>
        </Swiper>
      </div>
    </div>
  )
}
