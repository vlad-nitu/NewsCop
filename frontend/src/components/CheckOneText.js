import NavbarComponent from './navbarFeatures'
import Footer from './footer'
import BodyCheckOneText from './BodyCheckOneText'
import TextBox from './TextBox'
import SubmitButton from './submitButton'

export default function CheckOneText () {
  const applicationName = 'NewsCop'

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} />

      <BodyCheckOneText />
      <div id='divText'>
        <TextBox />
      </div>
      <SubmitButton />
      {/* Footer */}
      <Footer />
    </>
  )
}
