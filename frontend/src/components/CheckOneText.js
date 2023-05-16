import NavbarComponent from './navbar'
import Footer from './footer'
import BodyCheckOneText from './BodyCheckOneText'
import TextBox from './TextBox'
import SubmitButton from './submitButton'

/**
 * The page for the check text for plagiarism page. It contains all the components that will be present in the page,
 * and reuses some of the elements that can be found in the main page.
 *
 * @returns {JSX.Element} the check text for plagiarism component
 */
export default function CheckOneText () {
  const applicationName = 'NewsCop'

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} mainPage={false} />
      {/* The description text about news overlap */}
      <BodyCheckOneText />
      <div id='divText'>
        {/* Text area */}
        <TextBox />
      </div>
      {/* The submit button */}
      <SubmitButton />
      {/* Footer */}
      <Footer />
    </>
  )
}
