import { Row, Col, Container, Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'
import Iframe from 'react-iframe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function SideBySideRender({ urlLeft, urlRight, show, handleClose }) {
    return(
        <Modal show={show} onHide={handleClose} fullscreen={true}>
            <ModalHeader>
                <a onClick={handleClose} className="custom_cursor">
                    <FontAwesomeIcon icon={faChevronLeft} className="pe-1" />
                    <span>Go back</span>
                </a>
            </ModalHeader>
            <ModalBody style={{padding: 0}}>
                <div className='d-flex flex-column' style={{ height: '100%', backgroundColor: '#000' }}>
                    <Container fluid style={{height: '100%'}}>
                        <Row style={{height: '100%'}}>
                            <Col md={6} className="ps-md-0 custom-iframe-height" style={{height: '100%'}} id="left_article">
                                <Iframe url={urlLeft}
                                    width="100%"
                                    height="100%"
                                    id="left_article"
                                    display="block"
                                    position="relative"/>
                            </Col>
                            <Col md={6} className="pe-md-0 custom-iframe-height" style={{height: '100%'}}>
                                <Iframe url={urlRight}
                                    width="100%"
                                    height="100%"
                                    id="right_article"
                                    display="block"
                                    position="relative"/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ModalBody>
        </Modal>
    )
}