import React from 'react'
import EnterURL from './EnterURL'
import SecondaryNavbarComponent from './navbarSecondary'
import Footer from './footer'
import ForwardToCheckText from './ForwardToCheckText'
import BodyCheckOneText from './BodyCheckOneText'

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

const checkURL = () => {
  const applicationName = 'NewsCop'
  const prompt = '... or you may want to check a text paragraph for plagiarism'

  return (
    <>
      {/* Secondary Navbar Component that routes back to the main page */}
      <SecondaryNavbarComponent name={applicationName} />

      {/* Plagiarism checker Text section */}
      <BodyCheckOneText />

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
