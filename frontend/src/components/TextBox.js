import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

/**
 * In the service of checking text from an article against plagiarism, we needed a text box to enter information,
 * and here that is solved.
 *
 * @returns {JSX.Element} that is a TextBox where users can enter the news article
 */
const TextBox = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='form-group custom-container'>
        <label htmlFor='textBox'>Enter the article’s content to check for plagiarism</label>
        <div className='custom-textarea-container'>
          <textarea className='form-control custom-textarea' id='textBox' rows='4' />
        </div>
      </div>
    </div>
  )
}

export default TextBox
