import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

/**
 *  The submit button is designed for the submit text page, where the user needs to enter a news article.
 *  After that the user can press the submit button to check whether that news article has been plagiarised.
 *  After a submission, the button will become disabled for 10 seconds so that the user cannot spam the service.
 *
 * @returns {JSX.Element} a button that is centered, and that is
 * stylised to look very similar to the one on the Figma Wireframe.
 */
const SubmitButton = () => {
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

  return (
    <Container>
      <div className='d-flex'>
        <div className='mb-3 mx-auto'>
          <Button
            onClick={handleSubmit} disabled={loading}
            variant='primary' className='mb-4'
            id='submitButton'
          ><p className='description-paragraph'>Submit</p>
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default SubmitButton
