import NavbarComponent from './navbar'
import Footer from './footer'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

/**
 *
 * HelpPage component
 *
 * This component represents the HelpPage of the application.
 * It displays frequently asked questions (FAQs) and their corresponding answers in an expandable card format.
 *
 * @returns {JSX.Element} The HelpPage component
 */
export default function HelpPage ({ questionsFile }) {
  // Application name
  const applicationName = 'NewsCop'

  // State for tracking expanded/collapsed state of each card
  const [cardIsExpanded, setCardIsExpanded] = useState([])
  const [isClickable, setIsClickable] = useState(true) // Add new state for controlling clickability of each card
  const [parsedQuestions, setParsedQuestions] = useState([])

  /**
   *
   * Handles the click event on a card to expand/collapse it.
   * @param {number} index - The index of the card in the questions array
   */
  const handleCardClick = (index) => {
    if (isClickable) {
      setIsClickable(false) // Disable clickability
      setCardIsExpanded((prevExpanded) => {
        const expanded = [...prevExpanded]
        expanded[index] = !expanded[index]
        return expanded
      })
      setTimeout(() => {
        setIsClickable(true) // Enable clickability after 1 second
      }, 350)
    }
  }

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0)
    // Store the questions in parsed questions
    setParsedQuestions(questionsFile)
  }, [questionsFile])

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} mainPage={false} />

      <Container>
        <div id='titles' className='pt-5 text-center'>
          <h5 className='fw-normal'>FAQs</h5>
          <h1 className='fw-normal'>Frequently asked questions</h1>
          <h4 className='text-muted fw-light'>Have questions? We’re here to help.</h4>
        </div>
        <div id='body' className='py-4'>
          <div className='w-100'>
            {parsedQuestions.map((question, index) => {
              return (
                <div className='px-2 py-2 px-md-5 py-md-3 mb-4 rounded shadow-sm' style={{ backgroundColor: '#f5f5f5' }} key={index}>
                  <div className='d-flex align-items-center' data-bs-toggle='collapse' href={`#collapseExample${index}`} role={isClickable ? 'button' : 'row'} name={question.question} data-testid={question.question} aria-expanded='false' aria-controls={`collapseExample${index}`} onClick={() => handleCardClick(index)}>
                    <FontAwesomeIcon
                      icon={cardIsExpanded[index] ? faMinus : faPlus}
                      className={`custom-icon d-inline ${cardIsExpanded[index] ? 'expanded' : ''}`}
                      style={{ width: '36px', height: '36px' }}
                      id={`icon${index}`}
                    />
                    <p className='ps-4 d-inline m-0 fs-4'>{question.question}</p>
                  </div>
                  <div id={`collapseExample${index}`} data-testid={`collapseExample${index}`} className='collapse'>
                    <div className='d-flex flex-row pt-3 pt-md-0'>
                      {/* The icon is needed such that the text will be indented the same as the title. (For some reason, there is still some difference, but I can't find any fix for that). Also, that icon is 'invisible'. */}
                      <FontAwesomeIcon icon={faPlus} className='invisible custom-icon' />
                      <p className='ps-4 text-muted fs-5 d-inline'>{question.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  )
}
