import NavbarComponent from './navbarSecondary'
import Footer from './footer'
import BodyCheckTwoTexts from './BodyCheckTwoTexts'
import TextBox from './TextBox'
import SubmitButton from './submitButton'

/**
 * The page for the checking two texts for overlapping. It contains all the components that will be present in the page,
 * and reuses some of the elements that can be found in the main page.
 *
 * @returns {JSX.Element} the check text for plagiarism component
 */
export default function CheckTwoTexts () {
  const applicationName = 'NewsCop'
  const originalTextBoxDescription = 'Enter the original content'
  const changedTextBoxDescription = 'Enter the changed content'

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} />
      {/* The description text about news overlap */}
      <BodyCheckTwoTexts />
      <div className='parentBoxesContainer'>
        <div className='childBoxContainer'>
          {/* Text area */}
          <TextBox description={originalTextBoxDescription} />
        </div>
        <div className='childBoxContainer'>
          {/* Text area */}
          <TextBox description={changedTextBoxDescription} />
        </div>
      </div>
      {/* The submit button */}
      <SubmitButton />
      {/* Footer */}
      <Footer />
    </>
  )
}
