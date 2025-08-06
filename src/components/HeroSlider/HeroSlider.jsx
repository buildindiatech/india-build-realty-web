import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './HeroSlider.css'
import Button from '../Button'
import { Link } from 'react-router-dom'
import { Pagination } from 'swiper/modules'

const HeroSlider = ({ data }) => {
  const { slides } = data

  return (
    <div className="relative w-full lg:h-[80dvh] mob:h-[100dvh] sm:h-[100dvh] overflow-hidden hero-slider">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1500}
        effect="slide"
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        loop
        className="w-full h-full"
        grabCursor={true}
        watchSlidesProgress={true}
        watchOverflow={true}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        roundLengths={true}
        touchRatio={1}
        touchAngle={45}
        resistance={true}
        resistanceRatio={0.85}
        onSlideChange={(swiper) => {
          // Add smooth transition class when navigation is used
          const activeSlide = swiper.slides[swiper.activeIndex]
          if (activeSlide) {
            activeSlide.classList.add('slide-transition-active')
            setTimeout(() => {
              activeSlide.classList.remove('slide-transition-active')
            }, 1500)
          }
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/50" />

              <div
                className="absolute inset-0 flex flex-col 
                lg:justify-center lg:items-center text-center px-4 
                sm:px-6 sm:justify-end sm:items-start sm:pb-40 
                sm:gap-2 sm:pl-12
                custom-up-gap
                mob:p-6
                mob:gap-2
                lg:px-8"
              >
                <h2
                  className="
    text-center align-middle text-white
    text-[2.75rem] leading-[3rem] tracking-[0em]
    font-[Archivo] font-normal
    mb-4 lg:w-[30%]
    mob:text-[2.5rem]
    mob:text-left
  "
                >
                  {slide.title}
                </h2>

                <p
                  className="
    lg:text-center capitalize font-[Onest] font-normal
    text-[0.875rem] leading-[1.25rem] tracking-[0.02em]
    text-white max-w-2xl mb-6
 sm:text-left
  mob:text-[0.9rem]
    mob:text-left
    "
                >
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button variant="dark">
                    <Link to="/projects">Explore More</Link>
                  </Button>
                  <Button variant="light">
                    <a href="#contact">Contact us</a>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button
          className="swiper-button-prev custom-nav-btn"
          onClick={() => {
            const swiper = document.querySelector('.hero-slider .swiper').swiper
            if (swiper) {
              swiper.slidePrev()
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <button
          className="swiper-button-next custom-nav-btn"
          onClick={() => {
            const swiper = document.querySelector('.hero-slider .swiper').swiper
            if (swiper) {
              swiper.slideNext()
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default HeroSlider
