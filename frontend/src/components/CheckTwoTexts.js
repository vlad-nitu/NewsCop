import axios from 'axios'
import NavbarComponent from './navbarSecondary'
import Footer from './footer'
import BodyCheckTwoTexts from './BodyCheckTwoTexts'
import TextBox from './TextBox'
import SubmitButton from './submitButton'
import { useState } from 'react'

/**
 * The page for the checking two texts for overlapping. It contains all the components that will be present in the page,
 * and reuses some of the elements that can be found in the main page.
 *
 * @returns {JSX.Element} the check text for plagiarism component
 */
export default function CheckTwoTexts () {
  const applicationName = 'NewsCop'
  const [originalTextBoxDescription, setOriginalTextBoxDescription] = useState('')
  const [changedTextBoxDescription, setChangedTextBoxDescription] = useState('')
  const [similarity, setSimilarity] = useState(0)
  const [displaySimilarity, setDisplaySimilarity] = useState(false)
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
    setDisplaySimilarity(false)
    console.log(loading)
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 3000)
    )

    setLoading(false)
    setDisplaySimilarity(true)
    setSimilarity(Math.round(await (compareTexts(originalTextBoxDescription, changedTextBoxDescription)) * 100))
    console.log(loading)
  }

  const compareTextsEndpoint = 'http://localhost:8000/compareTexts/'

  /**
   * Send request to compute similarity between two pieces of text.
   * @param originalText the first text which is checked
   * @param compareText the second text which is checked
   * @returns {Promise<any>} the response after the similarity coefficient is computed
   */
  const compareTexts = async (originalText, compareText) => {
    try {
      const data = {
        original_text: originalText,
        compare_text: compareText
      }
      const response = await axios.post(`${compareTextsEndpoint}`, data)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to compute similarity')
    }
  }

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} />
      {/* The description text about news overlap */}
      <BodyCheckTwoTexts />
      <div className='parentBoxesContainer'>
        <div className='childBoxContainer'>
          {/* Text area */}
          <TextBox description={'Enter the original content'} disabled={loading} textAreaValue={originalTextBoxDescription} setTextAreaValue={setOriginalTextBoxDescription}/>
        </div>
        <div className='childBoxContainer'>
          {/* Text area */}
          <TextBox description={'Enter the changed content'} disabled={loading} textAreaValue={changedTextBoxDescription} setTextAreaValue={setChangedTextBoxDescription}/>
        </div>
      </div>
      {/* The submit button */}
      <SubmitButton disabled={loading} onClickMethod={handleSubmit} />
      {/* Similarity display*/}
      <div>
        {displaySimilarity === true && <p>The two given text files have a similarity level of {similarity}%</p>}
      </div>
      {/* Footer */}
      <Footer />
    </>
  )
}
