import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Container from 'react-bootstrap/Container'

/**
 * In the service of checking text from an article against plagiarism, we needed a text box to enter information,
 * and here that is solved.
 *
 * @returns {JSX.Element} that is a TextBox where users can enter the news article
 */
const TextBox = ({ description, disabled }) => {
  return (
    <Container>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='description-paragraph'>{description}</h2>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <div className='form-group custom-container'>
          <div className='custom-textarea-container'>
            <textarea disabled={disabled} placeholder='Enter your article here' className='form-control custom-textarea' id='textBox' rows='4' />
          </div>
        </div>
      </div>
    </Container>

  )
}

export default TextBox
