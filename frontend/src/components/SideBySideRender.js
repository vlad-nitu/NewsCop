import { Row, Col, Container, Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import IframeRenderer from './IframeRenderer'
import { useState } from 'react'

export default function SideBySideRender ({ urlLeft, urlRight, show, handleClose }) {
  const [backgroundColorLeft, setBackgroundColorLeft] = useState('#fff')
  const [backgroundColorRight, setBackgroundColorRight] = useState('#fff')

  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      <ModalHeader>
        <a onClick={() => { handleClose(); setBackgroundColorLeft('#fff') }} className='custom_cursor'>
          <FontAwesomeIcon icon={faChevronLeft} className='pe-1' />
          <span>Go back</span>
        </a>
      </ModalHeader>
      <ModalBody style={{ padding: 0 }}>
        <div className='d-flex flex-column' style={{ height: '100%', backgroundColor: backgroundColorLeft === backgroundColorRight && backgroundColorLeft === '#000' ? '#000' : '#fff' }}>
          <Container fluid style={{ height: '100%' }}>
            <Row style={{ height: '100%' }}>
              <Col sm={6} className='px-0 pe-sm-2 pb-2 pb-sm-0 custom-iframe-height' id='left_article'>
                <IframeRenderer url={urlLeft} id='left_article' changeBackground={() => setBackgroundColorLeft('#000')} />
              </Col>
              <Col sm={6} className='px-0 ps-sm-2 pt-2 pt-sm-0 custom-iframe-height' id='right_article'>
                <IframeRenderer url={urlRight} id='right_article' changeBackground={() => setBackgroundColorRight('#000')} />
              </Col>
            </Row>
          </Container>
        </div>
      </ModalBody>
    </Modal>
  )
}
