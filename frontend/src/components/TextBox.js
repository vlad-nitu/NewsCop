import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import { RichTextarea } from 'rich-textarea'
import Highlighter from 'react-highlight-words'

/**
 * In the service of checking text from an article against plagiarism, we needed a text box to enter information,
 * and here that is solved.
 *
 * @returns {JSX.Element} that is a TextBox where users can enter the news article
 */
const TextBox = ({
  description, disabled, textAreaValue, setTextAreaValue, placeholder, highlighted, isHighlighted
}) => {
  const handleTextAreaChange = (event) => {
    if (setTextAreaValue != null) { setTextAreaValue(event.target.value) }
  }

  return (
    <Container>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='description-paragraph'>{description}</h2>
        </div>
      </div>
      <div className='form-group custom-container'>
        <div className='custom-textarea-container'>
          {isHighlighted && (
            <RichTextarea
              placeholder={placeholder} value={textAreaValue} disabled={disabled}
              className='form-control custom-textarea' id='textBox' rows='4'
              onChange={handleTextAreaChange} style={{ width: '100%', height: '100px' }}
            >
              {(v) => (
                <Highlighter
                  highlightStyle={{ backgroundColor: 'rgba(46, 131, 126, 0.7)', color: 'rgba(255, 255, 255, 1)' }}
                  searchWords={highlighted}
                  autoEscape
                  textToHighlight={v}
                />
              )}
            </RichTextarea>
          )}
          {!isHighlighted && (
            <textarea
              placeholder={placeholder} value={textAreaValue} disabled={disabled}
              className='form-control custom-textarea' id='textBox' rows='4'
              onChange={handleTextAreaChange} style={{ width: '100%' }}
            />
          )}
        </div>
      </div>
    </Container>
  )
}

export default TextBox
