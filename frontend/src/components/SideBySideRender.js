import { Row, Col, Container } from 'react-bootstrap'
import Iframe from 'react-iframe'
import NavbarComponent from './navbar'

export default function SideBySideRender({ urlLeft, urlRight, applicationName }) {
    return(
        <div className='d-flex flex-column' style={{ height: '100vh', backgroundColor: '#000' }}>
            <NavbarComponent name={applicationName} mainPage={false} />
            <Container fluid>
                <Row>
                    <Col md={6} className="ps-md-0 custom-iframe-height">
                        <Iframe url={urlLeft}
                            width="100%"
                            id="left_article"
                            className="custom-iframe-height"
                            display="block"
                            position="relative"/>
                    </Col>
                    <Col md={6} className="pe-md-0 custom-iframe-height">
                        <Iframe url={urlRight}
                            width="100%"
                            id="right_article"
                            className="custom-iframe-height"
                            display="block"
                            position="relative"/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}