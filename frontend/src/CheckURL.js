import React from 'react'
import EnterURL from './components/EnterURL'
import PlagiarismCheckerText from './components/PlagiarismCheckerText'
import SecondaryNavbarComponent from './components/navbarSecondary'

const checkURL = () => {

  const applicationName = 'NewsCop'
  const title = "Plagiarism checker"
  const description = "Our plagiarims checker detects plagiarism in your news article."

  return (
    <>
      {/* Secondary Navbar Component that routes back to the main page */}
      <SecondaryNavbarComponent name={applicationName} />

      {/* Plagiarism checker Text section*/} 
      <PlagiarismCheckerText title={title} description={description} />

      {/* Enter article's URL section*/} 
      <EnterURL />

    </>
  ) 
}

export default checkURL
