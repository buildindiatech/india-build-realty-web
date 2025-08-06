import React from 'react'
import { useLocation } from 'react-router-dom'

const FutureHomeSectionProject = ({ data }) => {
  const location = useLocation()

  if (!data || !Array.isArray(data.sections)) return null

  const displayData = data.sections

  return (
    <section className="bg-whit sm:px-0 lg:px-36 sm:py-10">
      <div className="lg:space-y-20 w-full mx-auto">
        {displayData.map((item, index) => (
          <div key={index} className="lg:space-y-10 sm:space-y-10 mob:space-y-5">
            <div className="flex flex-col sm:px-0 lg:flex-row lg:items-center lg:justify-between lg:gap-8 sm:gap-2 lg:px-0 sm:px-10 mob:px-0 mob:pt-10">
              <h2 className="lg:text-xl font-heading font-regular text-black lg:pt-[1rem] lg:pb-[0.5rem] sm:text-2xl sm:pt-[0.5rem] sm:pb-[0.25rem] mob:text-2xl mob:pt-[0.5rem] mob:pb-[0.25rem] mob:px-5 mob:font-medium mob:mb-4">
                {item.title}
              </h2>

              <p className="text-[0.875rem] leading-[1.25rem] tracking-[0.02em] text-gray-700 font-[Onest] font-normal capitalize lg:w-2/3 sm:text-[14px] sm:leading-[20px] mob:text-[14px] mob:leading-[20px] mob:px-5">
                {item.description}
              </p>
            </div>

            <div className="relative lg:rounded-lg overflow-hidden shadow-md h-[400px] sm:h-[500px] mob:h-[472px] flex items-center justify-center">
              <img
                src={
                  item.image ||
                  'https://raw.githubusercontent.com/KHUNTPRIYANSH/site_photos/refs/heads/main/bi-reality/hero-slide-1.png'
                }
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FutureHomeSectionProject