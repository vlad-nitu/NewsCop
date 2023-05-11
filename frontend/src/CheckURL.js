import React from 'react'
import EnterURL from './components/EnterURL'
import PlagiarismCheckerText from './components/PlagiarismCheckerText'
import SecondaryNavbarComponent from './components/navbarSecondary'
import Footer from './components/footer'
import ForwardToCheckText from './components/ForwardToCheckText'

const checkURL = () => {
  const applicationName = 'NewsCop'
  const title = 'Plagiarism checker'
  const description = 'Our plagiarims checker detects plagiarism in your news article.'
  const prompt = '... or you may want to check a text paragraph for plagiarism'

  return (
    <>
      {/* Secondary Navbar Component that routes back to the main page */}
      <SecondaryNavbarComponent name={applicationName} />

      {/* Plagiarism checker Text section */}
      <PlagiarismCheckerText title={title} description={description} />

      {/* Enter article's URL section */}
      <EnterURL />

      {/* Component that routes /checkURL to /checkText
      if user wants to input a text fragment, not an URL that will be crawled */}
      <ForwardToCheckText prompt={prompt} />

      {/* Footer */}
      <Footer />

    </>
  )
}

export default checkURL
