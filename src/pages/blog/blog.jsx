import React from 'react'
import Nav from '../../components/Nav/Nav'
import ContactSection from '../../components/ContactSection/ContactSection'
import FooterSection from '../../components/FooterSection/FooterSection'
import BlogHero from '../../components/blogHero/blogHero'
import BlogGrid from '../../components/blogGrid/blogGrid'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

// Import JSON data
import blogHeroData from '../../data/blog/blogHero.json'
import blogGridData from '../../data/blog/blogGrid.json'
import contactData from '../../data/shared/contactSection.json'
import footerData from '../../data/shared/footerSection.json'
import navData from '../../data/shared/nav.json'

function Blog() {
  return (
    <div>
      <Nav data={navData} />
      <BlogHero data={blogHeroData} />
      <BlogGrid data={blogGridData} />
      <section className="footer-wrapper lg:pt-20   lg:p-20" id="contact">
        {/* <ContactSection data={contactData} /> */}
        <FooterSection data={footerData} />
      </section>
    </div>
  )
}

export default Blog
