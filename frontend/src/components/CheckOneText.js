import NavbarComponent from './navbarFeatures'
import Footer from './footer'
import BodyCheckOneText from './BodyCheckOneText'
import TextBox from './TextBox'

export default function CheckOneText () {
  const applicationName = 'NewsCop'

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} />

      <BodyCheckOneText />
      <div>
        <TextBox />
      </div>
      {/* Footer */}
      <Footer />
    </>
  )
}
