import axios from 'axios'
import NavbarComponent from './navbar'
import Footer from './footer'
import BodyCheckGeneric from './BodyCheckGeneric'
import TextBox from './TextBox'
import SubmitButton from './submitButton'
import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import ForwardToPage from './ForwardToPage'
import ProgressLineCustom from './ProgressLineCustom'

/**
 * Retrieve all common words with at least 4 characters, ignoring whitespaces and
 * upper case letters
 * @param str1 the first string
 * @param str2 the right string
 * @returns {*[]} an array of all common words with >= 4 characters
 */
function findCommonWords (str1, str2) {
  str1 = str1.toLowerCase()
  str2 = str2.toLowerCase()

  const words1 = new Set(str1.trim().split(/\s+/))
  const words2 = new Set(str2.trim().split(/\s+/))

  const commonWords = []
  words1.forEach(word => {
    if (word.length >= 4 && words2.has(word)) {
      commonWords.push(word)
    }
  })

  return commonWords
}

/**
 * The page for the checking two texts for overlapping. It contains all the components that will be present in the page,
 * and reuses some of the elements that can be found in the main page.
 *
 * @returns {JSX.Element} the check text for plagiarism component
 */

export default function CheckTwoTexts ({ applicationName, firstPlaceholder, secondPlaceholder }) {
  const [originalTextBoxDescription, setOriginalTextBoxDescription] = useState('')
  const [changedTextBoxDescription, setChangedTextBoxDescription] = useState('')
  const [similarity, setSimilarity] = useState(0)
  const [displaySimilarity, setDisplaySimilarity] = useState(false)
  const [loading, setLoading] = useState(false)
  const [highlightedText, setHighlightedText] = useState([''])
  /**
     * Disable a button after using it for 4 seconds.
     * Source: https://stackoverflow.com/questions/63820933/how-to-disable-a-button-using-react-usestate-hook-inside-event-handler
     *
     * @param event an event, a click event in our case
     * @returns {Promise<void>} after the time passes, the button will become usable again
     */
  async function handleSubmit (event) {
    setLoading(true)
    setDisplaySimilarity(false)
    setSimilarity(Math.round(await (compareTexts(originalTextBoxDescription, changedTextBoxDescription)) * 100))
    // console.log(findCommonWords(originalTextBoxDescription, changedTextBoxDescription))
    setHighlightedText(findCommonWords(originalTextBoxDescription, changedTextBoxDescription))

    setDisplaySimilarity(true)
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 4000)
    )
    setHighlightedText([''])
    setLoading(false)
  }

  const getOutputPrompt = () => {
    return 'The two given texts have a similarity level of ' + similarity + '%.'
  }
  const description = 'News overlap checker'
  const secondDescription = 'Our similarity checker determines the similarity levels between two text paragraphs.'

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} mainPage={false} />
      {/* The description text about news overlap */}
      <BodyCheckGeneric description={description} secondDescription={secondDescription} />
      <Container style={{ height: 'calc(60% - 6vh)' }}>
        <Row style={{ height: '100%' }}>
          <Col md={6} className='d-flex justify-content-center align-items-center'> {/* Center and resize TextBox */}
            <div className='w-100'>
              {/* Text area */}
              <TextBox
                description='Enter the original content'
                disabled={loading}
                textAreaValue={originalTextBoxDescription}
                setTextAreaValue={setOriginalTextBoxDescription}
                placeholder={firstPlaceholder}
                highlighted={highlightedText}
                isHighlighted
                similarity={similarity}
              />
            </div>
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center'> {/* Center and resize TextBox */}
            <div className='w-100'>
              {/* Text area */}
              <TextBox
                description='Enter the changed content'
                disabled={loading}
                textAreaValue={changedTextBoxDescription}
                setTextAreaValue={setChangedTextBoxDescription}
                placeholder={secondPlaceholder}
                highlighted={highlightedText}
                isHighlighted
                similarity={similarity}
              />
            </div>
          </Col>
        </Row>
      </Container>
      {/* The submit button */}
      <SubmitButton disabled={loading || (originalTextBoxDescription === '' || changedTextBoxDescription === '')} onClickMethod={handleSubmit} />
      {displaySimilarity && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: '140%', marginTop: '60px', textAlign: 'center' }}>
            {getOutputPrompt()}
          </div>
          <ProgressLineCustom progress={similarity} />
        </div>
      )}
      {/* Component that routes /compareTexts to /compareURLs
        if user wants to input two text paragraphs, not two URLs that will be crawled */}
      <ForwardToPage prompt='... or you may want to check the similarity of two news articles with their URLs' page='/compareURLs' />

      {/* Similarity display */}
      {/* Footer */}
      <Footer />
    </>
  )
}

const compareTextsEndpoint = 'http://localhost:8000/compareTexts/'

/**
   * Send request to compute similarity between two pieces of text.
   * @param originalText the first text which is checked
   * @param compareText the second text which is checked
   * @returns {Promise<any>} the response after the similarity coefficient is computed
   */
export const compareTexts = async (originalText, compareText) => {
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
