import React from 'react'
import EnterTwoURLs from './EnterTwoURLs'
import SecondaryNavbarComponent from './navbarSecondary'
import Footer from './footer'
import BodyCheckTwoURLs from './BodyCheckTwoURLs'
import ForwardToCheckTwoTexts from './ForwardToCheckTwoTexts'

/**
 * The entire page was built around the Bootstrap library.
 *
 * Important links from their documentation:
 * https://getbootstrap.com/docs/5.0/utilities/spacing/
 * https://getbootstrap.com/docs/5.0/layout/grid/
 * https://getbootstrap.com/docs/5.0/utilities/flex/
 *
 * @returns JSX Element contain the secondary page, where the user is routed if he uses the "URL similarity checker" feature. It is displayed at "/checkURL"
 *
 */

const checkTwoURLs = () => {
  const applicationName = 'NewsCop'
  const prompt = '... or you may want to check the similarity of two text paragraphs'

  return (
    <>
      {/* Secondary Navbar Component that routes back to the main page */}
      <SecondaryNavbarComponent name={applicationName} />

      {/* Plagiarism checker Text section */}
      <BodyCheckTwoURLs />

      {/* Enter article's URLs section */}
      <EnterTwoURLs />

      {/* Component that routes /checkURL to /checkText
      if user wants to input a text fragment, not an URL that will be crawled */}
      <ForwardToCheckTwoTexts prompt={prompt} />

      {/* Footer */}
      <Footer />

    </>
  )
}

export default checkTwoURLs
