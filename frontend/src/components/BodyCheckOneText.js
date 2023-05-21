import Container from 'react-bootstrap/Container'

/**
 * A container that will hold the similarity header and description subheader that
 * can be found on the Figma wireframe.
 *
 *
 * @returns {JSX.Element} that represents the similarity text and description of our tool;
 * Can be found directly under the navbar component of the page
 */
export default function BodyCheckOneText () {
  const description = 'News overlap checker'
  const secondDescription = 'Our tool detects overlap in your news article.'

  return (
    <Container className='my-3 d-flex'>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='title' id='plagiarismChecker'>{description}</h2>
        </div>
        <div className='mb-4'>
          <p className='description-overlap'>{secondDescription}</p>
        </div>
      </div>
    </Container>
  )
}
