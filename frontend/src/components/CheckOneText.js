import NavbarComponent from './simpleNavbar'
import Footer from './footer'

export default function CheckOneText () {
  const applicationName = 'NewsCop'

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} />

      {/* Footer */}
      <Footer />
    </>
  )
}
