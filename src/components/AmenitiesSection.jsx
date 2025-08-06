import React from 'react'

const amt01 = "https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/amenities/1.jpg"
const amt02 = "https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/amenities/2.jpg"
const amt03 = "https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/amenities/3.jpg"
const amt04 = "https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/amenities/4.jpg"
const amt05 = "https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/amenities/5.jpg"
const amt06 = "https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/amenities/6.jpg"
const amt07 = "https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/amenities/7.jpg"
const amt08 = "https://raw.githubusercontent.com/RawAgent2407/bi-realty/refs/heads/main/public/images/photos/amenities/8.jpg"

const amenities = [
  { label: 'Swimming Pool', img: amt01 },
  { label: 'Garden', img: amt02 },
  { label: 'Play Area', img: amt03 },
  { label: 'Restaurant', img: amt04 },
  { label: 'Fitness Center', img: amt05 },
  { label: 'Pond', img: amt06 },
  { label: 'Fountain', img: amt07 },
  { label: 'Club House', img: amt08 },
]

const AmenitiesSection = () => {
  return (
    <section className=" sm:px-0 lg:px-36 lg:pt-20 sm:py-10 mob:pb-5 mob:px-5 sm:px-10">
     
     <div className="lg:space-y-10 sm:space-y-10 mob:space-y-5">
            {/* Heading + Description */}
            <div className="flex flex-col sm:px-0 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-0 sm:px-10 mob:px-0 lg:my-0 sm:my-10 mob:my-10 lg:9b-20 sm:pb-10 mob:pb-5">
              <h2
                className="
                  lg:text-xl font-heading font-regular text-black
                  lg:pt-[0rem] lg:pb-[0rem]
                  sm:text-2xl  sm:pt-[0.5rem] sm:pb-[0.25rem]
                  mob:text-2xl  mob:pt-[0.5rem] mob:pb-[0.25rem] mob:px-5 mob:font-medium mob:mb-4
                "
              >
               Amenities
              </h2>
              <p
                className="text-[0.875rem] leading-[1.25rem] tracking-[0.02em] text-gray-700 font-[Onest] font-normal capitalize lg:w-2/3 sm:font-onest sm:font-normal sm:text-[14px] sm:leading-[20px] sm:tracking-[0.02em] sm:capitalize
                mob:text-[14px] mob:leading-[20px] mob:tracking-[0.02em] mob:capitalize  mob:px-5"
              >
                We design sustainable systems that are massively scalable resulting in the greatest environmental benefit
possible. Our energy generation and storage products work together with our electric vehicles to amplify
their impact. Our master plans share our vision for a sustainable future and what we are doing about it. 
              </p>
            </div>
          </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {amenities.map((item, idx) => (
          <div
            key={idx}
            className="relative group flex items-center justify-center bg-white rounded-xl shadow-sm aspect-square w-full overflow-hidden transition hover:shadow-md"
          >
            {/* Image fills the card */}
            <div className="absolute inset-0">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2 transform translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out">
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AmenitiesSection
