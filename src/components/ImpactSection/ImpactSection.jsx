import React from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../Button'

const ImpactSection = ({ data }) => {
  const { title, description, downloadLink } = data
  const location = useLocation()

  const showDownloadButton = [
    '/projects/rajpath-grand',
    '/projects/rajpath-enclave',
    '/projects/green-city'
  ].includes(location.pathname)

  return (
    <section className="bg-white py-16 px-16 sm:px-8 lg:px-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-gray-900 mb-4 mob:text-2xl">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-900 font-sans mb-8 leading-relaxed">
          {description}
        </p>
        {showDownloadButton &&  (
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <Button variant="dark-outline">Download Catalog</Button>
          </a>
        )}
      </div>
    </section>
  )
}

export default ImpactSection