import Container from 'react-bootstrap/Container'
import { Col, Row } from "react-bootstrap";


/**
 *
 * A functional component that displays the  Plagiarism checker information.
 *
 * @param {object} props - The props object containing the description and imageUrl.
 * @param {string} props.title - The title of the checkURL page.
 * @param {string} props.description - The description of the checkURL page.
 *
 * @returns {JSX.Element} - A JSX element representing the Plagiarism checker information.
*/

export default function PlagiarismCheckerText ({ title, description }) {
  return (
    <Container className='my-3 d-flex' id='plagiarismCheckerText'>
      <div className="d-flex flex-column justify-content-center text-center">
        <div className='mb-4'>
          <h2 className='title' style={{ color: 'black' }}>{title}</h2>
        </div>
        <div className='mb-4 text-end'>
          <p className='description-paragraph'>{description}</p>
        </div>
      </div>
    </Container>
  )
}

