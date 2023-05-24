import React from 'react'
import EnterTwoURLs from './EnterTwoURLs'
import NavbarComponent from './navbar'
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
 * @returns JSX Element contain the secondary page, where the user is routed if he uses the "Similarity checker for two URLs" feature. It is displayed at "/compareURLs"
 *
 */

const checkTwoURLs = () => {
  const applicationName = 'NewsCop'
  const prompt = '... or you may want to check the similarity of two text paragraphs'

  return (
    <>
      <div className='d-flex flex-column' style={{ height: '100vh' }}>

        {/* Secondary Navbar Component that routes back to the main page */}
        <NavbarComponent name={applicationName} mainPage={false} />

        {/* Similarity checker two URLs section */}
        <BodyCheckTwoURLs />

        {/* Enter article's URLs section */}
        <EnterTwoURLs />

        {/* Component that routes /compareURLs to /compareTexts
      if user wants to input two text paragraphs, not two URLs that will be crawled */}
        <ForwardToCheckTwoTexts prompt={prompt} />
      </div>
      {/* Footer */}
      <Footer />

    </>
  )
}

export default checkTwoURLs
