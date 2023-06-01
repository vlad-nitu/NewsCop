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
    <div>
      <h2 className='description-paragraph text-center mb-1 mb-md-3'>{description}</h2>
      <div className='d-flex flex-grow-1'>
        <div className='flex-grow-1'>
          <div className='custom-textarea-container'>
            <textarea placeholder={placeholder} value={textAreaValue} disabled={disabled} className='form-control custom-textarea vh-mobile-custom' id='textBox' rows='4' onChange={handleTextAreaChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextBox
