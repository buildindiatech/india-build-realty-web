import React from 'react'
import Button from '../Button'
import './InvestingCardsSection.css'
import { Link } from 'react-router-dom'

const InvestingCardsSection = ({ data }) => {
  const { title, cards } = data

  return (
    <section className="sm:px-12 lg:px-36 lg:pb-20 lg:pt-0 sm:py-14 mob:px-5 mob:my-10 bg-white">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:mb-10 sm:gap-0 lg:px-0 lg:mb-8 mob:pb-5">
          <h2 className="text-[1.75rem] leading-[2.25rem] tracking-[0.01em] font-[Onest] font-semibold capitalize text-[#171A20]">
            {title}
          </h2>

          {/* Hide button for screens less than 1280px */}
          <Button variant="dark-outline" className="dont-show-inlarge lg:block">
            <Link to="/blog">Explore More</Link>
          </Button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 gap-[32px] lg:grid-cols-3">
          {cards.map((card, idx) => (
            <Link to={`/blog/${idx + 1}`} key={idx} className="block overflow-hidden hover:opacity-90 transition-opacity">
              {/* Image */}
              <div className="h-56 sm:h-[280px] md:h-72 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="lg:py-3 lg:px-1 sm:p-4 space-y-1 sm:space-y-2 mob:pt-2">
                <p className="text-[1.125rem] leading-[1.5rem] tracking-[0em] font-[Arial] font-normal text-[#0A0A0A] align-middle">
                  {card.title}
                </p>
                <p className="text-xs text-gray-500 font-sans tracking-wide">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Button only for sm screens below blog cards */}
        <div className="block lg:hidden mt-8 text-center">
          <Button variant="dark-outline">
            <Link to="/blog">Explore More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default InvestingCardsSection
