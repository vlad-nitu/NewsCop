import NavbarComponent from './navbar'
import Footer from './footer'
import BodyCheckGeneric from './BodyCheckGeneric'
import TextBox from './TextBox'
import SubmitButton from './submitButton'
import React, { useState } from 'react'
import ForwardToPage from './ForwardToPage'

/**
 * The page for the check text for similarity page. It contains all the components that will be present in the page,
 * and reuses some of the elements that can be found in the main page.
 *
 * @returns {JSX.Element} the check text for similarity component
 */
export default function CheckOneText ({ applicationName }) {
  const textBoxDescription = 'Enter the article’s content to check for overlap'
  const [loading, setLoading] = useState(false)

  /**
     * Disable a button after using it for 10 seconds.
     * Source: https://stackoverflow.com/questions/63820933/how-to-disable-a-button-using-react-usestate-hook-inside-event-handler
     *
     * @param event an event, a click event in our case
     * @returns {Promise<void>} after the time passes, the button will become usable again
     */
  async function handleSubmit (event) {
    setLoading(true)
    console.log(loading)

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 10000)
    )

    setLoading(false)
    console.log(loading)
  }
  const description = 'News overlap checker'
  const secondDescription = 'Our tool detects overlap in your news article.'
  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} mainPage={false} />
      {/* The description text about news overlap */}
      <BodyCheckGeneric description={description} secondDescription={secondDescription} />
      <div style={{ height: '100%' }}>
        {/* Text area */}
        <TextBox description={textBoxDescription} disabled={loading} placeholder='Enter your article here' isHighlighted={false} highlighted='' />
      </div>
      {/* The submit button */}
      <SubmitButton disabled={loading} onClickMethod={handleSubmit} />

      {/* Routes the user to the check URL service */}
      <ForwardToPage page='/checkURL' prompt='... or you may want to check a news article via an URL for similarity' />

      {/* Footer */}
      <Footer />
    </>
  )
}
