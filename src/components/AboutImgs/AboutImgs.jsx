import React from 'react'

// Example images, replace with actual images as needed
import img1 from '../../assets/ab1.png'
import img2 from '../../assets/ab2.png'
import img3 from '../../assets/ab3.png'

const images = [img1, img2, img3]

const AboutImgs = () => {
  return (
    <section className="bg-white sm:px-0 lg:px-36 lg:py-20 sm:py-10 lg:pb-0">
      {/* First Text Block */}
      <div className="flex flex-col  lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-0 sm:px-10 mob:px-5">
        <h2
          className="lg:text-xl font-heading font-semi-bold text-black lg:h-[3.375rem] lg:pt-0
        sm:text-2xl sm:h-[2.375rem] sm:pt-[0.5rem] sm:pb-[0.25rem] mob:text-2xl mob:h-[2.375rem] 
        mob:pt-[0.5rem] mob:pb-[0.25rem] mob:px-5 mob:font-medium mob:mb-4 mob:my-10"
        >
          Trusted Realty Experts
        </h2>
        <p className="text-[0.875rem] leading-[1.25rem] tracking-[0.02em] text-gray-700 font-[Onest] font-normal capitalize lg:w-2/3 sm:font-onest sm:text-[14px] sm:leading-[20px] sm:tracking-[0.02em] sm:capitalize mob:text-[14px] mob:leading-[20px] mob:tracking-[0.02em] mob:capitalize mob:px-5">
          We deliver results by blending deep market knowledge with a
          client-first approach. Our team collaborates closely to ensure every
          step—from listing to closing is handled with precision. We’re not just
          selling properties; we’re building trust, communities, and lifelong
          partnerships.
        </p>
      </div>

      {/* Images Section */}
      <div
        className="
        flex 
        lg:flex-row lg:gap-[24px]  lg:py-10 
        sm:flex-col sm:gap-[34px]  sm:py-10 
        mob:flex-col mob:gap-6 mob:px-0 mob:py-6
      "
      >
        {images.map((img, idx) => (
          <div className="lg:h-[400px] sm:h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center lg:w-1/3 sm:w-full rounded-md">
            <img
              key={idx}
              src={img}
              alt={`About Image ${idx + 1}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Second Text Block */}
      <div className="flex flex-col sm:px-0 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-0 sm:px-10 mob:px-5 lg:my-0 sm:my-0 lg:mt-20 lg:mb-0 lg:pb-0">
        <h2
          className="lg:text-xl font-heading font-semi-bold text-black lg:h-[3.375rem] lg:pt-0
        sm:text-2xl sm:h-[2.375rem] sm:pt-[0.5rem] sm:pb-[0.25rem] mob:text-2xl mob:h-[2.375rem] 
        mob:pt-[0.5rem] mob:pb-[0.25rem] mob:px-5 mob:font-medium mob:mb-4 mob:my-10"
        >
          Built to Belong
        </h2>
        <p className="text-[0.875rem] leading-[1.25rem] tracking-[0.02em] text-gray-700 font-[Onest] font-normal capitalize lg:w-2/3 sm:font-onest sm:text-[14px] sm:leading-[20px] sm:tracking-[0.02em] sm:capitalize mob:text-[14px] mob:leading-[20px] mob:tracking-[0.02em] mob:capitalize mob:px-5">
          We’re not just developers. We’re curators of community, catalysts for
          growth, and champions of a smarter India.We’re community-first
          creators Driven by the idea that every square meter we touch should
          enhance life, inspire growth, and respect the land it stands on.
        </p>
      </div>
    </section>
  )
}

export default AboutImgs
