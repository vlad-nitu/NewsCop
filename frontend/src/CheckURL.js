import React from 'react'
import { Nav } from 'react-bootstrap'
import NavbarComponent from './components/navbar'

const checkURL = () => {

  const applicationName = 'NewsCop'

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} />
    </>
  ) 
}

export default checkURL
