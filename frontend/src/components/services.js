import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

/**
 *
 * A component that renders three service cards, each with an image, a title, a description, and a "Try it" button.
 *
 * @param {string[]} titles - The titles for each service card.
 * @param {string[]} descriptions - The descriptions for each service card.
 * @param {string[]} images - The URLs for each image to be displayed on each service card.
 * @throws {Error} Will throw an error if the length of the titles array is different from the length of the descriptions array,
 the length of the images array, or if the length of the descriptions array is different from the length of the images array.
 *
 * @returns {JSX.Element} Returns a JSX element that renders the three service cards with the provided titles, descriptions, and images.
 *
 */
export default function Services ({ titles, descriptions, images }) {
  if (titles.length !== descriptions.length ||
        titles.length !== images.length ||
        descriptions.length !== images.length) {
    throw Error('Different lengths of the arrays.')
  }

  // Styles for the images displayed for each service.
  const imageStyle = {
    width: '100%',
    height: 'auto'
  }

  // Styles for the title of each service.
  const textStyle = {
    color: 'white',
    fontWeight: 'bolder'
  }

  // Styles for the description of each service.
  const textStyleParagraph = {
    color: 'white'
  }

  const handleClick = () => {
    window.scrollTo(0, 0)
  }

  // Renders a JSX element with information about services.
  return (
    <div id='services' style={{ backgroundColor: '#2E837E' }}>
      <Container className='py-5'>
        <h2 className='title'>Services</h2>
        <Row className='pt-4'>
          {titles.map((title, index) => (
            <Col key={index} xs={12} sm={6} md={3} className='mb-3'>
              <div className='d-flex flex-column'>
                <img style={imageStyle} src={images[index]} alt={`Service ${index + 1}`} className='pb-4' />
                <h3 style={textStyle}>{title}</h3>
                <p style={textStyleParagraph}>{descriptions[index]}</p>
                {index === 0 && (
                  <Col>
                    <Link to='/checkURL'>
                      <button type='button' onClick={handleClick} className='btn btn-outline-warning'>
                        Try it
                      </button>
                    </Link>
                  </Col>

                )}
                {index === 1 && (
                  <Col>
                    <Link to='/checkText'>
                      <button type='button' data-testid='ButtonTest' onClick={handleClick} className='btn btn-outline-warning'>
                        Try it
                      </button>
                    </Link>
                  </Col>
                )}
                {index === 2 && (
                  <Col>

                    <Link to='/compareTexts'>
                      <button type='button' onClick={handleClick} className='btn btn-outline-warning'>
                        Try it
                      </button>
                    </Link>
                  </Col>
                )}
                {index === 3 && (
                  <Col>
                    <Link to='/compareURLs'>
                      <button type='button' onClick={handleClick} className='btn btn-outline-warning'>
                        Try it
                      </button>
                    </Link>
                  </Col>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
