import React from 'react'

const VisionSection = ({ data }) => {
  const { title, description, bgImg } = data

  return (
    <section
      className="relative w-full h-[60vh] sm:h-[90vh] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Single multi-stop gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to bottom,
            white 0%,
            rgba(255,255,255,0) 10%,
            rgba(0,0,0,0) 50%,
            rgba(0,0,0,0.5) 70%,
            black 100%
          )`,
        }}
      />

      {/* Text content */}
      <div className="absolute bottom-10 sm:bottom-14 lg:left-32 sm:left-10 z-20 mob:left-5">
        <h2 className="text-left align-middle text-white text-[2.75rem] leading-[3rem] tracking-[0em] font-[Archivo] font-normal mb-4 mob:text-[2.5rem] mob:text-left">
          {title}
        </h2>
        <p className="lg:text-left capitalize font-[Onest] font-normal text-[0.875rem] leading-[1.25rem] tracking-[0.02em] text-white max-w-2xl mb-6 sm:text-left mob:text-[0.9rem] mob:text-left">
          {description}
        </p>
      </div>
    </section>
  )
}

export default VisionSection
