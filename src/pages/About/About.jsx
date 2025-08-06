import React from 'react'
import Nav from '../../components/Nav/Nav'
import ProjectHero from '../../components/ProjectHero/ProjectHero'
import ImpactSection from '../../components/ImpactSection/ImpactSection'
import VisionSection from '../../components/VisionSection/VisionSection'
import ExploreSlider from '../../components/ExploreSlider/ExploreSlider'
import ContactSection from '../../components/ContactSection/ContactSection'
import FooterSection from '../../components/FooterSection/FooterSection'
import AboutImgs from '../../components/AboutImgs/AboutImgs'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

// Import JSON data
import projectHeroData from '../../data/about/projectHero.json'
import impactData from '../../data/about/impactSection.json'
import visionData from '../../data/about/visionSection.json'
import aboutImgsData from '../../data/about/aboutImgs.json'
import exploreSliderData from '../../data/home/exploreSlider.json'
import contactData from '../../data/shared/contactSection.json'
import footerData from '../../data/shared/footerSection.json'
import navData from '../../data/shared/nav.json'

const About = () => {
  return (
    <>
      {/* <a
        href="https://wa.me/+919898339903"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon sx={{ fontSize: 28 }} />
      </a> */}
      <Nav data={navData} />
      <ProjectHero data={projectHeroData} />
      <ImpactSection data={impactData} />
      <VisionSection data={visionData} />
      <AboutImgs data={aboutImgsData} />
      <ExploreSlider data={exploreSliderData} />
      <section className="footer-wrapper lg:pt-20   lg:p-20" id="contact">
        {/* <ContactSection data={contactData} /> */}
        <FooterSection data={footerData} />
      </section>
    </>
  )
}

export default About
