import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function BodyCheckOneText () {
  const description = 'Enter the text of a news article in order to check it for plagiarism'
  const secondDescription = 'You can do so in the following text box:'
  return (
    <Container className='my-5' id='ourMission'>
      <Row>
        <Col md={6} className='d-flex align-items-center'>
          <div>
            <div className='mb-4'>
              <p className='description-paragraph-first'>{description}</p>
            </div>
            <div className='mb-4'>
              <p className='description-paragraph-second'>{secondDescription}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
