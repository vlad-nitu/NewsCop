import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

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

  const endpoints = ['/checkURL', '/checkText', '/compareTexts', '/compareURLs']

  // Renders a JSX element with information about services.
  return (
    <div id='services' style={{ backgroundColor: '#2E837E' }}>
      <Container className='py-5'>
        <h2 className='title'>Services</h2>
        <Row className='pt-4'>
          {titles.map((title, index) => (
            <Col key={index} xs={12} sm={6} md={6} lg={3} className='mb-3 d-flex align-items-stretch'>
              <Card className='custom-services-card'>
                <Card.Img alt={`Service ${index + 1}`} className='custom-services-card-image' variant='top' src={images[index]} />
                <Card.Body className='d-flex flex-column px-0'>
                  <Card.Title className='text-white font-weight-bold'>{title}</Card.Title>
                  <Card.Text className='mb-4 text-light'>
                    {descriptions[index]}
                  </Card.Text>
                  <Link to={endpoints[index]} data-testid={`ButtonTest ${index + 1}`} className='mt-auto align-self-start'>
                    <button type='button' onClick={handleClick} className='btn btn-outline-warning'>
                      Try it
                    </button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
