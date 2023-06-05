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
export default function HelpPage () {
  // Application name
  const applicationName = 'NewsCop'

  const questions = [
    {
      question: 'What is a news article overlap platform?',
      answer: 'A news article overlap platform is a digital tool or software that employs fingerprinting techniques to compare and analyze the lexical similarities between different news articles. It helps users identify common content, phrases, or sentence structures across multiple sources, allowing them to assess the overlap and potential redundancy in news reporting.'
    },
    {
      question: 'How does a news article overlap platform work?',
      answer: "A news article overlap platform uses fingerprinting to generate unique representations (fingerprints) for each news article. These fingerprints are created by taking windows of length 8 from the original text and then hash each of those sub-strings, storing them in an array. By comparing these fingerprints, the platform identifies similarities and detects potential overlaps between different news articles on a lexical level, without relying on natural language processing (NLP) algorithms."
    },
    {
      question: 'What problem does a news article overlap platform solve?',
      answer: 'A news article overlap platform addresses the issue of redundant or duplicated content in news articles. By utilizing fingerprinting techniques, it helps users identify lexical overlaps, where the same or similar content is found across multiple sources. This allows users to evaluate the extent of redundancy in news reporting and make informed decisions about the credibility and relevance of the information.'
    },
    {
      question: 'How can I use a news article overlap platform to improve my research?',
      answer: 'Researchers can leverage a news article overlap platform to enhance their research in several ways. Firstly, it assists in identifying multiple sources covering the same topic, providing a broader perspective and potentially uncovering additional insights. Secondly, it helps researchers detect instances of lexical repetition or similarity, enabling them to identify common narratives or trends in news reporting. Finally, it aids in evaluating the consistency and reliability of information by comparing the lexical content across different sources using fingerprinting techniques.'
    },
    {
      question: 'Can a news article overlap platform detect lexical similarity using fingerprinting?',
      answer: 'Yes, a news article overlap platform that employs fingerprinting techniques can effectively detect lexical similarity between news articles. By generating unique fingerprints for each article through hashing or other techniques, the platform can compare these fingerprints to identify similarities and potential overlaps in the lexical content of different news articles. This approach allows for efficient comparison without relying on complex natural language processing (NLP) algorithms, as the focus is on generating and comparing fixed-length codes rather than analyzing semantic meaning.'
    }
  ]

  // State for tracking expanded/collapsed state of each card
  const [cardIsExpanded, setCardIsExpanded] = useState([])

  /**
   *
   * Handles the click event on a card to expand/collapse it.
   * @param {number} index - The index of the card in the questions array
   */
  const handleCardClick = (index) => {
    setCardIsExpanded((prevExpanded) => {
      const expanded = [...prevExpanded]
      expanded[index] = !expanded[index]
      return expanded
    })
  }

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
            {questions.map((question, index) => {
              return (
                <div className='px-2 py-2 px-md-5 py-md-3 mb-4 rounded shadow-sm' style={{ backgroundColor: '#f5f5f5' }} key={index}>
                  <div className='d-flex align-items-center' data-bs-toggle='collapse' href={`#collapseExample${index}`} role='button' name={question.question} aria-expanded='false' aria-controls={`collapseExample${index}`} onClick={() => handleCardClick(index)}>
                    <FontAwesomeIcon
                      icon={cardIsExpanded[index] ? faMinus : faPlus}
                      className={`custom-icon d-inline ${cardIsExpanded[index] ? 'expanded' : ''}`}
                      style={{ width: '36px', height: '36px' }}
                      id={`icon${index}`}
                    />
                    <p className='ps-4 d-inline m-0 fs-4'>{question.question}</p>
                  </div>
                  <div id={`collapseExample${index}`} className='collapse'>
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
