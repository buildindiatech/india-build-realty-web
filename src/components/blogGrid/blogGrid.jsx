import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // Import useParams and useNavigate
import Nav from '../Nav/Nav'
import ContactSection from '../ContactSection/ContactSection'
import FooterSection from '../FooterSection/FooterSection'
import BlogHero from '../blogHero/blogHero'
import singleBlogImg from '../../assets/hero-slide-2.png'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6'
import navData from '../../data/shared/nav.json'

const SingleBlog = ({ blogsData }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const foundBlog = blogsData?.find((b) => b.id === parseInt(id))
    if (foundBlog) {
      setBlog(foundBlog)
    } else {
      console.warn(`Blog with ID ${id} not found.`)
    }
  }, [id, blogsData, navigate])

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading blog post or blog not found...</p>
      </div>
    )
  }

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen mt-[10vh]">
      <Nav data={navData} />
      <main
        className=" mx-auto flex flex-col lg:flex-row gap-10 
      sm:px-12 lg:px-36 lg:pb-20 lg:pt-0 sm:py-14 mob:px-5 mob:my-10 bg-white
      "
      >
        <aside className="lg:w-1/5 w-full mb-8 lg:mb-0">
          <div className="lg:sticky top-20">
            <div className="text-xs leading-5 text-gray-700 space-y-1 mb-6">
              <a href="https://www.ravgroup.org/" target="_blank" rel="noopener noreferrer" className="block font-semibold hover:underline">Explore RAV Group</a>
              <a href="https://dholera.gujarat.gov.in/about_us#dholera_sir" target="_blank" rel="noopener noreferrer" className="block hover:underline">Explore Dholera SIR</a>
              <a href="https://buildindiagroup.co.in/#/login" target="_blank" rel="noopener noreferrer" className="block hover:underline">Take A Virtual Tour Of Our Projects</a>
              <div>Learn More</div>
            </div>
            <div className="flex gap-4 text-xl text-gray-800">
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
        </aside>
        <div className="lg:w-4/5 w-full">
          <div className="w-full rounded-lg overflow-hidden mb-6 max-h-[70dvh] flex items-center justify-center">
            <img
              src={singleBlogImg}
              alt={blog.title}
              className="w-full h-auto object-cover rounded"
            />
          </div>
          <div className="prose max-w-none prose-p:mb-4 prose-h2:mt-8 prose-h2:mb-2 prose-h2:text-lg prose-h2:font-semibold prose-h2:text-black prose-ul:mb-4 prose-li:mb-1 prose-li:pl-0 prose-li:text-sm prose-li:text-gray-900">
            <p className="text-xs text-gray-600 mb-2">{blog.title}</p>
            <p className="text-sm text-gray-800 mb-6">
              {blog.content.split('\n\n')[0]}
            </p>
            <h2>Why Video?</h2>
            <p className="text-sm text-gray-800">
              {blog.content.split('\n\n')[1]}
            </p>
            <h2>Steps to Create a Successful Video Campaign</h2>
            <p className="text-sm text-gray-800">
              {blog.content.split('\n\n')[2]}
            </p>
            <h2 className="mt-6 mb-2 text-base font-semibold text-black">
              Define Your Story
            </h2>
            <p className="text-sm text-gray-800 mb-2">
              What is the core message you want to convey? Whether it's
              highlighting a specific program or sharing participant stories,
              your message should be clear, impactful, and aligned with your
              mission.
            </p>
            <h2 className="mt-6 mb-2 text-base font-semibold text-black">
              Engage Your Community
            </h2>
            <p className="text-sm text-gray-800 mb-2">
              Include testimonials from participants, staff, or community
              members. This humanizes your nonprofit, builds trust, elicits
              empathy, and emotionally compels the viewer.
            </p>
            <h2 className="mt-6 mb-2 text-base font-semibold text-black">
              Make It Shareable
            </h2>
            <p className="text-sm text-gray-800 mb-2">
              Short, digestible videos (1-2 minutes) perform best on social
              media. Repurposing your video content for platforms like
              Instagram, Facebook, and YouTube ensures your message reaches your
              audience where they are most active.
            </p>
            <h2>The Impact of Video for PASS</h2>
            <p className="text-sm text-gray-800 mb-6">{blog.longDescription}</p>
            <h2>Tips for Nonprofits Looking to Use Video</h2>
            <ul className="list-disc pl-5">
              {blog.tips?.map((tip, index) => (
                <li key={index} className="text-sm text-gray-800 mb-1">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <section className="footer-wrapper lg:pt-20   lg:p-20">
        <ContactSection />
        <FooterSection />
      </section>
    </div>
  )
}

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const generateBlogPosts = () => {
      setLoading(true)
      setError(null)

      const tempBlogs = []
      const imageWidth = 400
      const imageHeight = 250

      for (let i = 0; i < 10; i++) {
        const imageUrl = `https://picsum.photos/${imageWidth}/${imageHeight}?random=${Math.random()}`
        const blogTitle = `Random Blog Post Title ${i + 1}`
        const blogDate = new Date(Date.now() - i * 86400000).toLocaleDateString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          },
        )

        tempBlogs.push({
          id: i + 1,
          title: blogTitle,
          date: blogDate,
          image: imageUrl,
        })
      }
      setBlogs(tempBlogs)
      setLoading(false)
    }

    generateBlogPosts()
  }, [])

  return (
    <section className="w-full sm:px-10 lg:px-36 py-10 bg-white mob:px-5 mob:py-10 sm:px-10">
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-14">
          {loading && (
            <div className="sm:col-span-2 lg:col-span-2 text-center py-10">
              <p>Generating blog posts...</p>
            </div>
          )}
          {error && (
            <div className="sm:col-span-2 lg:col-span-2 text-center py-10 text-red-500">
              <p>{error}</p>
            </div>
          )}
          {!loading &&
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="space-y-3 cursor-pointer"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-medium leading-snug text-gray-900">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {blog.date}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export { SingleBlog }
export default BlogGrid
