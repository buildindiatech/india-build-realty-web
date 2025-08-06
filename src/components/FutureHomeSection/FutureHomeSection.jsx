import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../Button'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const FutureHomeSection = ({ data }) => {
  const location = useLocation()
  const isProjectsPage = location.pathname === '/projects'

  const {
    title,
    subtitle,
    description,
    features,
    description2,
    tabs = [],
  } = data

  const [activeTab, setActiveTab] = useState(0)

  // Optional: loop through tabs to auto-update activeTab for main image
  useEffect(() => {
    if (isProjectsPage || tabs.length === 0) return

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length)
    }, 3000) // Change every 3s like Swiper autoplay

    return () => clearInterval(interval)
  }, [tabs.length, isProjectsPage])

  return (
    <section className="bg-whit sm:px-0 lg:px-36 sm:py-10 ">
      <div className="lg:space-y-20 w-full mx-auto">
        {/* Static Cards */}
        <div className="lg:space-y-10 sm:space-y-10 mob:space-y-5 mob:mb-20">
          <div className="flex flex-col sm:px-0 lg:flex-row lg:items-center lg:justify-between lg:gap-8 sm:gap-2 lg:px-0 sm:px-10 mob:px-0 mob:pt-10">
            <h2 className="lg:text-xl font-heading font-regular text-black lg:pt-[1rem] lg:pb-[0.5rem] sm:text-2xl sm:pt-[0.5rem] sm:pb-[0.25rem] mob:text-2xl mob:pt-[0.5rem] mob:pb-[0.25rem] mob:px-5 mob:font-medium mob:mb-4">
              {title}
            </h2>

            <p className="text-[0.875rem] leading-[1.25rem] tracking-[0.02em] text-gray-700 font-[Onest] font-normal capitalize lg:w-2/3 sm:font-onest sm:text-[14px] sm:leading-[20px] sm:capitalize mob:text-[14px] mob:leading-[20px] mob:px-5">
              {description}
            </p>
          </div>

          <div className="relative lg:rounded-lg overflow-hidden shadow-md h-[400px] sm:h-[500px] mob:h-[60dvh] flex items-center justify-center ">
            <img
              src={
                features?.[0]?.image ||
                'https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/home/vt.jpg'
              }
              alt={title}
              className="w-full h-full object-cover"
            />
            {!isProjectsPage && (
              <a
                href="https://buildindiagroup.co.in/#/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="light"
                  className="absolute bottom-8 right-8 shadow"
                >
                  Take a Virtual Tour
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Tabs Controlled Section */}
        {!isProjectsPage && (
          <div className="lg:space-y-10 sm:space-y-10 mob:space-y-5 mob:mb-20">
            <div className="flex flex-col sm:px-0 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-0 sm:px-10 mob:px-0 lg:my-0 sm:my-10 mob:my-10">
              <h2 className="lg:text-xl font-heading font-regular text-black sm:text-2xl sm:pt-[0.5rem] sm:pb-[0.25rem] mob:text-2xl mob:pt-[0.5rem] mob:pb-[0.25rem] mob:px-5 mob:font-medium mob:mb-4">
                {subtitle}
              </h2>
              <p className="text-[0.875rem] leading-[1.25rem] tracking-[0.02em] text-gray-700 font-[Onest] font-normal capitalize lg:w-2/3 sm:font-onest sm:text-[14px] sm:leading-[20px] sm:capitalize mob:text-[14px] mob:leading-[20px] mob:px-5">
                {description2}
              </p>
            </div>

            {/* Active Image */}
            <div className="overflow-hidden lg:rounded-lg h-[300px] sm:h-[400px] md:h-[500px] mob:h-[50dvh]">
              <img
                src={
                  tabs[activeTab]?.image ||
                  'https://raw.githubusercontent.com/KHUNTPRIYANSH/site_photos/refs/heads/main/bi-reality/hero-slide-2.png'
                }
                alt={tabs[activeTab]?.name || 'Tab Image'}
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
                  slidesPerView: 4,
                },
              }}
              loop={true}
              loopedSlides={tabs.length}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Autoplay]}
              className="mob:px-5 sm:px-0 sm:pb-5 mob:pb-5"
            >
              {tabs.map((item, index) => {
                const isActive = index === activeTab
                return (
                  <SwiperSlide
                    key={index}
                    className="cursor-pointer group mob:ml-5 sm:ml-10 lg:ml-0"
                    onClick={() => setActiveTab(index)}
                  >
                    <div className="transition-all duration-200">
                      <h3
                        className={`text-sm mob:text-lg sm:text-base font-semibold font-heading border-t-2 pt-3 pb-1 ${
                          isActive
                            ? 'text-black border-black'
                            : 'text-gray-400 border-gray-600 group-hover:text-black group-hover:border-black'
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`text-xs mob:text-sm sm:text-sm font-sans ${
                          isActive
                            ? 'text-black'
                            : 'text-gray-500 group-hover:text-gray-700'
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
        )}
      </div>
    </section>
  )
}

export default FutureHomeSection
