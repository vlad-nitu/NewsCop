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
        <div style={{ margin: '0 auto' }}>
          <Row className='pt-4'>
            <Col md={3} className='pe-sm-3 mb-3 mb-sm-0'>
              <img style={imageStyle} src={images[0]} alt='Service 1' className='pb-4' />
              <h3 style={textStyle}>{titles[0]}</h3>
              <p style={textStyleParagraph}>{descriptions[0]}</p>
            </Col>
            <Col md={3} className='pe-sm-3 mb-3 mb-sm-0'>
              <img style={imageStyle} src={images[1]} alt='Service 2' className='pb-4' />
              <h3 style={textStyle}>{titles[1]}</h3>
              <p style={textStyleParagraph}>{descriptions[1]}</p>
            </Col>
            <Col md={3} className='pe-sm-3 mb-3 mb-sm-0'>
              <img style={imageStyle} src={images[2]} alt='Service 3' className='pb-4' />
              <h3 style={textStyle}>{titles[2]}</h3>
              <p style={textStyleParagraph}>{descriptions[2]}</p>
            </Col>
            <Col md={3} cclassName='pe-sm-3 mb-3 mb-sm-0'>
              <img style={imageStyle} src={images[3]} alt='Service 4' className='pb-4' />
              <h3 style={textStyle}>{titles[3]}</h3>
              <p style={textStyleParagraph}>{descriptions[3]}</p>
            </Col>
          </Row>
          <Row className='pt-4'>
            <Col md={3} className='pe-sm-3 mb-3 mb-sm-0'>
              <Link to='/checkURL'>
                <button type='button' onClick={handleClick} className='btn btn-outline-warning'>Try it
                </button>
              </Link>
            </Col>
            <Col md={3} className='pe-sm-3 mb-3 mb-sm-0'>
              <Link to='/checkText'>
                <button type='button' data-testid='ButtonTest' onClick={handleClick} className='btn btn-outline-warning'>Try it
                </button>
              </Link>
            </Col>
            <Col md={3} className='pe-sm-3 mb-3 mb-sm-0'>
              <Link to='/compareTexts'>
                <button type='button' onClick={handleClick} className='btn btn-outline-warning'>Try it</button>
              </Link>
            </Col>
            <Col md={3} className='pe-sm-3 mb-3 mb-sm-0'>
              <Link to='/compareURLs'>
                <button type='button' onClick={handleClick} className='btn btn-outline-warning'>Try it
                </button>
              </Link>
            </Col>

          </Row>
        </div>
      </Container>
    </div>
  )
}
