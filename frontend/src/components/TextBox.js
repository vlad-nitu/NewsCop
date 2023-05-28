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
  description, disabled, textAreaValue, setTextAreaValue, placeholder, highlighted, isHighlighted, similarity
}) => {
  const handleTextAreaChange = (event) => {
    if (setTextAreaValue != null) { setTextAreaValue(event.target.value) }
  }

  const highlightWordsOnly = ({ autoEscape, caseSensitive, sanitize, searchWords, textToHighlight, similarity }) => {
    if (similarity === 0) {
      return [] // Return an empty array if similarity is 0
    }

    const words = textToHighlight.trim().split(/\s+/) // Split the text into an array of words

    const chunks = []
    let currentIndex = 0

    words.forEach((word) => {
      const matchedWord = searchWords.find((searchWord) =>
        caseSensitive ? word === searchWord : word.toLowerCase() === searchWord.toLowerCase()
      )

      if (matchedWord) {
        const startIndex = textToHighlight.indexOf(word, currentIndex)
        const endIndex = startIndex + word.length
        chunks.push({ start: startIndex, end: endIndex })
      }

      currentIndex += word.length + 1 // Add 1 for the space between words
    })

    return chunks
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
                  findChunks={(options) => highlightWordsOnly({ ...options, similarity })}
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
