import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from 'react-bootstrap'

/**
 *
 * A component that renders three statistics cards, each with an image, a title, and a description.
 *
 * @param {string[]} titles - The titles for each statistics card.
 * @param {string[]} descriptions - The descriptions for each statistics card.
 * @param {string[]} images - The URLs for each image to be displayed on each statistics card.
 * @throws {Error} Will throw an error if the length of the titles array is different from the length of the descriptions array,
 the length of the images array, or if the length of the descriptions array is different from the length of the images array.
 *
 * @returns {JSX.Element} Returns a JSX element that renders the three statistics cards with the provided titles, descriptions, and images.
 *
 */
export default function Statistics ({ titles, descriptions, images }) {
  if (titles.length !== descriptions.length ||
        titles.length !== images.length ||
        descriptions.length !== images.length) {
    throw Error('Different lengths of the arrays.')
  }
  // Renders a JSX element with information about statistics.
  return (
    <div id='statistics'>
      <Container className='py-5'>
        <h2 className='statistics-title'>Did you know that...</h2>
        <Row className='pt-4'>
          {titles.map((title, index) => (
            <Col key={index} xs={12} sm={12} md={4} lg={4} className='mb-3 align-items-stretch'>
              <Card className='custom-statistics-card text-center mt-3 h-100'>
                <Card.Img alt={`Service ${index + 1}`} src={images[index]} className='card-img mx-auto'/>
                <Card.Body className='d-flex flex-column px-0'>
                  <Card.Title className='font-weight-bold'>{title}</Card.Title>
                  <Card.Text className='mb-4'>
                    {descriptions[index]}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <h2 className='statistics-title'>Number of articles for each overlap threshold</h2>
      </Container>
    </div>
  )
}
