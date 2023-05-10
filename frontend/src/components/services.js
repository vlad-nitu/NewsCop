import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/checkOneText')
  }

  // Renders a JSX element with information about services.
  return (
    <div id='services' style={{ backgroundColor: '#2E837E' }}>
      <Container className='py-5'>
        <h2 className='title'>Services</h2>
        <Row className='pt-3'>
          <Col md={4} className='pe-sm-4 mb-4 mb-sm-0'>
            <img style={imageStyle} src={images[0]} alt='Service 1' className='pb-3' />
            <h3 style={textStyle}>{titles[0]}</h3>
            <p style={textStyleParagraph}>{descriptions[0]}</p>
            <button type='button' className='btn btn-outline-warning'>Try it</button>
          </Col>
          <Col md={4} className='pe-sm-4 mb-4 mb-sm-0'>
            <img style={imageStyle} src={images[1]} alt='Service 2' className='pb-3' />
            <h3 style={textStyle}>{titles[1]}</h3>
            <p style={textStyleParagraph}>{descriptions[1]}</p>
            <button type='button' onClick={handleClick} className='btn btn-outline-warning'>Try it</button>
          </Col>
          <Col md={4} className='pe-sm-4'>
            <img style={imageStyle} src={images[2]} alt='Service 3' className='pb-3' />
            <h3 style={textStyle}>{titles[2]}</h3>
            <p style={textStyleParagraph}>{descriptions[2]}</p>
            <button type='button' className='btn btn-outline-warning'>Try it</button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
