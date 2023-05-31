import React from 'react'
import EnterURL from './EnterURL'
import Footer from './footer'
import BodyCheckGeneric from './BodyCheckGeneric'
import NavbarComponent from './navbar'

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
  const description = 'News overlap checker'
  const secondDescription = 'Our tool detects overlap in your news article.'
  return (
    <>

      {/* Secondary Navbar Component that routes back to the main page */}
      <NavbarComponent name={applicationName} mainPage={false} />

      {/* Plagiarism checker Text section */}
      <BodyCheckGeneric description={description} secondDescription={secondDescription} />

      {/* Enter article's URL section */}
      <EnterURL />

      {/* Footer */}
      <Footer />
    </>
  )
}

export default checkURL
