import React from 'react'
import FooterSection from '../FooterSection/FooterSection' // adjust path if needed
import './DarkFooterSection.css'
const DarkFooterSection = () => {
  return (
    <div className="dark-footer-wrapper lg:pt-20 lg:p-20 sm:pt-10 mob:pt-10">
      <FooterSection />
    </div>
  )
}

export default DarkFooterSection
