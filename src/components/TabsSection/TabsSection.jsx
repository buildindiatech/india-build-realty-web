import React, { useState, useRef } from 'react'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'

const TabsSection = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0)
  const swiperRef = useRef(null)

  const { tabs } = data

  return (
    <section className="bg-black sm:px-0 lg:px-36 lg:py-20 sm:py-24 mob:pb-10">
      <div className="w-full mx-auto space-y-10">
        {/* Image Section */}
        <div className="overflow-hidden lg:rounded-lg h-[300px] sm:h-[400px] md:h-[500px] mob:h-[50dvh]">
          <img
            src={
              tabs[activeTab]?.projects[0]?.image ||
              'https://raw.githubusercontent.com/KHUNTPRIYANSH/site_photos/refs/heads/main/bi-reality/hero-slide-1.png'
            }
            alt={tabs[activeTab]?.projects[0]?.name || 'Project'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Swiper Tabs */}
        <Swiper
          onSlideChange={(swiper) => setActiveTab(swiper.realIndex)}
          slidesPerView={1.5}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2.75,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Autoplay]}
          className="mob:px-5 sm:px-0 sm:pb-5 mob:pb-5"
          ref={swiperRef}
        >
          {tabs.map((item, index) => {
            const isActive = index === activeTab
            return (
              <SwiperSlide key={index} className="cursor-pointer group mob:ml-5 sm:ml-10 lg:ml-0" onClick={() => setActiveTab(index)}>
                <div className="transition-all duration-200">
                  <h3
                    className={`text-sm mob:text-lg sm:text-base font-semibold font-heading border-t-2 pt-3 pb-1 ${
                      isActive
                        ? 'text-white border-white'
                        : 'text-gray-400 border-gray-600 group-hover:text-white group-hover:border-white'
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`text-xs mob:text-sm sm:text-sm font-sans ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}

export default TabsSection
