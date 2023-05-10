import Container from 'react-bootstrap/Container'

/**
 * A container that will hold the plagiarism header and description subheader that
 * can be found on the Figma wireframe.
 *
 *
 * @returns {JSX.Element} that represents the plagiarism text and description
 */
export default function BodyCheckOneText () {
  const description = 'Plagiarism checker'
  const secondDescription = 'Our plagiarism checker detects plagiarism in your news article.'
  return (
    <Container className='my-3 d-flex'>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='title' id='plagiarismChecker'>{description}</h2>
        </div>
        <div className='mb-4'>
          <p className='description-paragraph'>{secondDescription}</p>
        </div>
      </div>
    </Container>
  )
}
