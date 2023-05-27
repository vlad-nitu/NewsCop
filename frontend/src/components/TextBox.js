import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import { RichTextarea } from 'rich-textarea'

/**
 * In the service of checking text from an article against plagiarism, we needed a text box to enter information,
 * and here that is solved.
 *
 * @returns {JSX.Element} that is a TextBox where users can enter the news article
 */
const TextBox = ({ description, disabled, textAreaValue, setTextAreaValue, placeholder }) => {
  const handleTextAreaChange = (event) => {
    if (setTextAreaValue != null) { setTextAreaValue(event.target.value) }
  }

  return (
    <Container style={{ height: 'calc(100% - 5vh)' }}>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='description-paragraph'>{description}</h2>
        </div>
      </div>
      <div className='d-flex justify-content-center' style={{ height: '100%' }}>
        <div className='form-group custom-container' style={{ height: '100%' }}>
          <div className='custom-textarea-container'>
            <RichTextarea placeholder={placeholder} value={textAreaValue} disabled={disabled} className='form-control custom-textarea' id='textBox' rows='4' onChange={handleTextAreaChange} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </Container>

  )
}

export default TextBox
