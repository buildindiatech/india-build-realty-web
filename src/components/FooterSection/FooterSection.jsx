import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6'

const FooterSection = ({ data }) => {
  const companyInfo = data?.companyInfo || {
    name: 'Build India Realty',
    description: `Building India's Future, One Project at a Time`,
  }
  // Internal page links for router
  const pageLinks = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Projects', url: '/projects' },
    { title: 'Blog', url: '/blog' },
    { title: 'Contact', url: '/#contact' },
  ]
  const topProperties = [
    'Residential Projects',
    'Commercial Spaces',
    'Resort & Hospitality',
    'Investment Opportunities',
  ]
  const quickLinks = [
    { title: 'Career', url: '/career' },
    { title: 'Join as a Vendor', url: '/vendor' },
  ]

  return (
    <footer className="lg:pt-20  text-sm text-gray-500 font-sans lg:px-16 sm:px-10 sm:py-5 sm:pb-20 mob:px-5 mob:pt-0 mob:pb-10">
      <div className="flex flex-col gap-14">
        {/* Top Row: Logo and Socials */}
        <div className="flex justify-between  items-start flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 font-heading font-regular text-3xl">
              {companyInfo.name}
            </span>
            <span className="text-gray-400 font-bold">|</span>
            <span className="text-gray-600 text-sm">
              {companyInfo.description}
            </span>
          </div>

          <div className="flex gap-4 text-gray-800 text-xl mt-4 sm:mt-0">
            <a
              href="https://www.facebook.com/BuildIndiaRealty"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://www.instagram.com/buildindiarealty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://www.youtube.com/@buildindiarealty4226"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube size={22} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="block sm:hidden">
          <div className="flex gap-8">
            {/* Left: Helpful Links */}
            <div className="w-1/2">
              <h4 className="uppercase text-sm font-semibold text-gray-600 mb-5 tracking-wider">
                HELPFUL LINKS
              </h4>
              <ul className="space-y-1 text-gray-700">
                {pageLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.url}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: Stack Top Properties + Quick Links */}
            <div className="w-1/2 flex flex-col gap-8">
              <div>
                <h4 className="uppercase text-sm font-semibold text-gray-600 mb-5 tracking-wider">
                  TOP PROPERTIES
                </h4>
                <ul className="space-y-1 text-gray-700">
                  {topProperties.map((prop, idx) => (
                    <li key={idx}>{prop}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="uppercase text-sm font-semibold text-gray-600 mb-5 tracking-wider">
                  QUICK LINKS
                </h4>
                <ul className="space-y-1 text-gray-700">
                  {quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.url}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop/Tablet: original layout preserved */}
        <div className="hidden sm:flex sm:flex-row justify-start gap-x-32 text-sm w-full">
          {/* Helpful Links */}
          <div>
            <h4 className="uppercase text-sm font-semibold text-gray-600 mb-5 tracking-wider">
              HELPFUL LINKS
            </h4>
            <ul className="space-y-1 text-gray-700">
              {pageLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Top Properties */}
          <div>
            <h4 className="uppercase text-sm font-semibold text-gray-600 mb-5 tracking-wider">
              TOP PROPERTIES
            </h4>
            <ul className="space-y-1 text-gray-700">
              {topProperties.map((prop, idx) => (
                <li key={idx}>{prop}</li>
              ))}
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="uppercase text-sm font-semibold text-gray-600 mb-5 tracking-wider">
              QUICK LINKS
            </h4>
            <ul className="space-y-1 text-gray-700">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Row */}

        {/* Bottom Bar */}
        <div className="flex flex-row flex-wrap justify-between items-center  text-xs text-gray-800 gap-y-2">
          <p className="mob:text-center mob:w-full">
            © 2024 Build India Realty. All rights reserved.
          </p>
          <div className="flex gap-4 flex-wrap mob:justify-between mob:w-full mob:pt-4">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
