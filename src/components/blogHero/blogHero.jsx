import React from 'react'

const BlogHero = ({ data }) => {
  // Provide fallback values if data is not provided
  const title =
    data?.title || 'The thinking, ideas and technology behind World.'
  const subtitle = data?.subtitle || 'Build India Blog'

  return (
    <section className="h-[50vh] w-full flex items-center lg:justify-center bg-white px-4 sm:px-10 lg:px-16 mob:px-5 sm:px-10 mt-[10vh] lg:w-[40%] sm:w-full mob:w-full  lg:mx-auto">
      <div className=" text-left w-fit ">
        <p
          className="  lg:text-left capitalize font-[Onest] font-normal
    text-[0.875rem] leading-[1.25rem] tracking-[0.02em]
    text-[#171A20]  mb-6
 sm:text-left
  mob:text-[0.9rem]
    mob:text-left"
        >
          {subtitle}
        </p>
        <h1
          className="   lg:text-left align-middle text-[#2D2C2C]
    text-[2.75rem] leading-[3rem] tracking-[0em]
    font-[Archivo] font-normal
    mb-4 
    mob:text-[2.5rem]
    mob:text-left
    sm:text-left
    mob:w-full
    lg:w-full
    sm:w-3/5
    "
        >
          {title}
        </h1>
      </div>
    </section>
  )
}

export default BlogHero
