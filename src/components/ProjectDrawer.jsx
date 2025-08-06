import React from 'react'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link, useNavigate } from 'react-router-dom'
// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

const ProjectDrawer = ({ data, onClose }) => {
  const { projects } = data
  const navigate = useNavigate()

  const handleCardClick = (projectUrl) => {
    navigate(projectUrl)
    if (onClose) onClose()
  }

  return (
    <div className="fixed top-[64px] left-0 w-screen bg-white z-40 shadow-md">
      <div className="w-full max-w-[1400px] mx-auto flex items-start px-6 py-10 gap-8">
        {/* Left Navigation Links */}
        <div className="flex flex-col justify-between h-full min-h-[320px] min-w-[150px] py-2">
          {/* Top: Plots */}
          <a
            className="group text-sm font-medium  text-gray-800 hover:text-black flex items-end justify-end gap-2"
          >
            Plots
          </a>
          {/* Bottom: Contact us */}
          <div className="flex flex-col gap-8">
            <a
              href="#contact"
              className="group text-sm font-medium text-gray-800 hover:text-black flex items-center justify-between gap-2"
            >
              {/* <Link to="/projects">Explore More</Link> */}
              {/* <ArrowForwardIcon
                sx={{ fontSize: 16 }}
                className="transition-transform group-hover:translate-x-1"
              /> */}
            </a>
            <a
              href="#contact"
              className="group text-sm font-medium text-gray-800 hover:text-black flex items-center justify-between gap-2"
            >
              Contact Us
              <ArrowForwardIcon
                sx={{ fontSize: 16 }}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 self-stretch"></div>

        {/* Project Cards in a Swiper */}
        <div className="flex-1 overflow-hidden">
          <Swiper
            slidesPerView={3}
            spaceBetween={24} // This is equivalent to gap-6 in Tailwind (6 * 4px)
            className="mySwiper"
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx} style={{ height: 'auto' }}>
                {/* The card component's classes are UNCHANGED */}
                <div
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all h-full cursor-pointer"
                  onClick={() => handleCardClick(project.url)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleCardClick(project.url)
                  }}
                >
                  <div className="relative h-[220px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900 bg-opacity-30 flex items-center justify-center">
                      <h3 className="text-white text-xl font-semibold">
                        {project.overlayText}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                      <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-auto">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                        {project.price}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {project.link}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right "More" Link */}
        {/* <div className="ml-auto mt-2 h-full mt-auto">
          <a
            href="#"
            className="group flex items-center gap-1 text-sm font-semibold text-gray-800 hover:text-black"
          >
            <Link to="/projects">
              More
              <ArrowForwardIcon
                sx={{ fontSize: 18 }}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default ProjectDrawer
