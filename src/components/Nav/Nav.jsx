import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../Button'
import './NavCustom.css'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ProjectDrawer from '../ProjectDrawer'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Nav = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false)
  const [isMobileProjectOpen, setIsMobileProjectOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)

  const { logo, ctaButton, mobileMenu, projects } = data || {}

  useEffect(() => {
    setIsOpen(false)
    setIsProjectDrawerOpen(false)
    window.scrollTo(0, 0)
  }, [location])

  // GSAP Scroll Trigger for all screen sizes - EXCLUDING blog page
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Check if we're on the blog page
    const isBlogPage =
      location.pathname === '/blog' || location.pathname.startsWith('/blog/')

    if (isBlogPage) {
      // Blog page - always white background with dark text
      gsap.set(nav, {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: '#323232',
      })
      setIsScrolled(true)
      return
    }

    // Initial state - transparent with white text (for non-blog pages)
    gsap.set(nav, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: 'white',
    })

    // Scroll trigger for all screen sizes - only for non-blog pages
    const scrollTrigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: '+=100',
      onUpdate: (self) => {
        const progress = self.progress

        if (!isBlogPage) {
          if (progress > 0) {
            // Scrolled - white background with dark text
            gsap.set(nav, {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: '#323232',
            })
            setIsScrolled(true)
          } else {
            // At top - transparent with white text
            gsap.set(nav, {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              color: 'white',
            })
            setIsScrolled(false)
          }
        }
      },
      //markers: true, // Show scroll trigger markers
    })

    // Cleanup
    return () => {
      scrollTrigger.kill()
    }
  }, [location.pathname])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isBlogPage = location.pathname === '/blog'

      if (isBlogPage) {
        // Blog page - always white with dark text
        gsap.set(navRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          color: '#323232',
        })
      } else {
        // Non-blog pages - check scroll position to determine state
        const scrollY = window.scrollY
        if (scrollY > 0) {
          // Scrolled - white background
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: '#323232',
          })
          setIsScrolled(true)
        } else {
          // At top - transparent background
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: 'white',
          })
          setIsScrolled(false)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial call

    return () => window.removeEventListener('resize', handleResize)
  }, [location.pathname])

  // Handle scroll to close mobile menu and project drawer
  useEffect(() => {
    const handleScroll = () => {
      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false)
        setIsMobileMenuOpen(false)
        setIsMobileProjectOpen(false)

        // Return nav to appropriate state based on scroll position
        const isBlogPage =
          location.pathname === '/blog' ||
          location.pathname.startsWith('/blog/')
        const scrollY = window.scrollY

        if (isBlogPage) {
          // Blog page - stay white
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: '#323232',
          })
          setIsScrolled(true)
        } else if (scrollY > 0) {
          // Other pages and scrolled - stay white
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: '#323232',
          })
          setIsScrolled(true)
        } else {
          // Other pages and at top - return to transparent
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: 'white',
          })
          setIsScrolled(false)
        }
      }

      // Close project drawer if open
      if (isProjectDrawerOpen) {
        setIsProjectDrawerOpen(false)

        // Return nav to appropriate state based on scroll position
        const isBlogPage =
          location.pathname === '/blog' ||
          location.pathname.startsWith('/blog/')
        const scrollY = window.scrollY

        if (isBlogPage) {
          // Blog page - stay white
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: '#323232',
          })
          setIsScrolled(true)
        } else if (scrollY > 0) {
          // Other pages and scrolled - stay white
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: '#323232',
          })
          setIsScrolled(true)
        } else {
          // Other pages and at top - return to transparent
          gsap.set(navRef.current, {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: 'white',
          })
          setIsScrolled(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen, isProjectDrawerOpen, location.pathname])

  const toggleMobileMenu = () => {
    const newState = !isOpen
    setIsOpen(newState)
    setIsMobileMenuOpen(newState)

    const isBlogPage = location.pathname === '/blog'

    if (newState) {
      // Mobile menu opened - change to white background with dark text
      gsap.set(navRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: '#323232',
      })
    } else {
      // Mobile menu closed - back to appropriate state based on page and scroll
      const scrollY = window.scrollY

      if (isBlogPage) {
        // Blog page - stay white
        gsap.set(navRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          color: '#323232',
        })
        setIsScrolled(true)
      } else if (scrollY > 0) {
        // Other pages and scrolled - stay white
        gsap.set(navRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          color: '#323232',
        })
        setIsScrolled(true)
      } else {
        // Other pages and at top - return to transparent
        gsap.set(navRef.current, {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          color: 'white',
        })
        setIsScrolled(false)
      }
      setIsMobileProjectOpen(false)
    }
  }

  const handleProjectClick = () => {
    const newDrawerState = !isProjectDrawerOpen
    setIsProjectDrawerOpen(newDrawerState)

    if (newDrawerState) {
      // When projects drawer opens, change to white background with dark text
      gsap.set(navRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: '#323232',
      })
      // Force update the scrolled state to ensure dark fonts
      setIsScrolled(true)
    } else {
      // When projects drawer closes, return to appropriate state based on current page and scroll position
      const isBlogPage = location.pathname === '/blog'
      const scrollY = window.scrollY

      if (isBlogPage) {
        // Blog page - stay white
        gsap.set(navRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          color: '#323232',
        })
        setIsScrolled(true)
      } else if (scrollY > 0) {
        // Other pages and scrolled - stay white
        gsap.set(navRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          color: '#323232',
        })
        setIsScrolled(true)
      } else {
        // Other pages and at top - return to transparent
        gsap.set(navRef.current, {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          color: 'white',
        })
        setIsScrolled(false)
      }
    }
  }

  // Check if we're on blog page
  const isBlogPage =
    location.pathname === '/blog' || location.pathname.startsWith('/blog/')

  // Desktop nav links hardcoded
  return (
    <>
      <nav
        ref={navRef}
        className="fixed w-full left-0 top-0 z-50 font-sans"
        style={{
          backgroundColor: isBlogPage
            ? 'rgba(255, 255, 255, 1)'
            : 'rgba(0, 0, 0, 0)',
          color: isBlogPage ? '#323232' : 'white',
        }}
      >
        <div className="mx-auto lg:px-36 sm:px-10 mob:py-1 mob:px-4">
          <div className="relative flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src={isScrolled || isMobileMenuOpen || isBlogPage 
                    ? 'https://raw.githubusercontent.com/RawAgent2407/bi-realty/main/public/images/photos/home/logo_w.png' 
                    : 'https://raw.githubusercontent.com/RawAgent2407/bi-realty/main/public/images/photos/home/logo_b.png'} 
                  alt={logo?.text || 'Build India'} 
                  className="h-24 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Center: Nav Links (Desktop) */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:flex">
              <div className="flex space-x-4">
                <NavLink
                  text="Home"
                  to="/"
                  isActive={location.pathname === '/'}
                  isScrolled={isScrolled}
                  isBlogPage={isBlogPage}
                />
                <NavLink
                  text="About"
                  to="/about"
                  isActive={location.pathname === '/about'}
                  isScrolled={isScrolled}
                  isBlogPage={isBlogPage}
                />
                {/* Projects as text with drawer on click */}
                <div className="relative flex items-center">
                  <button
                    type="button"
                    className={`inline-flex items-center w-fit h-[2.25rem] px-[0.875rem] py-[0.375rem] rounded-[0.25rem] text-base font-medium transition duration-300 ease-in-out ${
                      location.pathname === '/projects'
                        ? 'bg-white border border-[#00000014] shadow-sm text-gray-800'
                        : isScrolled || isBlogPage
                        ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        : 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10'
                    }`}
                    onClick={handleProjectClick}
                  >
                    Projects
                  </button>
                </div>
                <NavLink
                  text="Blog"
                  to="/blog"
                  isActive={location.pathname === '/blog'}
                  isScrolled={isScrolled}
                  isBlogPage={isBlogPage}
                />
              </div>
            </div>

            {/* Right: CTA (Desktop) */}
            <div className="hidden lg:flex items-center">
              <a
                href={ctaButton?.url || '#'}
                target="_blank"
                className={`group inline-flex items-center justify-end text-[1.125rem] leading-[1.75rem] tracking-[-0.02em] font-medium font-[Onest] capitalize relative transition duration-300 ease-in-out ${
                  isScrolled || isBlogPage ? 'text-[#353B3B]' : 'text-white'
                }`}
              >
                {ctaButton?.text || 'Take A Virtual Tour'}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${
                    isScrolled || isBlogPage ? 'bg-[#353B3B]' : 'bg-white'
                  }`}
                ></span>
              </a>
            </div>

            {/* Mobile: Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-white hover:bg-opacity-10 cursor-pointer transition duration-200"
              >
                <span className="sr-only">
                  {mobileMenu?.toggleText || 'Toggle menu'}
                </span>
                {!isOpen ? (
                  <MenuIcon
                    className={`text-[1.75rem] transition-colors duration-300 ${
                      isScrolled || isMobileMenuOpen || isBlogPage
                        ? 'text-gray-700'
                        : 'text-white'
                    }`}
                  />
                ) : (
                  <CloseIcon className="text-[1.75rem] text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ START: UPDATED Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden z-50">
            <div className="pt-2 pb-4 space-y-1 px-4 sm:px-6">
              {data?.menuItems?.map((item) => {
                if (item.title === 'Projects') {
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() =>
                          setIsMobileProjectOpen(!isMobileProjectOpen)
                        }
                        className="flex justify-between items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none"
                      >
                        <span>Projects</span>
                        <KeyboardArrowDownIcon
                          className={`transition-transform duration-200 ${
                            isMobileProjectOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isMobileProjectOpen && (
                        <div className="pl-5 pt-2 space-y-2">
                          {projects?.map((project) => (
                            <Link
                              key={project.id}
                              to={project.url}
                              onClick={() => setIsOpen(false)}
                              className="flex justify-between items-center px-3 py-1 text-sm font-medium text-gray-600 hover:text-black rounded-md"
                            >
                              {project.title}
                              <ArrowForwardIosIcon
                                fontSize="inherit"
                                className="text-xs"
                              />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                } else {
                  return (
                    <MobileNavLink
                      key={item.id}
                      text={item.title}
                      to={item.url}
                      onClick={() => setIsOpen(false)}
                      isActive={location.pathname === item.url}
                    />
                  )
                }
              })}
              <MobileNavLink
                text={ctaButton?.text || 'Take A Virtual Tour'}
                to={ctaButton?.url || '#'}
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        )}
        {/* ✅ END: UPDATED Mobile Menu */}
      </nav>

      {/* ProjectDrawer for desktop, toggled by click */}
      {isProjectDrawerOpen && (
        <div
          onMouseLeave={() => setIsProjectDrawerOpen(false)}
          className="hidden lg:block"
        >
          <ProjectDrawer
            data={data}
            onClose={() => setIsProjectDrawerOpen(false)}
          />
        </div>
      )}
    </>
  )
}

const NavLink = ({ text, to, isActive, isScrolled, isBlogPage }) => (
  <Link
    to={to}
    className={`
      inline-flex items-center w-fit h-[2.25rem] px-[0.875rem] py-[0.375rem]
      rounded-[0.25rem] text-base font-medium transition duration-300 ease-in-out
      ${
        isActive
          ? 'bg-white border border-[#00000014] shadow-sm text-gray-800'
          : isScrolled || isBlogPage
          ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          : 'text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-10'
      }
    `}
  >
    {text}
  </Link>
)

const MobileNavLink = ({ text, to, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`
      block px-3 py-2 text-base font-medium transition duration-300 ease-in-out rounded-md
      ${
        isActive
          ? 'bg-gray-100 text-gray-800'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
      }
    `}
  >
    {text}
  </Link>
)

export default Nav
