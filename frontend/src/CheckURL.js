import React from 'react'
import { Nav } from 'react-bootstrap'
import NavbarComponent from './components/navbar'
import PlagiarismCheckerText from './PlagiarismCheckerText'

const checkURL = () => {

  const applicationName = 'NewsCop'
  const title = "Plagiarism checker"
  const description = "Our plagiarims checker detects plagiarism in your news article."

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} />

      {/* Plagiarism checker Text section*/} 
      <PlagiarismCheckerText title={title} description={description} />

    </>
  ) 
}

export default checkURL
