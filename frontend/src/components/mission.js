import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col"


export default function Mission({ description, imageUrl }) {
    return (
        <Container className="my-5" id="ourMission">
          <Row>
            <Col md={6}>
              <img src={imageUrl} alt="Mission" className="img-fluid" id="missionImage"/>
            </Col>
            <Col md={6} className="d-flex align-items-center">
                <div>
                    <div className="mb-4">
                        <h2 className="title" style={{color: 'black'}}>Our Mission</h2>
                    </div>
                    <div className="mb-4">
                        <p className="description-paragraph">{description}</p>
                    </div>
                </div>
            </Col>
          </Row>
        </Container>
      );
}