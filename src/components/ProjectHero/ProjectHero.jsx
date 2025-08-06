import React from 'react'
import { FiUsers } from 'react-icons/fi'
import { FaGlobe } from 'react-icons/fa'
import { FaHouseUser } from 'react-icons/fa6'

const ProjectHero = ({ data }) => {
  const { title, subtitle, stats, img } = data

  return (
    <section
      className="relative w-full lg:h-[100dvh] mob:h-[100dvh] sm:h-[100dvh] bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content: Title & Subtitle */}
      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 sm:w-full mob:w-full lg:w-1/2 flex flex-col items-center justify-center">
        <h1
          className="
       text-center align-middle text-white
    text-[2.75rem] leading-[3rem] tracking-[0em]
    font-[Archivo] font-normal
    mb-4 
    mob:text-[2.5rem]
    sm:w-[70%]
    mob:w-full
    lg:w-[60%]
        "
        >
          {title}
        </h1>
        <p
          className=" text-center capitalize font-[Onest] font-normal
    text-[0.875rem] leading-[1.25rem] tracking-[0.02em]
    text-white  mb-6

  mob:text-[0.9rem]"
        >
          {subtitle}
        </p>
      </div>

      {/* Stats: Bottom Centered */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 w-full  px-4 z-10 mob:bottom-10 lg:w-[50%] mob:w-full mob:px-0">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <p className="text-white text-xl sm:text-3xl font-regular mob:text-2xl ">
              {stats[0]?.number || '100+'}
            </p>
            <span
              className="lg:text-center capitalize font-[Onest] font-normal
    text-[0.875rem] leading-[1.25rem] tracking-[0.02em]
    text-white max-w-2xl mb-6

  mob:text-[0.9rem]"
            >
              {stats[0]?.label || 'Skilled Professionals'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="mb-2">
              <FaGlobe className="text-white text-xl sm:text-3xl mob:text-2xl" />
            </p>
            <span
              className="lg:text-center capitalize font-[Onest] font-normal
    text-[0.875rem] leading-[1.25rem] tracking-[0.02em]
    text-white max-w-2xl mb-6

  mob:text-[0.9rem]"
            >
              {stats[1]?.label || 'Unified Vision & Mission'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-white text-xl sm:text-3xl font-regular mob:text-2xl">
              {stats[2]?.number || '200+'}
            </p>
            <span
              className="lg:text-center capitalize font-[Onest] font-normal
    text-[0.875rem] leading-[1.25rem] tracking-[0.02em]
    text-white max-w-2xl mb-6

  mob:text-[0.9rem]"
            >
              {stats[2]?.label || 'Families Registered'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectHero
