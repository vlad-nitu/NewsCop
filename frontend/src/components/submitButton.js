import React from 'react'
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
const SubmitButton = ({ disabled, onClickMethod }) => {
  return (
    <Container className='pt-3'>
      <div className='d-flex'>
        <div className='mx-auto'>
          <Button
            onClick={onClickMethod} disabled={disabled}
            variant='primary' className='mb-4' data-testid='submit_button'
            id='submitButton' role='button'
          ><p className='description-paragraph'>Submit</p>
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default SubmitButton
