import Container from 'react-bootstrap/Container'

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
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='title' style={{ color: 'black', fontSize: '3vw' }}>{title}</h2>
        </div>
        <div className='mb-4'>
          <p className='description-paragraph' style={{ fontSize: '1.5vw' }}>{description}</p>
        </div>
      </div>
    </Container>
  )
}
